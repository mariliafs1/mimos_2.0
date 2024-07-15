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
    try {
        const userId = req.params.id;
      
        // const usuario = await Usuario.findById(userId);
        const usuario =  await Usuario.findById(userId).populate({
            path: 'carrinho.produto',
            model: 'Produtos'
        })

        if(!usuario){
            res.status(404).json({message:"Usuário não encontrado!"})
        }
        
        res.status(200).json({message:'Itens da sacola listados com sucesso!', carrinho: usuario.carrinho});
        


    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteProduto = async (req, res) =>{
    const produtoId = req.params.id;
    const userId = req.userId;
  
    try {
        const usuario = await Usuario.findById(userId).populate({
            path: 'carrinho.produto',
            model: 'Produtos'
        });

        const produtos = usuario.carrinho;
        console.log(produtoId)

        const carrinhoAtualizado = produtos.filter(produto => produto.produto._id.toString() !== produtoId);
        usuario.carrinho = carrinhoAtualizado;
        await Usuario.findByIdAndUpdate(userId, usuario);
        res.status(200).json({message: 'produto deletado!'})

    } catch (error) {
        res.status(500).send(error);
    }
}

const updateSacola = async (req, res) =>{
    const produtoId = req.params.id;
    const userId = req.userId;

    console.log(produtoId);

    try {
        const usuario = await Usuario.findById(userId).populate({
            path: 'carrinho.produto',
            model: 'Produtos'
        });
      
        const produtoNoCarrinho = usuario.carrinho.find((item)=>{
            console.log(item.produto.toString(), produtoId);
            return item.produto._id.toString() == produtoId;
        });

        if(!produtoNoCarrinho){
            res.status(404).json({message: 'Produto não encontrado.'});
        }else{
            produtoNoCarrinho.quantidade += 1;
            await Usuario.findByIdAndUpdate(userId, usuario);
            res.status(200).json({message:'quantidade atualizada com sucesso!'})
        }

    } catch (error) {
        res.status(500).send(error);
    }
}

const SacolaController = {addProduto, getSacolaProdutos, deleteProduto, updateSacola}

export default SacolaController;