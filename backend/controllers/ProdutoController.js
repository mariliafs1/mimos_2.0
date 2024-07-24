import mongoose from "mongoose";
import { Produto as Produto } from "../models/Produto.js";

const categoriasExistentes = [
    "maquiagem",
    "corpoebanho",
    "skincare",
    "perfumaria-masculina",
    "perfumaria-feminina",
    "cabelos",
    "categoria-vazia"
  ];

const getAllProdutos = async (req, res) => {
  try {
    const ListaDeProdutos = await Produto.find();
    return res.status(200).send(ListaDeProdutos);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getByCategorie = async (req, res) => {
  const categoria = req.params.categoria;
  const categoriaValida = categoriasExistentes.includes(categoria);
  if(!categoriaValida){
    return res.status(404).send('Essa categoria não existe');
  }

  try {
    const ListaPorCategorias = await Produto.find({ categoria });
    console.log(ListaPorCategorias);
    if(ListaPorCategorias.length == 0){
        return res.status(404).send('Categoria vazia');
    }

    return res.status(200).send(ListaPorCategorias);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getProdutoById = async (req, res) => {
  const produtoId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(produtoId)) {
    return res.status(400).send("Id de produto inválido");
  }

  try {
    const produto = await Produto.findById(produtoId);

    if (!produto) {
      return res.status(404).send("Id de produto não encontrado!");
    }
    return res.status(200).send(produto);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const ProdutoController = { getAllProdutos, getByCategorie, getProdutoById };

export default ProdutoController;
