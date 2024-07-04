import path from 'path';

import { fileURLToPath } from 'url';

// Use import.meta.url para obter o caminho absoluto do arquivo atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendPathPages = path.join(__dirname, '../public/views')

function getHomePage(req, res) {
    return res.sendFile(path.join(frontendPathPages, 'index.html'));
}

const PagesController = {getHomePage}

export default PagesController