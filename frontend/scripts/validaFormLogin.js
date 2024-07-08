import ValidaForm from "./validaFormFunctions.js";

const camposDoLogin = document.querySelector('#login').querySelectorAll("[required]");
const loginOlho = document.querySelector('#icon__olho__login');

const inputSenhaLogin = document.querySelector('#senha__login');
const botaoSubmit = document.querySelector('#enviar__cadastro');

const cadastroBtn = document.querySelector('.quero__cadastrar');


camposDoLogin.forEach((campo)=>{
    campo.addEventListener("blur", ()=> ValidaForm.verificaCampo(campo));
    campo.addEventListener('invalid', (e) => e.preventDefault());
});

cadastroBtn.addEventListener('click', mudarPaginaParaCadastro);

function mudarPaginaParaCadastro(){
    window.location.href = "http://localhost:3000/cadastro"
}

loginOlho.addEventListener('click', (e)=>ValidaForm.toggleMostrarSenha(e, inputSenhaLogin));



