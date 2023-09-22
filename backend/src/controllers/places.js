import Place from "../models/Place.js";
import User from "../models/User.js";
import multer from "multer";

// Configura lo storage per l'upload dei file con multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/places"); // Specifica la cartella di destinazione per le immagini
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Genera un nome unico per il file
  },
});

const upload = multer({ storage: storage }); // Configura l'upload con l'opzione di storage

export const createPlace = async (req, res) => {
  try {
    // Esegui l'upload delle immagini con multer
    upload.array("images", 5)(req, res, async function (err) {
      if (err) {
        return res.status(400).json({
          error: true,
          message: "Errore durante l'upload delle immagini",
        });
      }

      const imageFilenames = req.files.map((file) => file.filename); // Ottieni i nomi dei file delle immagini

      const place = new Place({
        ...req.body,
        owner: req.user._id, // Imposta il proprietario del posto come l'utente corrente
        images: imageFilenames, // Collega i nomi dei file delle immagini al posto
      });

      await place.save();

      const user = await User.findById(req.user._id);
      user.places.push(place._id);
      await user.save();

      res.status(201).json({ message: "Posto creato con successo" });
    });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

export const getPlaces = async (req, res) => {
  try {
    const places = await Place.find(); // Trova tutti i posti nel database
    res.status(200).send({ places }); // Invia una risposta con l'elenco dei posti
  } catch (error) {
    res.status(200).send({ data: {}, error: true, message: error.message });
  }
};

export const getPlace = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id); // Trova il posto per l'ID specificato
    res.status(200).send({ place }); // Invia una risposta con il posto trovato
  } catch (error) {
    res.status(200).send({ data: {}, error: true, message: error.message });
  }
};

export const updatePlace = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id); // Trova il posto per l'ID specificato
    place.set(req.body); // Aggiorna le informazioni del posto con i dati della richiesta
    await place.save(); // Salva il posto aggiornato nel database
    res.status(200).send({ message: "Posto aggiornato con successo" });
  } catch (error) {
    res.status(200).send({ data: {}, error: true, message: error.message });
  }
};

export const ratePlace = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id); // Trova il posto per l'ID specificato
    place.ratings.push({ user: req.user._id, rating: req.body.rating }); // Aggiungi una valutazione al posto
    await place.save(); // Salva il posto con la nuova valutazione nel database
    res.status(200).send({ message: "Posto valutato con successo" });
  } catch (error) {
    res.status(200).send({ data: {}, error: true, message: error.message });
  }
};

export const deletePlace = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id); // Trova il posto per l'ID specificato
    const user = await User.findById(req.user._id); // Trova l'utente corrente
    user.places.pull(place._id); // Rimuovi il posto dalla lista dei posti dell'utente
    await user.save(); // Salva le modifiche all'utente nel database
    await place.deleteOne(); // Elimina il posto dal database
    res.status(200).send({ message: "Posto eliminato con successo" });
  } catch (error) {
    res.status(200).send({ data: {}, error: true, message: error.message });
  }
};
