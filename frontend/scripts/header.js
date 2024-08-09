import Modal from "./modal.js";
import { sacolaAutorizada, getProdutosSacola } from "./sacola.js"
import { favoritosPage } from "./favoritos.js";
import { loginPage } from "./loginECadastroPage.js";
import Note from "./notes.js";


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

Note.openNotes('Olá Visitante, tudo bem? Caso os produtos não apareçam, atualize a página, o banco de dados é gratuíto e às vezes da erro!');

const trocarPagina = async (pagina)=>{
    let usuario = localStorage.getItem('user') || [];
    if(pagina == 'sacola'){
        const response = await sacolaAutorizada();
        if(response){
            Modal.openModal('Faça Login para acessar sua sacola!');
        }else{
            Note.closeAllNotes();
        }
    }else if(pagina == 'login' && usuario.length > 0){
        let logout = document.querySelector('.logout');
        console.log('nhaiim2')
        if(logout.classList.contains('hide')){
            logout.classList.remove('hide');
            // Note.closeAllNotes();
            logout.addEventListener('click', ()=>deslogar());
        }else{
            logout.classList.add('hide');
        }       
    }else if(pagina == 'login' && usuario.length == 0){
        Note.closeAllNotes();
        await loginPage();
        Note.openNotes('Login: teste@teste.com<br>Senha: 123456<br>Caso prefira, você também pode realizar o seu próprio cadastro!')
    }else if(pagina == 'favoritos'){
        await favoritosPage();
        const listaMenuAberto = document.querySelector('.lista__menu__aberto')
        listaMenuAberto.remove();

    }else{
        // Note.closeAllNotes();
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
    Modal.openModal('Usuário deslogado com sucesso!', `${apiURL}/`);
}

headerLogado();

