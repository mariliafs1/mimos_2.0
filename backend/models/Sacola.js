import mongoose from "mongoose";
import { produtoSchema as produtoSchema } from "./Produto.js";

const sacolaItemSchema = new mongoose.Schema({
    produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produtos',
        required: true,
    },
    quantidade: {
        type: Number,
        required: true,
        default: 1
    }
}, {_id:false});

export default sacolaItemSchema;