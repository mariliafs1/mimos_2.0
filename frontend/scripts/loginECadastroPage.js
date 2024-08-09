import Note from "./notes.js";
import { iniciarLoginPage } from "./validaFormLogin.js";
import { iniciarCadastroPage } from "./validaFormCadastro.js";
const secao = document.querySelector('#home');


const response = await fetch('/env');
const env = await response.json();
const apiURL = env.apiURL;

export const loginPage = async(req, res) =>{
    try {
        const response = await fetch(`${apiURL}/login`)
            
            if(response.ok){
                const html = await response.text();
                const busca = document.querySelector('.busca');
                const listaMenuAberto = document.querySelector('.lista__menu__aberto')
                if(listaMenuAberto){
                    listaMenuAberto.remove();
                }
                if(busca){
                    busca.remove();
                }
                secao.innerHTML = html;
                console.log(html)
                loadScriptsLogin();
                iniciarLoginPage();
                const cadastradoBtn = document.querySelector('.quero__cadastrar');
                cadastradoBtn.addEventListener('click',async () => await cadastroPage() )

      

            }else{
                const errorMessage = await response.json()
                console.error('Erro:', errorMessage.message);
                return errorMessage.message;
            }

    } catch (error) {
        console.log(error)
    }
}

const loadScriptsLogin = () =>{
    removeAllScripts();
    const scripts = [
        '../scripts/validaFormFunctions.js',
        '../scripts/header.js',
        '../scripts/validaFormLogin.js',
        '../scripts/footer.js'
    ];

    scripts.forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        script.type = 'module';
        script.defer = true; // Adiciona o atributo defer para carregamento assíncrono
        document.body.appendChild(script); // Anexa o script ao final do body
    });
}

export const cadastroPage = async(req, res) =>{
    try {
        const response = await fetch(`${apiURL}/cadastro`)
            
            if(response.ok){
                const html = await response.text();
                const busca = document.querySelector('.busca');
                const listaMenuAberto = document.querySelector('.lista__menu__aberto')
                if(listaMenuAberto){
                    listaMenuAberto.remove();
                }
                if(busca){
                    busca.remove();
                }
                secao.innerHTML = html;
                console.log(html);
                loadScriptsCadastro();
                iniciarCadastroPage();
                const btnJaTenhoCadastro = document.querySelector('.tenho__cadastro');
                console.log('porra',btnJaTenhoCadastro);
                btnJaTenhoCadastro.addEventListener('click', async ()=>{
                    console.log('entrou')
                    Note.closeAllNotes();
                    await loginPage();
                    Note.openNotes('Login: teste@teste.com<br>Senha: 123456<br>Caso prefira, você também pode realizar o seu próprio cadastro!')
                })
                

    

            }else{
                const errorMessage = await response.json()
                console.error('Erro:', errorMessage.message);
                return errorMessage.message;
            }

    } catch (error) {
        console.log(error)
    }
}

const loadScriptsCadastro = () =>{
    removeAllScripts();
    const scripts = [
        '../scripts/header.js',
        '../scripts/modal.js',
        '../scripts/validaFormFunctions.js',
        '../scripts/validaFormCadastro.js',
        '../scripts/footer.js',
    ];

    scripts.forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        script.type = 'module';
        script.defer = true; // Adiciona o atributo defer para carregamento assíncrono
        document.body.appendChild(script); // Anexa o script ao final do body
    });
}

const removeAllScripts = () => {
    const scripts = document.querySelectorAll('script');
    scripts.forEach(script => script.remove());
};
