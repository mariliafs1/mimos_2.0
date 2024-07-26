import Modal from "./modal.js";
import { sacolaAutorizada, getProdutosSacola } from "./sacola.js";


const response = await fetch('/env');
const env = await response.json();
const apiURL = env.apiURL;

const hamburguerBtn = document.querySelector('.cabecalho_botao');
const overlay = document.querySelector('.overlay');
const sacolaIcon = document.querySelector('.cabecalho__icons__sacola');
const homeIcon = document.querySelector('.cabecalho__icons__home');
const numeroDeProdutosNaSacola = document.querySelector('.numero__produtos__sacola');
const numeroDeProdutosFavoritados = document.querySelector('.numero__produtos__favoritos');
const favoritosIcon = document.querySelector('.cabecalho__icons__favoritos');
const loginIcon = document.querySelector('.nome__usuario');
const secao = document.querySelector('#home');


sacolaIcon.addEventListener('click', ()=>trocarPagina('sacola'));
homeIcon.addEventListener('click',()=> trocarPagina(''));
loginIcon.addEventListener('click', ()=>trocarPagina('login'));
favoritosIcon.addEventListener('click',()=> trocarPagina('favoritos'));




hamburguerBtn.onclick = function(){
    if(hamburguerBtn.checked){
        overlay.classList.remove('overlay_desativado');
    }
}

overlay.onclick = function(){
    overlay.classList.add('overlay_desativado');
    hamburguerBtn.checked = false;
}


const trocarPagina = async (pagina)=>{
    let usuario = localStorage.getItem('user') || [];
    if(pagina == 'sacola'){
        const response = await sacolaAutorizada();
        if(response){
            Modal.openModal('Faça Login para acessar sua sacola!');
        }
    }else if(pagina == 'login' && usuario.length > 0){
        let logout = document.querySelector('.logout');

        if(logout.classList.contains('hide')){
            logout.classList.remove('hide');
            logout.addEventListener('click', ()=>deslogar());
        }else{
            logout.classList.add('hide');
        }       
    }else{
        window.location.href = `${apiURL}/${pagina}`
        // try {
        //     const response = await fetch(`${apiURL}/${pagina}`,{
        //         method: 'get',
        //     });
        //     if(response.ok){
        //         const html = await response.text();
        //         secao.innerHTML = html;
        //     }
            
        // } catch (error) {
            
        // }
    }
}





function iconAlteraNumeroDeProdutosSacola(){
    let quantidadeDeProdutosNaSacola = 0;
    carrinho.forEach((produto)=>{
        quantidadeDeProdutosNaSacola = parseInt(produto.quantidade)+quantidadeDeProdutosNaSacola;
    }) 
    numeroDeProdutosNaSacola.textContent=quantidadeDeProdutosNaSacola;
}

const headerLogado = async ()=>{
    const usuarioLogado = document.querySelector('.nome__usuario')
    const usuario = JSON.parse(localStorage.getItem('user')) || [];
    if(usuario.length != 0){
        let userName = usuario.nome.split(' ')[0];
        usuarioLogado.innerHTML = `<img class="cabecalho__icons__login" src="img/user.png" alt="icone de usuário">${userName}`;
        const {carrinho, quantidadeDeProdutosNaSacola} = await getProdutosSacola();
        numeroDeProdutosNaSacola.textContent = quantidadeDeProdutosNaSacola;

    }
    
}

const deslogar = () =>{
    let usuarioLogado = document.querySelector('.nome__usuario')
    let logout = document.querySelector('.logout');
    logout.classList.add('hide');
    localStorage.clear();
    usuarioLogado.innerHTML = `<img class="cabecalho__icons__login" src="img/user.png" alt="icone de usuário">`
    numeroDeProdutosNaSacola.textContent = 0;
    Modal.openModal('Usuário deslogado com sucesso!');
}

headerLogado();

// const trocarPagina = async (pagina) => {
//     let usuario = JSON.parse(localStorage.getItem('user')) || [];

//     if (pagina === 'sacola') {
//         const response = await sacolaAutorizada();
//         if (response) {
//             Modal.openModal('Faça Login para acessar sua sacola!');
//         }
//     } else if (pagina === 'login' && usuario.length > 0) {
//         let logout = document.querySelector('.logout');
//         if (logout) {
//             if (logout.classList.contains('hide')) {
//                 logout.classList.remove('hide');
//                 logout.addEventListener('click', deslogar, { once: true });
//             }
//         }
//     } else {
//         try {
//             const response = await fetch(`${apiURL}/${pagina}`, {
//                 method: 'GET',
//             });

//             if (response.ok) {
//                 const html = await response.text();
//                 secao.innerHTML = html;

//                 // Recarregar scripts associados
//                 await carregarScriptsDinamicamente(pagina);
//             } else {
//                 console.error('Resposta do servidor não OK:', response.status);
//             }
//         } catch (error) {
//             console.error('Erro ao trocar de página:', error);
//         }
//     }
// };


// const carregarScriptsDinamicamente = async (pagina) => {
//     // Remove os scripts antigos, se existirem
//     console.log('pagina:', pagina)
//     const scripts = document.querySelectorAll('script');
//     scripts.forEach(script => {
//         if (script.getAttribute('type') === 'module') {
//             script.remove();
//         }
//     });

//     let scriptUrls

//     // Adiciona scripts novos
//     if(pagina == 'login'){
//        scriptUrls = [
//             '../scripts/validaFormFunctions.js',
//             '../scripts/header.js',
//             '../scripts/validaFormLogin.js',
//             '../scripts/header.js',
//             '../scripts/footer.js',
//             '../scripts/filtraProdutos.js'
//         ];
//     }else if(pagina.length == 0){
//         scriptUrls = [
//             '../scripts/produtosDB.js',
//             '../scripts/menuCarrossel.js',
//             '../scripts/header.js',
//             '../scripts/footer.js',
//             '../scripts/filtraProdutos.js'
//         ];
//     }

//     for (const url of scriptUrls) {
//         const script = document.createElement('script');
//         script.src = url;
//         script.type = 'module';
//         script.defer = true;
        
//         // Adiciona um listener para depuração
//         script.onload = () => console.log(`Script carregado: ${url}`);
//         script.onerror = () => console.error(`Erro ao carregar o script: ${url}`);
        
//         document.body.appendChild(script);
        
//         // Espera o script ser carregado antes de continuar
//         await new Promise(resolve => script.onload = resolve);
//     }
// };

// // Inicializa os manipuladores de eventos e scripts
// document.addEventListener('DOMContentLoaded', () => {
//     sacolaIcon.addEventListener('click', () => trocarPagina('sacola'));
//     homeIcon.addEventListener('click', () => trocarPagina(''));
//     loginIcon.addEventListener('click', () => trocarPagina('login'));
//     favoritosIcon.addEventListener('click', () => trocarPagina('favoritos'));
// });