const express = require("express");
const routes = express.Router();
const Usuario = require("./controllers/usuarios.controller");
<<<<<<< HEAD
const Admin = require("./controllers/usuarioAdmin.controller");
=======
const Index = require("./database/index");
>>>>>>> 7799766d43bbacb9daf9b66c9ecffdc12f7c8c0c

routes.post("/api/usuarios", Usuario.create);

routes.post("/api/usuarios/login", Usuario.login);
routes.get("/api/usuarios.details/:id", Usuario.details);

routes.put("/api/usuarios", Usuario.update);
routes.delete("/api/usuarios/:id", Usuario.delete);

routes.get("/", Usuario.index);
routes.get("/api/usuarios", Usuario.index);

routes.delete("/api/usuarios/:id", Usuario.delete);
routes.put("/api/usuarios", Usuario.update);
routes.post("/api/usuarios/login", Usuario.login);
routes.put("/api/admin/activate", Admin.update);

routes.get("/api/health", Usuario.health);


module.exports = routes;
