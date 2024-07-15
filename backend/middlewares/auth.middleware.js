import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'

dotenv.config();

export const authMiddleware = (req, res, next) =>{
    try {  
        const {authorization} = req.headers;
    
        if(!authorization){
            return res.status(401).json({message: 'Autorização negada!'})
        }
    
        const partes = authorization.split(" ");
        if(partes.length !== 2){
            return res.status(401).send({message: 'Formato de Token inválido: tamanho incorreto'})
        }
    
        const [schema, token] = partes;
    
        if(schema !== "Bearer"){
            return res.status(401).send({message: 'Formato de Token inválido: schema incorreto ou ausente'})
        }
    
        const segredo = process.env.SECRET;
    
        jwt.verify(token, segredo, (error, decodificado)=>{
            if(error){
                return res.status(401).send({message: 'Autorização negada: token inválido!'})
            }
            req.userId = decodificado.id;
            return next();
        })

    
    } catch (error) {
        res.status(500).send(error.message)
    }
}