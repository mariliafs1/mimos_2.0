import ValidaForm from "./validaFormFunctions.js";
import Modal from "./modal.js";

const response = await fetch('/env');
const env = await response.json();
const apiURL = env.apiURL;

const camposDoCadastro = document.querySelector('#cadastro').querySelectorAll("[required]");
const inputCPF = document.querySelector(".cpf");
const senhaOlho = document.querySelector('#icon__olho')
const inputSenha = document.querySelector('#senha');
const senhaOlho2 = document.querySelector('#icon__olho2');

const inputSenhaRepete = document.querySelector('#repete__senha');

const botaoSubmit = document.querySelector('#enviar__cadastro');
const termoCheck = document.querySelector('.input__check');
const btnJaTenhoCadastro = document.querySelector('.tenho__cadastro');

const formCadastro = document.querySelector('#cadastro form');





btnJaTenhoCadastro.addEventListener('click', ()=>{
    window.location.href = `${apiURL}/login`
})

inputCPF.addEventListener('keypress',(e)=>ValidaForm.formataCPF(inputCPF,e));

camposDoCadastro.forEach((campo)=>{
    campo.addEventListener("change", ()=>habilitaCadastro());
    campo.addEventListener('keyup', ()=>habilitaCadastro())
    campo.addEventListener("blur", ()=> ValidaForm.verificaCampo(campo));
    campo.addEventListener('invalid', (e) => e.preventDefault());
});


formCadastro.addEventListener('submit', (e)=>cadastrado(e));


function habilitaCadastro(){
    let validadorForm = Array.from(camposDoCadastro).find((campo) => campo.checkValidity() == false);
    validadorForm ? botaoSubmit.setAttribute('Disabled', "") : botaoSubmit.removeAttribute('Disabled');
}


async function cadastrado(e){
    e.preventDefault();

    const formData = new FormData(e.target);
    const usuario = Object.fromEntries(formData.entries());
    console.log(usuario);

    try{
        const response = await fetch(`${apiURL}/cadastro/registraUsuario`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(usuario)
        });
        const data = await response.json();
        console.log('Resposta do backend:', data);

        // Exemplo de modal usando Bootstrap (ou outro framework/modal de sua escolha)
        if (data.message=="usuario criado com sucesso") {
            Modal.openModal(data.message, `${apiURL}/login`);
        }else{
            Modal.openModal(data.message)
        }
    } catch (error) {
        console.error('Erro na solicitação:', error.message);
        Modal.openModal(error.message);

    }

}



//TRATA SENHA

senhaOlho.addEventListener('click', (e)=>ValidaForm.toggleMostrarSenha(e, inputSenha));
senhaOlho2.addEventListener('click', (e)=>ValidaForm.toggleMostrarSenha(e, inputSenhaRepete));




