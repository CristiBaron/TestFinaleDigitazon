import Place from "../models/Place.js"; // Importa il modello Place dal file specificato

// Definisci una funzione middleware per verificare se l'utente è il proprietario del posto
export const checkOwner = async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id); // Trova il posto per l'ID specificato nella richiesta

    if (!place || place.owner.toString() !== req.user._id.toString()) {
      // Se il posto non esiste o l'utente non è il proprietario del posto
      return res
        .status(200)
        .send({ data: {}, error: true, message: "Posto non trovato" }); // Invia una risposta con un messaggio di errore
    }

    // Se l'utente è il proprietario del posto o il posto esiste, prosegui con la gestione della richiesta
    next();
  } catch (error) {
    // Gestisci gli errori, ad esempio errori nel database
    res.status(200).send({ data: {}, error: true, message: error.message }); // Invia una risposta con un messaggio di errore
  }
};
