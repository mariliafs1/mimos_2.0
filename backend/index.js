import express from "express";
import routes from "./routes/routes.js";
import { connectToDb } from "./database/db.js";
import cors from 'cors';
import path from "path";
import { fileURLToPath } from 'url';


connectToDb();
const app = express();
const port = 3000;
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.set('views', path.join(__dirname, 'views'));

const frontendPath = path.join(__dirname, '../frontend')

app.use(express.static(frontendPath)); 

app.use(express.urlencoded());

app.use('/', routes)

app.listen(port, ()=>{
    console.log(`Servidor escutando na porta: ${port} `);
})