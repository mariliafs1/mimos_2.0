
import ValidaForm from "./validaFormFunctions.js";
import Modal from "./modal.js";
import { loginPage } from "./loginECadastroPage.js";
import Note from "./notes.js";

const response = await fetch('/env');
const env = await response.json();
const apiURL = env.apiURL;

let camposDoCadastro, inputCPF, senhaOlho, inputSenha, senhaOlho2, inputSenhaRepete, botaoSubmit, termoCheck, btnJaTenhoCadastro, formCadastro;

export const iniciarCadastroPage = () => {
    console.log('iniciou CadastroPage');
    
    camposDoCadastro = document.querySelector('#cadastro').querySelectorAll("[required]");
    inputCPF = document.querySelector(".cpf");
    senhaOlho = document.querySelector('#icon__olho');
    inputSenha = document.querySelector('#senha');
    senhaOlho2 = document.querySelector('#icon__olho2');
    inputSenhaRepete = document.querySelector('#repete__senha');
    botaoSubmit = document.querySelector('#enviar__cadastro');
    termoCheck = document.querySelector('.input__check');
    btnJaTenhoCadastro = document.querySelector('.tenho__cadastro');
    formCadastro = document.querySelector('#cadastro form');
    
    if (btnJaTenhoCadastro) {
        btnJaTenhoCadastro.addEventListener('click', async () => {
            console.log('entrou');
            Note.closeAllNotes();
            await loginPage();
            Note.openNotes('Login: teste@teste.com<br>Senha: 123456<br>Caso prefira, você também pode realizar o seu próprio cadastro!');
        });
    }

    if (inputCPF) {
        inputCPF.addEventListener('keypress', (e) => ValidaForm.formataCPF(inputCPF, e));
    }

    camposDoCadastro.forEach((campo) => {
        campo.addEventListener("change", () => habilitaCadastro());
        campo.addEventListener('keyup', () => habilitaCadastro());
        campo.addEventListener("blur", () => ValidaForm.verificaCampo(campo));
        campo.addEventListener('invalid', (e) => e.preventDefault());
    });

    if (formCadastro) {
        formCadastro.addEventListener('submit', (e) => cadastrado(e));
    }

    if (senhaOlho) {
        senhaOlho.addEventListener('click', (e) => ValidaForm.toggleMostrarSenha(e, inputSenha));
    }

    if (senhaOlho2) {
        senhaOlho2.addEventListener('click', (e) => ValidaForm.toggleMostrarSenha(e, inputSenhaRepete));
    }

    console.log('btn', btnJaTenhoCadastro);
};

function habilitaCadastro() {
    let validadorForm = Array.from(camposDoCadastro).find((campo) => campo.checkValidity() === false);
    validadorForm ? botaoSubmit.setAttribute('Disabled', "") : botaoSubmit.removeAttribute('Disabled');
}

async function cadastrado(e) {
    e.preventDefault();

    const formData = new FormData(formCadastro);
    const usuario = Object.fromEntries(formData.entries());
    console.log(usuario);

    try {
        const response = await fetch(`${apiURL}/usuario/registraUsuario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });
        const data = await response.json();
        console.log('Resposta do backend:', data);

        if (data.message === "usuario criado com sucesso") {
            Modal.openModal(data.message, `${apiURL}/login`);
        } else {
            Modal.openModal(data.message);
        }
    } catch (error) {
        console.error('Erro na solicitação:', error.message);
        Modal.openModal(error.message);
    }
}

