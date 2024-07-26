import ValidaForm from "./validaFormFunctions.js";
import Modal from "./modal.js";

const response = await fetch('/env');
const env = await response.json();
const apiURL = env.apiURL;

const camposDoLogin = document.querySelector('#login').querySelectorAll("[required]");
const loginOlho = document.querySelector('#icon__olho__login');

const inputSenhaLogin = document.querySelector('#senha__login');
const botaoSubmit = document.querySelector('.login__btn__entrar');
const formLogin = document.querySelector('#login form')

const cadastroBtn = document.querySelector('.quero__cadastrar');


camposDoLogin.forEach((campo)=>{
    campo.addEventListener("blur", ()=> ValidaForm.verificaCampo(campo));
    campo.addEventListener('invalid', (e) => e.preventDefault());
});

cadastroBtn.addEventListener('click', mudarPaginaParaCadastro);
botaoSubmit.addEventListener('click', (e)=>loginAutenticacao(e))

function mudarPaginaParaCadastro(){
    window.location.href = `${apiURL}/cadastro`
}

loginOlho.addEventListener('click', (e)=>ValidaForm.toggleMostrarSenha(e, inputSenhaLogin));

async function loginAutenticacao(e){
    e.preventDefault();
    const formData = new FormData(formLogin);
    const login = Object.fromEntries(formData.entries());
    console.log(login);
    console.log(JSON.stringify(login));

    try{
        const response = await fetch(`${apiURL}/usuario/loginUsuario`,{
            method:'post',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(login)
        });

        const data = await response.json();
        console.log('Resposta do backend:', data);

        if(data.message == "Autenticação realizada com sucesso"){
            const token = data.token;
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(data.usuarioSemSenha));
            window.location.href = `${apiURL}/`
            
        }else{
            Modal.openModal(data.message);
        }

    }catch(error){
        console.error(error.message)
    }
   
}
