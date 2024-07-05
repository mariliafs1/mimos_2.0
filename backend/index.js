import express from "express";
import routes from "./routes/routes.js";
import { connectToDb } from "./database/db.js";
import cors from 'cors';
import path from "path";
import { fileURLToPath } from 'url';


const app = express();
const port = 3000;
app.use(cors({
    origin: ['https://mimos-2-0.vercel.app'], //'https://mimos20-marilia-farias-projects.vercel.app'
    methods: ["POST", "GET"],
    credentials: true
}));

// app.use(cors()); quando for testar no localhost
connectToDb();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.set('views', path.join(__dirname, 'views'));

const frontendPath = path.join(__dirname, '../frontend')

app.use(express.static(frontendPath)); 

app.use(express.urlencoded());

app.use('/', routes)

app.get('/env', (req, res) => {
    res.json({
      apiURL: process.env.NODE_ENV === 'production' ? process.env.PROD_API_URL : process.env.DEV_API_URL
    });
  });


app.listen(port, ()=>{
    console.log(`Servidor escutando na porta: ${port} `);
});

export default app;