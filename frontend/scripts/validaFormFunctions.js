const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const mensagensErroValidacao ={
    nome: {
        valueMissing: "Preencha o campo Nome.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email_login:{
        valueMissing: "Preencha o campo e-mail.",
        tooShort: "Por favor, preencha um e-mail válido.",
        typeMismatch: "Esse não um e-mail válido."
    },
    email__cadastro:{
        valueMissing: "Preencha o campo e-mail.",
        tooShort: "Por favor, preencha um e-mail válido.",
        typeMismatch: "Esse não um e-mail válido."
    },
    cpf:{
        valueMissing: "Preencha o campo cpf.",
        patternMismatch: "Por favor, preencha um cpf válido.",
        tooShort: "Está Faltando Digitos no CPF",
        customError: "cpf Inválido"
    },
    senha_login:{
        valueMissing: "Preencha o campo senha.",
        // patternMismatch: "Por favor, preencha uma senha válida.", 
        tooShort: "A senha deve ter no mínimo 6 dígitos"
    },
    senha:{
        valueMissing: "Preencha o campo senha.",
        // patternMismatch: "Por favor, preencha uma senha válida.", 
        tooShort: "A senha deve ter no mínimo 6 dígitos"
    },
    senha_repetida:{
        valueMissing: "Preencha esse campo.",
        // patternMismatch: "Por favor, preencha uma senha válida.",
        tooShort: "Por favor, preencha uma senha válida.",
        customError: "Senhas diferentes."
    },
    nascimento:{
        valueMissing: "Preencha o campo data de nascimento.",
        patternMismatch: "Por favor, preencha uma data de nascimento válida.",
        tooShort: "Por favor, preencha uma data de nascimento válida."
    },
    termos:{
        customError: "Precisa estar marcado."
    }
}

function verificaCampo(campo){

    let mensagem = '';
    if(campo.name == "cpf" ){ 
        ehUmCPF(campo);
    }

    if(campo.name == 'senha_repetida' && !verificaSenhaRepetida(campo) && campo.value != ''){
        campo.setCustomValidity('Senhas diferentes.');  
    }else if( campo.name == 'senha_repetida'  ){ 
        campo.setCustomValidity(''); 
    }

    if(campo.name == 'termos' && !campo.checked){
        campo.setCustomValidity('precisas')
    }else if(campo.name == 'termos'){
        campo.setCustomValidity('');
    }
    
    tiposDeErro.forEach(erro => {
        if(campo.validity[erro]){ 
            mensagem = mensagensErroValidacao[campo.name][erro];
        }
    })

    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorDeInput = campo.checkValidity();
   

    if(!validadorDeInput){
        mensagemErro.textContent = mensagem;
    }else{
        mensagemErro.textContent = '';
    }

}

function formataCPF(cpf, e ){
    let inputLength = cpf.value.length;
    let stringTeste = [3,7,11];
 
    if(!stringTeste.includes(inputLength)){
        if(!/[\d]/.test(e.key)){
            e.preventDefault();
            return;
        }
    }
    if((inputLength==3 || inputLength == 7) && e.key != '.'){
        if(!/[\d]/.test(e.key)){
            e.preventDefault();
            return;
        }
        cpf.value += '.';
    }else if((inputLength == 11)&& e.key !='-'){
        if(!/[\d]/.test(e.key)){
            e.preventDefault();
            return;
        }
        cpf.value += '-';
    }
}

function ehUmCPF(campo){
    const cpf = campo.value.replace(/\.|-/g, "");

    if(campo.value.length<11){
        return;
    }else if((validaNumerosRepetidos(cpf) || validaPrimeiroDigito(cpf) || validaSegundoDigito(cpf)) && campo.value != ''){
        campo.setCustomValidity('Esse cpf nãe é válido');


    }else{
        campo.setCustomValidity('');
    }
}

function validaNumerosRepetidos(cpf){
    const numerosRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999',
    ]

    return numerosRepetidos.includes(cpf);
}

function validaPrimeiroDigito(cpf){
    let soma = 0;
    let multiplicador = 10;

    for(let tamanho = 0; tamanho < 9; tamanho++){
        soma += cpf[tamanho]*multiplicador;
        multiplicador--;
    }

    soma = (soma*10) % 11;
    if(soma == 10 || soma == 1){
        soma = 0;
    }

    return soma != cpf[9];
}

function validaSegundoDigito(cpf){
    let soma = 0;
    let multiplicador = 11;

    for(let tamanho = 0; tamanho < 10; tamanho++){
        soma += cpf[tamanho]*multiplicador;
        multiplicador--;
    }

    soma = (soma * 10) % 11;
    if(soma == 10 || soma == 1){
        soma = 0;
    }

    return soma != cpf[10];
}

function verificaSenhaRepetida(campo){
    const inputSenha = document.querySelector('#senha')
    if(inputSenha.value == campo.value){
        return true;
    }else{
        return false;
    }
}

function toggleMostrarSenha(e, campo){
    if(campo.type === 'password'){
        campo.setAttribute('type', 'text');
        e.target.setAttribute('src','../img/olho_open.svg')
        e.target.setAttribute('alt','Icone de olho aberto')
    }else{
        campo.setAttribute('type','password');
        e.target.setAttribute('src','../img/olho_closed.svg')
        e.target.setAttribute('alt','Icone de olho fechado')
    }
}


const ValidaForm = {verificaCampo, toggleMostrarSenha, formataCPF}

export default ValidaForm;