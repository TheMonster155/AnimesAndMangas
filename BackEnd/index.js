const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const init = require("./db");

const mangaRoutes = require("./routes/mangaRoutes");
const actionFigureRoutes = require("./routes/actionFigureRoutes");
const registerRoute = require("./routes/registerRoute");
const loginRoute = require("./routes/loginRoute");
const authErrorMiddleware = require("./middleware/authErrorMiddleware");
const validationErrorMiddleware = require("./middleware/validationErrorMiddleware");
const generalErrorMiddleware = require("./middleware/generalErrorMiddleware");

const registerSeller = require("./routes/registerSellerRouter");

dotenv.config();

const server = express();
const PORT = 3050;

// Middleware globali
server.use(express.json());
server.use(cors());

// Rotte
server.use("/", registerRoute);
server.use("/", loginRoute);

server.use("/", mangaRoutes);
server.use("/", actionFigureRoutes);
server.use("/", registerSeller);

// Middleware per errori
server.use(authErrorMiddleware);
server.use(validationErrorMiddleware);
server.use(generalErrorMiddleware);

init();

server.listen(PORT, () => console.log(`Server is runnin' on PORT ${PORT}`));
