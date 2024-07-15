import express from "express";
import ProdutoController from "../controllers/ProdutoController.js";
import PagesController from "../controllers/PagesController.js"
import UsuarioController from "../controllers/UsuarioController.js";
import SacolaController from "../controllers/SacolaController.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const routes = express.Router();

routes.get('/produtos', ProdutoController.getAllProdutos);
routes.get("/", PagesController.getHomePage);
routes.get("/produtos/:categoria", ProdutoController.getByCategorie);
routes.get("/produto/:id", ProdutoController.getProdutoById)

routes.get("/login", PagesController.getLoginPage);
routes.get("/cadastro", PagesController.getCadastroPage);

routes.get("/sacola", authMiddleware, PagesController.getSacolaPage);
routes.get("/sacola/:id", SacolaController.getSacolaProdutos);
routes.post("/sacola/:id", authMiddleware, SacolaController.addProduto);
routes.delete("/sacola/:id", authMiddleware, SacolaController.deleteProduto);
routes.put("/sacola/:id", authMiddleware, SacolaController.updateSacola);



routes.post("/cadastro/registraUsuario", UsuarioController.registraUsuario);
routes.post("/login/loginUsuario", UsuarioController.loginUsuario);

//rotas privadas

// routes.get("/usuario/:id", UsuarioController.checarToken, UsuarioController.getUsuarioPorId);
routes.get("/usuario/:email_login", authMiddleware, UsuarioController.getUsuarioPorLogin)

//rotas carrinho

export default routes;