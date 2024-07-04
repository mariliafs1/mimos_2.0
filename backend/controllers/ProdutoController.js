import Produto from "../models/Produto.js";

const getAllProdutos = async (req, res)=>{
    try {
        const ListaDeProdutos = await Produto.find();
        return res.status(200).send(ListaDeProdutos);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
};

const ProdutoController = { getAllProdutos }

export default ProdutoController;