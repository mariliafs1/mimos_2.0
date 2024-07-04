import express from "express";
import ProdutoController from "../controllers/ProdutoController.js";
import PagesController from "../controllers/PagesController.js"
const routes = express.Router();

routes.get('/produtos', ProdutoController.getAllProdutos);
routes.get("/", PagesController.getHomePage);

export default routes;