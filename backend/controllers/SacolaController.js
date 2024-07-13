import Usuario from "../models/Usuario.js";
import  {Produto}  from "../models/Produto.js";


const addProduto = async (req, res)=>{
    try {
            const produtoId = req.params.id;
            const userId = req.userId;
            const produto = await Produto.findById(produtoId);
            const usuario = await Usuario.findById(userId);
                
            if(!produto){
                return res.status(404).json({message: 'Produto não encontrado'});
            }
            
            if(!usuario){
                return res.status(404).json({message:'Usuário não encontrado'});
            }

            const produtoExisteNoCarrinho = usuario.carrinho.find((item)=>{
                console.log(item.produto.toString(), produtoId);
                return item.produto.toString() == produtoId;
            });
            
            if(produtoExisteNoCarrinho){
                produtoExisteNoCarrinho.quantidade += 1;
                await Usuario.findByIdAndUpdate(userId, usuario);
            }else{
                usuario.carrinho.push({produto: produto._id, quantidade:1});
                await Usuario.findByIdAndUpdate(userId, usuario);
            }
            
            res.status(201).json({message:"Produto adicionado à sacola"})

    } catch (error) {
        res.status(500).json({message: `${error.message}`})
    }
}

const getSacolaProdutos = async(req, res) =>{

}

const SacolaController = {addProduto, getSacolaProdutos}

export default SacolaController;