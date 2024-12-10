export const isTokenExpired = (tokenEx, cb) => {
  const dateExpiraring = new Date(tokenEx * 1000); // Trasforma tokenEx in una data
  const dateToday = new Date();

  const isExpired = dateToday > dateExpiraring; // Controlla se la data di oggi supera la data di scadenza

  if (isExpired) {
    cb(); // Esegui il callback se il token è scaduto
  }

  return isExpired;
};
