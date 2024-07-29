import Modal from "./modal.js";
document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/env');
    const env = await response.json();
    const apiURL = env.apiURL;


let carrosselUltimosLancamentos = document.querySelector("#carrossel__ultimos__lancamentos")
let carrosselPromo = document.querySelector("#carrossel__promo");
const carrossel2 = document.querySelector('#carrossel__ultimos__lancamentos');
const carrossel = document.querySelector('.carrossel__container');
let carrinho = JSON.parse(localStorage.getItem('carrinho') ) || [];
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];



const produtosDisponiveis = []; //VARIÁVEL QUE ARMAZENA OS DADOS DO JSON INDICANDO UMA LISTA DE PRODUTOS DISPONÍVEIS NA LOJA

async function getAndShowProdutos(){
    try {

        const response = await fetch(`${apiURL}/produtos`);
        const produtos = await response.json();
        showProdutos(produtos);
                
    } catch (error) {
        console.log(error)
    }
}

getAndShowProdutos();

function showProdutos(produtos){
    carrosselUltimosLancamentos.innerHTML = '';
    carrosselPromo.innerHTML='';
    let container = ''
        produtos.forEach((produto)=>{
            container = `<div class="produto">
                <div class="produto__img__container"><img src=${produto.imagem} alt="" class="produto__img"></div>
                <div class="produto__infos">
                    <div class="produto__nome__favoritar">
                        <p>${produto.nome}</p>
                        <div class="produto__favoritar" ><img class='produto__nome__favoritar__desativado' id=${produto._id} src="../img/coracao.png" alt=""></div>
                    </div>
                    <div class="produto__infos-precos-botao">
                        <div class="produto__infos-precos">
                            <p class="produto__preco">R$${produto.preco}</p>
                            ${produto.precoAntigo ? `<p class="produto__preco-antigo">R$${produto.precoAntigo}</p>` : ''}
                        </div>
                        <div class="produto__infos-botao">
                            <button id=${produto._id} class="produto__botao">Adicionar à sacola</button>
                        </div>
                    </div>
                </div>
            </div> `
            if(!produto.precoAntigo){
                carrosselUltimosLancamentos.innerHTML += container;
            }else{
                carrosselPromo.innerHTML += container;
            }
        })
    let produtosBtn = document.querySelectorAll('.produto__infos-botao button');

    produtosBtn.forEach( (btn) => {
        btn.addEventListener('click', ()=>adicionaProdutoSacola(btn.id));
    })

}
});

export const adicionaProdutoSacola = async (btnId) =>{
    console.log(btnId)
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`/sacola/${btnId}`,{
            method: 'POST',
            headers:{
                'authorization': `Bearer ${token}`,
                'Content-Type':'application/json'
            }
        });
        
        if(response.ok){
            let iconSacola = document.querySelector('.numero__produtos__sacola');
            iconSacola.innerHTML = parseInt(iconSacola.innerHTML) + 1;
            console.log('poduto adicionado na sacola');
            Modal.openModal('Produto adicionado na sacola!')
        }else{
            const errorData = await response.json();
            console.error('Erro na resposta:', errorData.message);
        }

    } catch (error) {
        console.log(error)
    }
}