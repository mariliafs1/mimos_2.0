import Modal from "./modal.js";
import { sacolaAutorizada } from "./sacola.js";

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
    }
}



function iconAlteraNumeroDeProdutosSacola(){
    let quantidadeDeProdutosNaSacola = 0;
    carrinho.forEach((produto)=>{
        quantidadeDeProdutosNaSacola = parseInt(produto.quantidade)+quantidadeDeProdutosNaSacola;
    }) 
    numeroDeProdutosNaSacola.textContent=quantidadeDeProdutosNaSacola;
}

const headerLogado = ()=>{
    const usuarioLogado = document.querySelector('.nome__usuario')
    const usuario = JSON.parse(localStorage.getItem('user')) || [];
    if(usuario.length != 0){
    let userName = usuario.nome.split(' ')[0];
        usuarioLogado.innerHTML = `<img class="cabecalho__icons__login" src="img/user.png" alt="icone de usuário">${userName}`
    }
    
}

const deslogar = () =>{
    let usuarioLogado = document.querySelector('.nome__usuario')
    let logout = document.querySelector('.logout');
    logout.classList.add('hide');
    localStorage.clear();
    usuarioLogado.innerHTML = `<img class="cabecalho__icons__login" src="img/user.png" alt="icone de usuário">`
    Modal.openModal('Usuário deslogado com sucesso!');
}

headerLogado();