/*const authorizeCommentAction = (req, res, next) => {
  const { role, userId } = req.user; // Dati dall'utente autenticato
  const { id } = req.params; // ID del commento dall'URL

  if (role === "admin") {
    // Gli admin possono fare tutto
    return next();
  }

  Comment.findById(id)
    .then((comment) => {
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }

      if (role === "user" && comment.user.toString() === userId) {
        // Gli utenti possono modificare/eliminare solo i propri commenti
        return next();
      }

      if (role === "seller" && comment.seller?.toString() === userId) {
        // I venditori possono modificare/eliminare solo i commenti sui loro prodotti
        return next();
      }

      // Altri casi: accesso vietato
      return res.status(403).json({ error: "Action not allowed" });
    })
    .catch((err) => next(err));
};
module.exports = authorizeCommentAction;
*/

const Comment = require("../modules/comments");

const authorizeCommentAction = (req, res, next) => {
  const { role, userId } = req.user; // Dati dell'utente autenticato
  const { id } = req.params; // ID del commento dall'URL

  if (role === "admin") {
    // Gli admin possono fare tutto
    return next();
  }

  // Trova il commento nel database
  Comment.findById(id)
    .then((comment) => {
      if (!comment) {
        // Se il commento non esiste
        return res.status(404).json({ error: "Comment not found" });
      }

      // Controlla se l'utente è il proprietario del commento (utente o venditore)
      if (
        role === "user" &&
        comment.user &&
        comment.user.toString() === userId
      ) {
        // Gli utenti possono modificare/eliminare solo i propri commenti
        return next();
      }

      if (
        role === "seller" &&
        comment.seller &&
        comment.seller.toString() === userId
      ) {
        // I venditori possono modificare/eliminare solo i commenti sui loro prodotti
        return next();
      }

      // Se il ruolo non corrisponde o l'utente non è autorizzato
      return res.status(403).json({ error: "Action not allowed" });
    })
    .catch((err) => {
      // Gestisce eventuali errori del database
      next(err);
    });
};

module.exports = authorizeCommentAction;
