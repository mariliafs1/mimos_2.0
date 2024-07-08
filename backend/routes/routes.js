import express from "express";
import ProdutoController from "../controllers/ProdutoController.js";
import PagesController from "../controllers/PagesController.js"
const routes = express.Router();

routes.get('/produtos', ProdutoController.getAllProdutos);
routes.get("/", PagesController.getHomePage);
routes.get("/produtos/:categoria", ProdutoController.getByCategorie);
routes.get("/login", PagesController.getLoginPage);
routes.get("/cadastro", PagesController.getCadastroPage);

export default routes;