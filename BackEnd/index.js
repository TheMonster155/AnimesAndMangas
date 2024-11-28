const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const init = require('./db');


const mangaRoutes = require("./routes/mangaRoutes");
const actionFigureRoutes = require("./routes/actionFigureRoutes");
const registerRoute = require('./routes/registerRoute');
const loginRoute = require('./routes/loginRoute');
const authErrorMiddleware = require('./middleware/authErrorMiddleware');
const validationErrorMiddleware = require('./middleware/validationErrorMiddleware');
const generalErrorMiddleware = require('./middleware/generalErrorMiddleware');

const adminLoginRoute = require('./routes/loginAdminRoute');



dotenv.config();

const server = express();
const PORT = 3050;

// Middleware globali
server.use(express.json());
server.use(cors());
server.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Rotte
server.use('/api/auth', adminLoginRoute);
server.use('/api/auth', registerRoute);
server.use('/api/auth', loginRoute);
server.use('/api/manga', mangaRoutes);
server.use('/api/action-figure', actionFigureRoutes);

// Middleware per errori
server.use(authErrorMiddleware);
server.use(validationErrorMiddleware);
server.use(generalErrorMiddleware);

init();

server.listen(PORT, () => console.log(`Server is runnin' on PORT ${PORT}`));
