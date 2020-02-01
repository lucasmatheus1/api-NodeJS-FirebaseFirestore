const express = require("express");
const routes = express.Router();

const ProductController = require("./Database");

// primeira rota
routes.get("/products", ProductController.getData);
routes.post("/products", ProductController.addData);
routes.put("/products/:id", ProductController.updateData);
routes.delete("/products/:id", ProductController.deleteData);
routes.delete("/products", ProductController.deleteAll);

module.exports = routes;
