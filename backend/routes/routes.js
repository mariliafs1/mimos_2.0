import express from "express";
import ProdutoController from "../controllers/ProdutoController.js";
import PagesController from "../controllers/PagesController.js"
import UsuarioController from "../controllers/UsuarioController.js";
import SacolaController from "../controllers/SacolaController.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const routes = express.Router();

routes.get('/produtos', ProdutoController.getAllProdutos);
routes.get("/", PagesController.getHomePage);
routes.get("/login", PagesController.getLoginPage);
routes.get("/cadastro", PagesController.getCadastroPage);
routes.get("/sacola", authMiddleware, PagesController.getSacolaPage);


routes.get("/produtos/:categoria", ProdutoController.getByCategorie);
routes.get("/produto/:id", ProdutoController.getProdutoById)



routes.get("/sacola/:id", authMiddleware, SacolaController.getSacolaProdutos);
routes.post("/sacola/:id", authMiddleware, SacolaController.addProduto);
routes.delete("/sacola/:id", authMiddleware, SacolaController.deleteProduto);
routes.put("/sacola/:id", authMiddleware, SacolaController.updateSacola);



routes.post("/usuario/registraUsuario", UsuarioController.registraUsuario);
routes.post("/usuario/loginUsuario", UsuarioController.loginUsuario);
routes.delete("/usuario", authMiddleware, UsuarioController.deleteUsuarioPorId);




export default routes;