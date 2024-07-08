import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true,
    },
    cpf:{
        type: Number,
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
        select: false
    }
});

const Usuario = usuarioSchema.model("Usuarios", usuarioSchema);

export default Usuario;