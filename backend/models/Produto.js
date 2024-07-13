import mongoose from "mongoose";

const produtoSchema = new mongoose.Schema({
    nome:{
        type: String,
        require: true,
    },
    preco:{
        type: Number,
        require: false,
    },
    precoAntigo:{
        type: Number,
        require: false,
    },
    imagem:{
        type:String,
        require: false,
    },
    categoria:{
        type: String,
        require: false,
    }
});


const Produto = mongoose.model("Produtos", produtoSchema);

export {Produto, produtoSchema};
