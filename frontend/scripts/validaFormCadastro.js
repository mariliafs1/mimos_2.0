import ValidaForm from "./validaFormFunctions.js";

const camposDoCadastro = document.querySelector('#cadastro').querySelectorAll("[required]");
const inputCPF = document.querySelector(".cpf");
const senhaOlho = document.querySelector('#icon__olho')
const inputSenha = document.querySelector('#senha');
const senhaOlho2 = document.querySelector('#icon__olho2');

const inputSenhaRepete = document.querySelector('#repete__senha');

const botaoSubmit = document.querySelector('#enviar__cadastro');
const termoCheck = document.querySelector('.input__check');
const btnJaTenhoCadastro = document.querySelector('.botao__form__cadastrar');



btnJaTenhoCadastro.addEventListener('click', ()=>{
    window.location.href = "http://localhost:3000/login"
})

inputCPF.addEventListener('keypress',(e)=>ValidaForm.formataCPF(inputCPF,e));

camposDoCadastro.forEach((campo)=>{
    campo.addEventListener("change", ()=>habilitaCadastro());
    campo.addEventListener('keyup', ()=>habilitaCadastro())
    campo.addEventListener("blur", ()=> ValidaForm.verificaCampo(campo));
    campo.addEventListener('invalid', (e) => e.preventDefault());
});




function habilitaCadastro(){
    let validadorForm = Array.from(camposDoCadastro).find((campo) => campo.checkValidity() == false);
    validadorForm ? botaoSubmit.setAttribute('Disabled', "") : botaoSubmit.removeAttribute('Disabled');
}




//TRATA SENHA

senhaOlho.addEventListener('click', (e)=>ValidaForm.toggleMostrarSenha(e, inputSenha));
senhaOlho2.addEventListener('click', (e)=>ValidaForm.toggleMostrarSenha(e, inputSenhaRepete));




