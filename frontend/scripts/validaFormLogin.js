import ValidaForm from "./validaFormFunctions.js";
import Modal from "./modal.js";
import { cadastroPage } from "./loginECadastroPage.js";

const response = await fetch('/env');
const env = await response.json();
const apiURL = env.apiURL;

let camposDoLogin, loginOlho, inputSenhaLogin, botaoSubmit, formLogin, cadastroBtn;

export const iniciarLoginPage = () =>{
     camposDoLogin = document.querySelector('#login').querySelectorAll("[required]");
     loginOlho = document.querySelector('#icon__olho__login');
    
     inputSenhaLogin = document.querySelector('#senha__login');
     botaoSubmit = document.querySelector('.login__btn__entrar');
     formLogin = document.querySelector('#login form')
    
     cadastroBtn = document.querySelector('.quero__cadastrar');
     
     camposDoLogin.forEach((campo)=>{
         campo.addEventListener("blur", ()=> ValidaForm.verificaCampo(campo));
         campo.addEventListener('invalid', (e) => e.preventDefault());
     });

     if (loginOlho) {
        loginOlho.addEventListener('click', (e) => ValidaForm.toggleMostrarSenha(e, inputSenhaLogin));
    }

    if (botaoSubmit) {
        botaoSubmit.addEventListener('click', (e) => loginAutenticacao(e));
    }

    if (cadastroBtn) {
        cadastroBtn.addEventListener('click', async () => {
            await cadastroPage();
        });
    }
}




const addBotaoSubmitEvent = () => {
    botaoSubmit.addEventListener('click', (e) => loginAutenticacao(e));
}




// cadastroBtn.addEventListener('click', async()=> await cadastroPage());
// botaoSubmit.addEventListener('click', (e)=>loginAutenticacao(e))

// async function mudarPaginaParaCadastro(){
//     await cadastroPage();
// }


// async function mudarPaginaParaCadastro() {
//     await cadastroPage();
    
//     // Após mudar a página, recrie o botão e adicione o evento novamente
//     cadastroBtn = document.querySelector('.quero__cadastrar');
//     addCadastroBtnEvent();
// }



// loginOlho.addEventListener('click', (e)=>ValidaForm.toggleMostrarSenha(e, inputSenhaLogin));

export async function loginAutenticacao(e, loginCadastro){
    e.preventDefault();

    let loginJSON, login

    if(!loginCadastro){
        const formData = new FormData(formLogin);
        login = Object.fromEntries(formData.entries());
        loginJSON = JSON.stringify(login);
    }else{
        login ={
            email_login: loginCadastro.email,
            senha_login: loginCadastro.senha
        }
        loginJSON = JSON.stringify(login);
    }

    try{
        const response = await fetch(`${apiURL}/usuario/loginUsuario`,{
            method:'post',
            headers:{
                'content-type':'application/json'
            },
            body: loginJSON
        });

        const data = await response.json();

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

// iniciarLoginPage();

