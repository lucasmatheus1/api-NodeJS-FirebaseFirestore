const functions = require("firebase-functions");
const cors = require("cors");
const app = require("express")();
const admin = require("firebase-admin");

admin.initializeApp();

app.use(cors());

//Rotas
app.use("/", require("./src/routes"));

exports.api = functions.https.onRequest(app);
