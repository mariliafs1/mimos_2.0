import mongoose from "mongoose";
import {produtoSchema as produtoSchema} from "./Produto.js"
import sacolaItemSchema from "./Sacola.js";

const usuarioSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true,
    },
    cpf:{
        type: String,
        required: true,
    },
    dataNascimento:{
        type: Date,
        required: true
    },
    email:{
        type: String,
        required: true,
        index:{
            unique:true
        }
    },
    senha:{
        type: String,
        required: true,
    },
    carrinho: {
        type: [sacolaItemSchema],
        default: []
    },
    favoritos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produtos'
    }]
});

const Usuario = mongoose.model("Usuarios", usuarioSchema);

export default Usuario;