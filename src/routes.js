const express = require("express");
const routes = express.Router();
const Usuario = require("./controllers/usuarios.controller");

routes.get("/api/usuarios.details/:id", Usuario.details);
routes.get("/", Usuario.index);
routes.post("/api/usuarios", Usuario.create);
routes.get("/api/usuarios", Usuario.index);
routes.delete("/api/usuarios/:id", Usuario.delete);
routes.put("/api/usuarios", Usuario.update);
routes.post("/api/usuarios/login", Usuario.login);

module.exports = routes;
