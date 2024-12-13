# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
  MangaAnimes

MangaAnimes è un sito web dedicato alla vendita di manga, anime e action figure, progettato per offrire un’esperienza utente moderna e intuitiva. L’applicazione è divisa in due parti: backend e frontend.

Backend

Il backend gestisce la logica di business, la gestione dei dati e l’autenticazione.

Struttura delle cartelle

middleware: Contiene middleware personalizzati per la gestione di errori, autenticazione, ecc.

modules: Gestisce i moduli principali dell’applicazione.

routes: Definisce le rotte API del backend.

Tecnologie utilizzate

Express.js: Framework web per Node.js.

MongoDB con Mongoose: Database NoSQL per la persistenza dei dati.

JWT: Per l’autenticazione basata su token.

SendGrid e Nodemailer: Per l’invio di email.

Cloudinary: Per il caricamento e la gestione delle immagini.

Passport: Per l’autenticazione tramite provider esterni (Google, GitHub).

Stripe: Per la gestione dei pagamenti.

Dipendenze principali

{
"@sendgrid/mail": "^8.1.4",
"bcrypt": "^5.1.1",
"cloudinary": "^1.41.3",
"cors": "^2.8.5",
"dotenv": "^16.4.5",
"express": "^4.21.1",
"express-session": "^1.18.1",
"express-validator": "^7.2.0",
"jsonwebtoken": "^9.0.2",
"mongoose": "^8.8.2",
"multer": "^1.4.5-lts.1",
"multer-storage-cloudinary": "^4.0.0",
"nodemailer": "^6.9.16",
"passport": "^0.7.0",
"passport-github2": "^0.1.12",
"passport-google-oauth20": "^2.0.0",
"stripe": "^17.3.1"
}

Comandi disponibili

AnimesAndMangas-main\BackEnd> npm run dev: Avvia il server backend con Nodemon.

Funzionalità

Autenticazione JWT per utenti e amministratori.

Supporto per login tramite Google e GitHub.

Invio di email per conferme e notifiche.

Caricamento di immagini su Cloudinary.

Integrazione con Stripe per i pagamenti.

Frontend

Il frontend è progettato per fornire una UI reattiva e interattiva utilizzando React.

Struttura delle cartelle

components: Contiene componenti come:

context: Gestione dello stato globale tramite il context API.

homepage: Pagine iniziali del sito.

navbar: Gestione della barra di navigazione.

footer: Footer del sito.

main: Componenti principali dell’applicazione.

hooks: Include hook personalizzati, come la gestione della sessione.

middleware: Contiene componenti come PrivateRoute per la protezione delle rotte.

pages: Contiene pagine principali come Login, Register e MangaCreate.

reducers: Gestisce lo stato globale tramite Redux.

utils: Contiene funzioni di utilità, come la gestione dei token.

Tecnologie utilizzate

React con JSX: Per la creazione di componenti UI.

Vite: Per lo sviluppo rapido e la gestione del build.

Bootstrap: Per un design reattivo e accattivante.

React Router DOM: Per la navigazione client-side.

Redux Toolkit: Per la gestione dello stato globale.

Stripe.js: Per la gestione sicura dei pagamenti.

SweetAlert2: Per notifiche e dialoghi.

Dipendenze principali

{
"@reduxjs/toolkit": "^2.4.0",
"@stripe/react-stripe-js": "^3.0.0",
"bootstrap": "^5.3.3",
"jwt-decode": "^3.1.2",
"react": "^18.3.1",
"react-bootstrap": "^2.10.6",
"react-dom": "^18.3.1",
"react-icons": "^5.3.0",
"react-redux": "^9.1.2",
"react-router-dom": "^7.0.1",
"reselect": "^5.1.1",
"sweetalert2": "^11.14.5"
}

Comandi disponibili

MangaAnimes-main\frontend\MangaAnimes> npm run dev: Avvia il server di sviluppo.

npm run build: Compila il progetto per la produzione.

npm run lint: Esegue ESLint per analizzare il codice.

npm run preview: Avvia una versione preview dell’app compilata.

Funzionalità

Navigazione fluida tra le pagine.

Integrazione con il backend per il recupero di dati dinamici.

Pagamenti sicuri tramite Stripe.

Notifiche interattive e conferme.

Installazione

Requisiti

Node.js 16+

MongoDB

Passaggi

Clona il repository.

Installa le dipendenze:

Backend: cd backend && npm install

Frontend: cd frontend && npm install

Configura i file .env per backend e frontend.

Avvia il progetto:

Backend: AnimesAndMangas-main\BackEnd> npm run dev

Frontend: MangaAnimes-main\frontend\MangaAnimes> npm run dev

Contributi

I contributi sono benvenuti! Segui le linee guida nel file CONTRIBUTING.md per inviare PR o segnalare problemi.

Licenza

Questo progetto è distribuito sotto licenza MIT.
