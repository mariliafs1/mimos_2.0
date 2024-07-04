import mongoose from "mongoose";

const connectToDb = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://pumpkinlytattoo:pumpkinlytattoo@cluster0.psrwz2w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("MongoDB Conectado!");
    } catch (error) {
        console.log('erro de conexão com o banco de dados:', error);
    }
}

export{connectToDb}