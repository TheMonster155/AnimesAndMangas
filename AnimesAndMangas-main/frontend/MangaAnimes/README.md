# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
  MangaAnimes

MangaAnimes - README
Descrizione del Progetto
MangaAnimes è un ecommerce dedicato alla vendita di manga, anime e action figure, progettato per offrire un’esperienza utente moderna e intuitiva. Il sito prevede due tipi di utenti:

Seller:

Può vendere prodotti, aggiungere nuovi articoli al catalogo, gestire gli ordini e lasciare commenti sui prodotti.
Non ha la possibilità di acquistare prodotti sul sito.
User:

Può registrarsi, accedere ai dettagli dei prodotti, lasciare recensioni e completare acquisti.
Funzionalità Principali
Autenticazione e Autorizzazione:

Login tradizionale o tramite Google , grazie a Passport.js.
Gestione della sessione basata su token JWT con middleware authenticateToken.
Gestione dei Prodotti:

I seller possono caricare nuovi prodotti con descrizioni, immagini e dettagli.
Gli utenti possono sfogliare i manga, gli anime e le action figure in homepage.
Ogni prodotto ha una pagina di dettagli completa.
Carrello e Pagamenti:

Il carrello è gestito tramite Redux Toolkit.
Gli utenti possono aggiungere prodotti al carrello e completare acquisti.
Integrazione con Stripe per pagamenti sicuri.
I seller non hanno accesso al carrello o alla funzionalità di acquisto.
Commenti:

Gli utenti e i seller possono recensire prodotti nella pagina Details.
Sistema di moderazione tramite middleware per prevenire contenuti inappropriati.
Gestione delle Immagini:

Caricamento e gestione delle immagini tramite Cloudinary.
Notifiche e Comunicazioni:

Notifiche interattive tramite SweetAlert2.
Invio di email per conferme ordini e supporto tramite SendGrid.
Tecnologie Utilizzate
Frontend:
Framework e Librerie:

React con JSX
React Router DOM
Redux Toolkit
Bootstrap
Strumenti di UI:

SweetAlert2 per notifiche interattive.
React Icons per icone accattivanti.
Gestione Stato:

cartSlice per il carrello.
commentSlice per la gestione dei commenti.
Backend:
Framework e Librerie:

Express.js per la logica server-side.
Mongoose per la gestione dei dati in MongoDB.
Multer e Cloudinary per la gestione delle immagini.
SendGrid per l'invio di email.
Passport.js per l’autenticazione tramite Google.
Middleware:

authenticateToken per la protezione delle rotte.
generalErrorMiddleware per la gestione degli errori.
Struttura delle Cartelle
Backend:
middleware: Contiene middleware per l'autenticazione, la gestione degli errori e altro.
modules: Gestisce i moduli principali dell'app (es. User, Product, Order).
routes: Definisce le API del backend.
Frontend:
components: Contiene componenti come la navbar, il footer e moduli specifici per manga e action figure.
context: Gestisce lo stato globale tramite Context API.
hooks: Include hook personalizzati, come useSession.
middleware: Componenti come PrivateRoute per proteggere le rotte.
pages: Include le principali pagine del sito (Login, Register, Details).
utils: Contiene funzioni di utilità, come la gestione dei token JWT.
Installazione
Clona il repository:

bash
Copia codice
git clone https://github.com/TheMonster155/AnimesAndMangas.git
Installa le dipendenze:

Backend:
bash
Copia codice
cd backend
npm install
Frontend:
bash
Copia codice
cd frontend
npm install
Configura i file .env per entrambe le parti del progetto:

Backend:

makefile
Copia codice
DB_URI=""
JWT_SECRET=""
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
SENDGRID_API_KEY=""
SENDER_EMAIL=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GOOGLE_CALLBACK_URL=""
STRIPE_SECRET_KEY=""

Frontend:

makefile
Copia codice
VITE_SERVER_BASE_URL=""
VITE_STRIPE_CLIENT_SECRET=""
Avvia il progetto in locale:

Backend:
bash
Copia codice
cd backend
npm run dev
Frontend:
bash
Copia codice
cd frontend
cd MangaAnimes
npm run dev
Deploing:

Backend su Render:
Accedi a Render.
Crea un nuovo servizio Web Service.
Collega il repository del backend.
Configura le variabili d’ambiente dal file .env.
Avvia il servizio.
Frontend su Vercel:
Link del progetto: MangaAnimes su Vercel.
https://animes-and-mangas-g7del6nl0-themonster155s-projects.vercel.app
Crediti
Progetto sviluppato da Jouttane Anass.

Licenza
Questo progetto è distribuito sotto licenza MIT.
