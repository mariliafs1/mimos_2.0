import path from 'path';
import serveStatic from 'serve-static';

import { fileURLToPath } from 'url';

// Use import.meta.url para obter o caminho absoluto do arquivo atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendPathPages = path.join(__dirname, '../../frontend/views')

function getHomePage(req, res) {
    return res.sendFile(path.join(frontendPathPages, 'index.html'));
}

function getLoginPage(req, res){
    return res.sendFile(path.join(frontendPathPages, 'login.html'));
}

function getCadastroPage(req, res){
    return res.sendFile(path.join(frontendPathPages, 'cadastro.html'));
}

function getSacolaPage(req, res, next){
    console.log(req.userId)
    return res.sendFile(path.join(frontendPathPages, 'sacola2.html'));
}


const PagesController = {getHomePage, getLoginPage, getCadastroPage, getSacolaPage}

export default PagesController
