import dotenv from 'dotenv'
let carrosselUltimosLancamentos = document.querySelector("#carrossel__ultimos__lancamentos")
let carrosselPromo = document.querySelector("#carrossel__promo");
const carrossel2 = document.querySelector('#carrossel__ultimos__lancamentos');
const carrossel = document.querySelector('.carrossel__container');
let carrinho = JSON.parse(localStorage.getItem('carrinho') ) || [];
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

dotenv.config();

const apiURL = process.env.NODE_ENV === 'production' ? process.env.PROD_API_URL : process.env.DEV_API_URL;

const produtosDisponiveis = []; //VARIÁVEL QUE ARMAZENA OS DADOS DO JSON INDICANDO UMA LISTA DE PRODUTOS DISPONÍVEIS NA LOJA

async function getAndShowProdutos(){
    try {
<<<<<<< HEAD
        const response = await fetch(`${apiURL}/produtos`);
=======
        const response = await fetch('https://mimos-2-0.vercel.app/');
>>>>>>> e9c25af7da904b49eb172d9bdbf6b1beb2179cc1
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
}
