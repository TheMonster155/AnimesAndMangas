const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const init = require("./db");

const mangaRoutes = require("./routes/mangaRoutes");
const actionFigureRoutes = require("./routes/actionFigureRoutes");
const registerRoute = require("./routes/registerRoute");
const loginRoute = require("./routes/loginRoute");
const comments = require("./routes/commentRoute");
const orders = require("./routes/ordner");
const authErrorMiddleware = require("./middleware/authErrorMiddleware");
const validationErrorMiddleware = require("./middleware/validationErrorMiddleware");
const generalErrorMiddleware = require("./middleware/generalErrorMiddleware");
const sendEmail = require("./routes/sendEmail");
const registerSeller = require("./routes/registerSellerRouter");
const google = require("./routes/google");
require("dotenv").config();

const server = express();
const PORT = 3051;

// Middleware globali
server.use(express.json());
server.use(cors());

//
server.use("/", google);
server.use("/", registerRoute);
server.use("/", loginRoute);
server.use("/", comments);
server.use("/", mangaRoutes);
server.use("/", actionFigureRoutes);
server.use("/", registerSeller);
server.use("/", orders);
server.use("/", sendEmail);
// Middleware per errori
server.use(authErrorMiddleware);
server.use(validationErrorMiddleware);
server.use(generalErrorMiddleware);

init();

server.listen(PORT, () => console.log(`Server is runnin' on PORT ${PORT}`));
