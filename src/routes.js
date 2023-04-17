const express = require("express");
const routes = express.Router();
const Estabelecimento = require("./controllers/usuarios.controller");
const Veiculos = require("./controllers/veiculos.controller")
const Admin = require("./controllers/usuarioAdmin.controller");

const Index = require("./database/index");

routes.post("/api/estabelecimento", Estabelecimento.create);
routes.post("/api/estabelecimento/login", Estabelecimento.login);
routes.get("/api/estabelecimento.details/:id", Estabelecimento.details);
routes.put("/api/estabelecimento/update", Estabelecimento.update);
routes.delete("/api/estabelecimento/:id", Estabelecimento.delete);
routes.get("/api/estabelecimento", Estabelecimento.index);

routes.post("/api/estabelecimento/veiculo", Veiculos.create);
routes.get("/api/estabelecimento/veiculos.details/:id", Veiculos.details);
routes.put("/api/estabelecimento/veiculos/update", Veiculos.update);
routes.delete("/api/estabelecimento/veiculos/:id", Veiculos.delete);



routes.put("/api/admin/activate", Admin.update);




routes.get("/api/health", Estabelecimento.health);

module.exports = routes;
