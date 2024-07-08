import path from 'path';

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

const PagesController = {getHomePage, getLoginPage, getCadastroPage}

export default PagesController
