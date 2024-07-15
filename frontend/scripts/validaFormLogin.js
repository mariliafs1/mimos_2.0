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
        const response = await fetch(`${apiURL}/login/loginUsuario`,{
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
            await loginAutorizado(login.email_login);
            
        }else{
            Modal.openModal(data.message);
        }

    }catch(error){
        console.error(error.message)
    }
   
}

async function loginAutorizado(email_login){
    console.log('entrouaquiii');
    const token = localStorage.getItem('authToken');

    try {
        const response = await fetch(`${apiURL}/usuario/${email_login}`,{
            method:'get',
            headers:{
                'Authorization': `Bearer ${token}`,
                'content-type':'application/json'
            }
        });

        let data = await response.json();
        console.log(data);

        if(data.message=='logado com sucesso!'){
            localStorage.setItem('user', JSON.stringify(data.usuario));
            window.location.href = `${apiURL}/`
        }


    } catch (error) {
        console.log(error);
    }

    // try {
    //     const response = await fetch('http://localhost:3000/usuario/668c2923153543f0d26ecaae',{
    //         method:'get',
    //         headers:{
    //             'Authorization': `Bearer ${token}`,
    //             'content-type':'application/json'
    //         }
    //     });

    //     const data = await response.json();
    //     console.log(data);
    //     console.log(data.usuario);

    //     if(data.message == 'logado com sucesso!'){
    //         localStorage.setItem('user', JSON.stringify(data.usuario));
    //         // window.location.href = "http://localhost:3000/"
    //     }
    // } catch (error) {
    //     console.log(error)
    // }
}


