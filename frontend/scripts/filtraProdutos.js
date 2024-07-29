import {adicionaProdutoSacola} from './produtosDB.js'

const inputBuscar = document.querySelector('.busca__input');
const buscaCategorizada = document.querySelector("#busca__categorizada");
const menuCarrossel = document.querySelector("#carrossel__menu").querySelectorAll('img');
const buscaCategorizadaContainer = document.querySelector('.busca__categorizada__container');

let buscaProdutoFiltrado = document.querySelector('.busca__produto__filtrado');

buscaCategorizada.addEventListener('click', (e) =>fecharCategoriasPeloX(e));
// buscaCategorizada.addEventListener('click', (e)=>toggleFavoritosCategorizados(e))

inputBuscar.addEventListener("input", filtrarPesquisa);

function fecharCategoriasPeloX(e){
    if(e.target.classList.contains('busca__categorizada__cross')){
        buscaCategorizada.classList.add('hide');
    }
    return;
}

// function toggleFavoritosCategorizados(e){
//     console.log('entrou');
//     console.log(e.target);
//     if(e.target.classList.contains('coracaoCategorizado')){
//         toggleFavoritos(e);

//     }
//     return;
// }


const toggleBuscaCategorizadaImgButton = (imgButton) => {
    // Remove o listener de fechamento da categoria de todos os botões de imagem
    menuCarrossel.forEach((img) => {
        img.removeEventListener("click", fechamentoDaCategoria);
        img.addEventListener("click", filtrarCategoria);
    });

    // Alterna o evento do botão clicado
    imgButton.removeEventListener("click", filtrarCategoria);
    imgButton.addEventListener("click", fechamentoDaCategoria);
}

const fechamentoDaCategoria = (e) => {
    buscaCategorizada.classList.add('hide');
    // Reinicia o evento do botão para filtrar a categoria
    e.target.removeEventListener("click", fechamentoDaCategoria);
    e.target.addEventListener("click", filtrarCategoria);
    console.log('Categoria fechada');
}

async function filtrarCategoria(e) {
    buscaCategorizada.classList.remove('hide');
    buscaCategorizadaContainer.innerHTML = '';
    
    let categoriaSelecionada = e.target.id.slice(7);
    let response = await fetch(`/produtos/${categoriaSelecionada}`);
    const produtos = await response.json();
    
    buscaCategorizadaContainer.innerHTML = `<div class="cross__background"><img class="busca__categorizada__cross" src="img/cross.svg" alt=""></div>`;
    
    produtos.forEach((produto) => {
        buscaCategorizadaContainer.innerHTML += renderizaProdutos(produto);
    });

    let produtoBtns = buscaCategorizadaContainer.querySelectorAll('.produto__botao');
    produtoBtns.forEach((btn) => {
        btn.addEventListener('click', () => adicionaProdutoSacola(btn.id));
    });

    let imgButton = e.target;
    toggleBuscaCategorizadaImgButton(imgButton);
}

// Adiciona event listeners iniciais para o menuCarrossel
menuCarrossel.forEach((img) => {
    img.addEventListener("click", filtrarCategoria);
});

async function filtrarPesquisa(){
    let response = await fetch("/produtos");
    const produtos = await response.json();
    console.log(produtos);
    buscaProdutoFiltrado.innerHTML = '';
    if(inputBuscar.value != ''){
        produtos.forEach((produto) => {
            if(produto.nome.toLowerCase().includes(inputBuscar.value.toLowerCase())){
            buscaProdutoFiltrado.innerHTML += renderizaProdutos(produto);          
    }})

            let produtoBtn = buscaProdutoFiltrado.querySelectorAll('.produto__botao');
            produtoBtn.forEach( btn => {
                console.log('aqui', btn);
                btn.addEventListener('click', ()=>adicionaProdutoSacola(btn.id))
            })
            let btnCoracao = buscaProdutoFiltrado.querySelectorAll('.produto__favoritar'); 
            btnCoracao.forEach(btn => btn.addEventListener('click', (e) => toggleFavoritos(e)))
    }
}

function renderizaProdutos(produto){
    return(
        `
        <div class="produto">
            <div class="produto__img__container"><img src=${produto.imagem} alt="" class="produto__img"></div>
            <div class="produto__infos">
                <div class="produto__nome__favoritar">
                    <p>${produto.nome}</p>
                    <div class="produto__favoritar" ><img id=${produto._id} src="./img/coracao.png" alt=""></div>
                </div>
                <div class="produto__infos-precos-botao">
                    <div class="produto__infos-precos">
                        <p class="produto__preco">R$${produto.preco}</p>
                        ${produto.precoAntigo 
                        ? `<p class="produto__preco-antigo">R$${produto.precoAntigo}</p>`
                        :``}
                    </div>
                    <div class="produto__infos-botao">
                        <button id=${produto._id} class="produto__botao">Adicionar à sacola</button>
                    </div>
                </div>
            </div>
        </div>  
        `     
    )
}