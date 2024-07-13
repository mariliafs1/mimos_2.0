import {Produto as Produto} from "../models/Produto.js";

const getAllProdutos = async (req, res)=>{
    try {
        const ListaDeProdutos = await Produto.find();
        return res.status(200).send(ListaDeProdutos);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
};

const getByCategorie = async(req, res)=>{

    const categoria = req.params.categoria;
    try {

        const ListaPorCategorias = await Produto.find({categoria});
        console.log(categoria);
        return res.status(200).send(ListaPorCategorias);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
}

const getProdutoById = async(req,res) =>{
    const produtoId = req.params.id;
    
    try {
        const produto = await Produto.findById(produtoId);

        console.log(produto);
        return res.status(200).send(produto);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
}

const ProdutoController = { getAllProdutos, getByCategorie, getProdutoById  }

export default ProdutoController;