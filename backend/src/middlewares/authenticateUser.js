import jwt from "jsonwebtoken"; // Importa la libreria jsonwebtoken per la gestione dei token JWT

export const authenticateUser = async (req, res, next) => {
  const token = req.cookies.jwt; // Ottieni il token JWT dal cookie delle richieste

  if (!token) {
    // Se il token non è presente nella richiesta
    return res.status(401).json({ error: "Non autorizzato" }); // Invia una risposta di "Non autorizzato" (status 401)
  }

  try {
    // Prova a verificare il token JWT utilizzando la chiave segreta specificata (process.env.TOKEN_SECRET)
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    // Se la verifica ha successo, il token è valido
    // Aggiungi le informazioni decodificate dal token alla richiesta (req.user)
    req.user = decodedToken;

    // Prosegui con la gestione della richiesta chiamando la funzione successiva (next)
    next();
  } catch (error) {
    // Se si verifica un errore durante la verifica del token
    return res
      .status(401)
      .send({ data: {}, error: true, message: "Token non valido", token }); // Invia una risposta di "Non autorizzato" (status 401) con un messaggio di errore
  }
};
