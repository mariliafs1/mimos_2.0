import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const uri = process.env.MONGODB_URI

const connectToDb = async ()=>{
    try {
        await mongoose.connect(uri);
        console.log("MongoDB Conectado!");
    } catch (error) {
        console.log('erro de conexão com o banco de dados:', error);
    }
}

export{connectToDb}