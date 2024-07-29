import Usuario from "../models/Usuario.js";
import { Produto } from "../models/Produto.js";
// import mongoose from "mongoose";

const toggleFavorito = async (req, res) => {
  const produtoId = req.params.id;
  const usuarioId = req.userId;

  try {
    const usuario = await Usuario.findById(usuarioId);

    const produtoJaExisteNaSacola = usuario.favoritos.find(
      (produtoFavoritado) => produtoFavoritado._id == produtoId
    );
    if (produtoJaExisteNaSacola) {
      usuario.favoritos.remove(produtoId);
      await Usuario.findByIdAndUpdate(usuarioId, usuario);
      res.status(201).json({ message: "Produto removido dos favoritos!" });
    } else {
      usuario.favoritos.push(produtoId);
      await Usuario.findByIdAndUpdate(usuarioId, usuario);
      res.status(201).json({ message: "Produto adicionado aos favoritos!" });
    }
  } catch (error) {
    res.status(500).json({ message: `${error.message}` });
  }
};

const getFavoritos = async (req, res) => {
  const usuarioId = req.userId;
  try {
    const usuario = await Usuario.findById(usuarioId);
    let favoritos = [];
    const produtos = await Promise.all(
      usuario.favoritos.map(async (produtoId) => {
        const produto = await Produto.findById(produtoId).populate();
        return produto;
      })
    );
    favoritos.push(...produtos);
    console.log(favoritos);
    res
      .status(201)
      .json({ message: "Favoritos listados com sucesso", favoritos });
  } catch (error) {
    res.status(500).json({ message: `${error.message}` });
  }
};

const FavoritosController = {
  toggleFavorito,
  getFavoritos,
};

export default FavoritosController;
