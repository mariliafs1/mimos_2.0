import Modal from "./modal.js";

const secao = document.querySelector('#home');



const response = await fetch('/env');
const env = await response.json();
const apiURL = env.apiURL;

export const sacolaAutorizada = async(req, res) =>{
    const token = localStorage.getItem('authToken');
    try {
        const response = await fetch(`${apiURL}/sacola`,{
            method:'get',
            headers:{
                'Authorization': `Bearer ${token}`,
                'content-type':'application/json'
            }
        });
            
            if(response.ok){
                const html = await response.text();
                secao.innerHTML = html;
                await listarProdutosSacola();
                atualizarSubTotal();
      

            }else{
                const errorMessage = await response.json()
                console.error('Erro:', errorMessage.message);
                return errorMessage.message;
            }

    } catch (error) {
        console.log(error)
    }
}

const listarProdutosSacola = async () =>{

    try {

        const {carrinho, quantidadeDeProdutosNaSacola} = await getProdutosSacola();
      
        iconNumeroDeProdutosSacola(carrinho);

        if(carrinho.length != 0){
            const sacolaVazia = document.querySelector('.sacola__vazia');
            sacolaVazia.classList.add('hide');
        }else{
            sacolaVazia.classList.remove('hide');
        }

        carrinho.forEach((produto) => {
            criarProdutoSacola(produto.produto.nome, produto.produto.preco, produto.produto.imagem, produto.produto._id, produto.quantidade )
        });
        
    } catch (error) {
        console.log(error)
    }
}

async function deletaProduto(e){
    const token = localStorage.getItem('authToken');
    
    let produtoId = e.target.parentElement.id;
    
    try {
        const response = await fetch(`${apiURL}/sacola/${produtoId}`,{
            method:'delete',
            headers:{
                'authorization': `Bearer ${token}`,
                'content-type':'application/json'
            }
        });
        const produtoDeletado = await response.json();
        Modal.openModal(produtoDeletado.message);
        await atualizaSacola();
        
        
    } catch (error) {
        console.log(error)
    }
    
}

const atualizaSacola = async () => {
    const sacola = document.querySelector('#home');
    sacola.innerHTML = '';
    await sacolaAutorizada(); 
    
}

function criarProdutoSacola(nome, preco, imagem, id, quantidade){
    const finalizarSacolaBtn = document.querySelector('.finalizar__compra__sacola');
    const sacolaItens = document.querySelector('.sacola__itens');
    const lixoBtn = document.querySelectorAll('.lixo');
    const sacolaVazia = document.querySelector('.sacola__vazia');
    const divSacolaProdutoTotal = document.createElement('div');
    divSacolaProdutoTotal.classList.add('sacola__produto__total');

    

    const divSacolaProduto = document.createElement('div');
    divSacolaProduto.classList.add('sacola__produto');
    divSacolaProduto.id = id;

    const imgSacolaProdutoImg = document.createElement('img')
    imgSacolaProdutoImg.classList.add('sacola__produto__img');
    imgSacolaProdutoImg.setAttribute('src', imagem );

    divSacolaProduto.appendChild(imgSacolaProdutoImg);
    sacolaItens.appendChild(divSacolaProduto);

    const divSacolaProdutoInfo = document.createElement('div');
    divSacolaProdutoInfo.classList.add('sacola__produto__info');
    const h2SacolaProdutoInfo = document.createElement('h2');
    const pSacolaProdutoInfo = document.createElement('p');
    const inputQuantidade = document.createElement('input');
    inputQuantidade.classList.add('sacola__produto__quantidade')
    inputQuantidade.addEventListener("change", (e) =>atualizarSubTotalInputTexto(e))

    inputQuantidade.setAttribute('type', 'number');
    inputQuantidade.setAttribute('min', '1');
    inputQuantidade.value = quantidade;

    h2SacolaProdutoInfo.textContent = nome;
    pSacolaProdutoInfo.textContent = preco;

    const divPreco = document.createElement('div');
    divPreco.classList.add('sacola__preco');
    divPreco.appendChild(pSacolaProdutoInfo);
    divPreco.appendChild(inputQuantidade);

    divSacolaProdutoInfo.appendChild(h2SacolaProdutoInfo);
    divSacolaProdutoInfo.appendChild(divPreco);

    const divlixo = document.createElement('div');
    divlixo.classList.add('lixo');
    const imgLixo = document.createElement('img');
    imgLixo.setAttribute('src', './img/lixo.svg');
    
    divlixo.appendChild(imgLixo);
    divlixo.id = id;
    divlixo.addEventListener('click', (e)=>deletaProduto(e))
    divSacolaProduto.appendChild(divSacolaProdutoInfo);
    divSacolaProduto.appendChild(divlixo);


    divSacolaProdutoTotal.appendChild(divSacolaProduto);
    sacolaItens.appendChild(divSacolaProdutoTotal);
   
}

function atualizarSubTotal(){

    const sacolaPreco = document.querySelectorAll('.sacola__preco');
    let precoTotal = document.querySelector('.sacola__finalizar__subtotal');
    
    let precoTotalCalc = 0;
    let precoTratado = []
    let quantidadeProduto = []

    for (let i=0; i<sacolaPreco.length; i++){
        precoTratado[i] = sacolaPreco[i].firstChild.innerText.replace("R$ ", "").replace(",",".");
        quantidadeProduto[i] = sacolaPreco[i].lastChild.value;
        precoTotalCalc += (precoTratado[i]*quantidadeProduto[i])
    }

    precoTotalCalc = precoTotalCalc.toFixed(2);
    precoTotalCalc = precoTotalCalc.replace(".",",");
    precoTotal.lastChild.previousSibling.innerText = "R$ "+precoTotalCalc;
}

export const getProdutosSacola = async(req, res) => { //ESTOU AQUIIIIIIIIIII
    const token = localStorage.getItem('authToken');
    console.log('entrou')
    try {
        const response = await fetch(`${apiURL}/sacola/${token}`,{
            method:'get',
            headers:{
                'Authorization': `Bearer ${token}`,
                'content-type':'application/json'
            }
        });

        if(!response.ok){
            throw new Error('Erro na resposta da API');
        }
        const data = await response.json();
        const carrinho = data.carrinho;
        let quantidadeDeProdutosNaSacola = 0

        carrinho.forEach((produto)=>{
            quantidadeDeProdutosNaSacola += produto.quantidade
        });

        console.log(quantidadeDeProdutosNaSacola);
        return {carrinho, quantidadeDeProdutosNaSacola};

    } catch (error) {
        console.log(error);
    }

}


async function atualizarSubTotalInputTexto(e){
    atualizarSubTotal();
    const token = localStorage.getItem('authToken');
    const produtoId = e.target.parentElement.parentElement.parentElement.id;
    const quantidadeProduto = e.target.value
    try {
        const response = await fetch(`${apiURL}/sacola/${produtoId}`,{
            method:'put',
            headers:{
                'authorization': `Bearer ${token}`,
                'content-type':'application/json'
            },
            body: JSON.stringify({quantidadeProduto})
        });
        const produtosNaSacola = await response.json();
       iconNumeroDeProdutosSacola(produtosNaSacola.carrinho);
        console.log(sacolaIcon);
     
    } catch (error) {
        console.log(error)
    }

}


function iconNumeroDeProdutosSacola(produtos){
   
    
    let quantidadeDeProdutosNaSacola = 0;
    let numeroDeProdutosNaSacola2 = document.querySelector('.numero__produtos__sacola');
    

    produtos.forEach((produto)=>{
        quantidadeDeProdutosNaSacola += parseInt(produto.quantidade);
    })

    numeroDeProdutosNaSacola2.textContent=quantidadeDeProdutosNaSacola;
    return quantidadeDeProdutosNaSacola;
    
}



