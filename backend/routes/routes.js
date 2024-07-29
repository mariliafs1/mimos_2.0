import express from "express";
import ProdutoController from "../controllers/ProdutoController.js";
import PagesController from "../controllers/PagesController.js"
import UsuarioController from "../controllers/UsuarioController.js";
import SacolaController from "../controllers/SacolaController.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import FavoritosController from "../controllers/FavoritosController.js";
const routes = express.Router();

routes.get('/produtos', ProdutoController.getAllProdutos);
routes.get("/", PagesController.getHomePage);
routes.get("/login", PagesController.getLoginPage);
routes.get("/cadastro", PagesController.getCadastroPage);
routes.get("/sacola", authMiddleware, PagesController.getSacolaPage);
routes.get("/favoritos", authMiddleware, PagesController.getFavoritosPage);


routes.get("/produtos/:categoria", ProdutoController.getByCategorie);
routes.get("/produto/:id", ProdutoController.getProdutoById)



routes.get("/sacola/produtos", authMiddleware, SacolaController.getSacolaProdutos);
routes.post("/sacola/:id", authMiddleware, SacolaController.addProduto);
// routes.put("/sacola/:id", authMiddleware, SacolaController.updateSacola);
routes.delete("/sacola/:id", authMiddleware, SacolaController.deleteProduto);

routes.post("/usuario/registraUsuario", UsuarioController.registraUsuario);
routes.post("/usuario/loginUsuario", UsuarioController.loginUsuario);
routes.delete("/usuario", authMiddleware, UsuarioController.deleteUsuarioPorId);

routes.post("/favoritos/:id", authMiddleware, FavoritosController.toggleFavorito);
routes.get("/favoritos/produtos",authMiddleware, FavoritosController.getFavoritos)



export default routes;