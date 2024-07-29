import Modal from "./modal.js";
import { showFavoritos } from "./favoritos.js";

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/env");
  const env = await response.json();
  const apiURL = env.apiURL;
  
  let carrosselUltimosLancamentos = document.querySelector(
    "#carrossel__ultimos__lancamentos"
  );
  let carrosselPromo = document.querySelector("#carrossel__promo");

  await getAndShowProdutos(apiURL, carrosselUltimosLancamentos , carrosselPromo);
});

async function getAndShowProdutos(apiURL, carrosselUltimosLancamentos, carrosselPromo) {
    try {
      const response = await fetch(`${apiURL}/produtos`);
      const produtos = await response.json();
      showProdutos(produtos, carrosselUltimosLancamentos, carrosselPromo);
      console.log("entrou");
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}

export const adicionaProdutoSacola = async (btnId) => {
  const token = localStorage.getItem("authToken");
  try {
    const response = await fetch(`/sacola/${btnId}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      let iconSacola = document.querySelector(".numero__produtos__sacola");
      iconSacola.innerHTML = parseInt(iconSacola.innerHTML) + 1;
      console.log("poduto adicionado na sacola");
      Modal.openModal("Produto adicionado na sacola!");
    } else {
      const errorData = await response.json();
      console.error("Erro na resposta:", errorData.message);
      Modal.openModal("Faça login para iniciar suas compras!");
    }
  } catch (error) {
    console.log(error);
  }
};

export const showProdutos = (
  produtos,
  carrosselUltimosLancamentos,
  carrosselPromo
) => {
  carrosselUltimosLancamentos.innerHTML = "";
  carrosselPromo.innerHTML = "";
  let container = "";
  produtos.forEach((produto) => {
    container = `<div class="produto">
                <div class="produto__img__container"><img src=${
                  produto.imagem
                } alt="" class="produto__img"></div>
                <div class="produto__infos">
                    <div class="produto__nome__favoritar">
                        <p>${produto.nome}</p>
                        <div class="produto__favoritar" ><img class='produto__nome__favoritar__desativado' id=${
                          produto._id
                        } src="../img/coracao.png" alt=""></div>
                    </div>
                    <div class="produto__infos-precos-botao">
                        <div class="produto__infos-precos">
                            <p class="produto__preco">R$${produto.preco}</p>
                            ${
                              produto.precoAntigo
                                ? `<p class="produto__preco-antigo">R$${produto.precoAntigo}</p>`
                                : ""
                            }
                        </div>
                        <div class="produto__infos-botao">
                            <button id=${
                              produto._id
                            } class="produto__botao">Adicionar à sacola</button>
                        </div>
                    </div>
                </div>
            </div> `;
    if (!produto.precoAntigo) {
      carrosselUltimosLancamentos.innerHTML += container;
    } else {
      carrosselPromo.innerHTML += container;
    }
  });
  let produtosBtn = document.querySelectorAll(".produto__infos-botao button");
  let favoritosBtn = document.querySelectorAll('.produto__favoritar img');

  favoritosBtn.forEach((btn) =>{
      btn.addEventListener('click', ()=>toggleFavorito(btn.id));
  })

  produtosBtn.forEach((btn) => {
    btn.addEventListener("click", () => adicionaProdutoSacola(btn.id));
  });
};

const toggleFavorito = async (produtoId)=>{
    const token = localStorage.getItem('authToken');
    try {
        const response = await fetch(`/favoritos/${produtoId}`, {
            method: 'POST',
            headers:{
                'Authorization':`Bearer ${token}`,
                'contente-Type':'application/json'
            }
        })

        const data = await response.json();
        await showFavoritos();
        console.log(data);

    } catch (error) {
        console.log(error)
    }
}
// import Modal from "./modal.js";
// import { showFavoritos } from "./favoritos.js";

// document.addEventListener('DOMContentLoaded', async () => {
//     try {
//         const response = await fetch('/env');
//         const env = await response.json();
//         const apiURL = env.apiURL;
//         console.log('KRALHA')

//         let carrosselUltimosLancamentos = document.querySelector("#carrossel__ultimos__lancamentos");
//         let carrosselPromo = document.querySelector("#carrossel__promo");

//         await getAndShowProdutos(apiURL, carrosselUltimosLancamentos, carrosselPromo);
//     } catch (error) {
//         console.error('Erro ao carregar a configuração:', error);
//     }
// });

// async function getAndShowProdutos(apiURL, carrosselUltimosLancamentos, carrosselPromo) {
//     try {
//         const response = await fetch(`${apiURL}/produtos`);
//         const produtos = await response.json();
//         showProdutos(produtos, carrosselUltimosLancamentos, carrosselPromo);
//     } catch (error) {
//         console.error('Erro ao buscar produtos:', error);
//     }
// }

// export const showProdutos = (produtos, carrosselUltimosLancamentos, carrosselPromo) => {
//     carrosselUltimosLancamentos.innerHTML = '';
//     carrosselPromo.innerHTML = '';
//     produtos.forEach((produto) => {
//         const container = `
//             <div class="produto">
//                 <div class="produto__img__container">
//                     <img src="${produto.imagem}" alt="" class="produto__img">
//                 </div>
//                 <div class="produto__infos">
//                     <div class="produto__nome__favoritar">
//                         <p>${produto.nome}</p>
//                         <div class="produto__favoritar">
//                             <img class="produto__nome__favoritar__desativado" id="${produto._id}" src="../img/coracao.png" alt="">
//                         </div>
//                     </div>
//                     <div class="produto__infos-precos-botao">
//                         <div class="produto__infos-precos">
//                             <p class="produto__preco">R$${produto.preco}</p>
//                             ${produto.precoAntigo ? `<p class="produto__preco-antigo">R$${produto.precoAntigo}</p>` : ''}
//                         </div>
//                         <div class="produto__infos-botao">
//                             <button id="${produto._id}" class="produto__botao">Adicionar à sacola</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>`;
//         if (!produto.precoAntigo) {
//             carrosselUltimosLancamentos.innerHTML += container;
//         } else {
//             carrosselPromo.innerHTML += container;
//         }
//     });

//     let produtosBtn = document.querySelectorAll('.produto__infos-botao button');
//     produtosBtn.forEach((btn) => {
//         btn.addEventListener('click', () => adicionaProdutoSacola(btn.id));
//     });

//     let favoritosBtn = document.querySelectorAll('.produto__favoritar img');
//     favoritosBtn.forEach((btn) => {
//         btn.addEventListener('click', () => toggleFavorito(btn.id));
//     });
// }

// export const adicionaProdutoSacola = async (btnId) => {
//     const token = localStorage.getItem('authToken');
//     try {
//         const response = await fetch(`/sacola/${btnId}`, {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             }
//         });

//         if (response.ok) {
//             let iconSacola = document.querySelector('.numero__produtos__sacola');
//             iconSacola.innerHTML = parseInt(iconSacola.innerHTML) + 1;
//             console.log('Produto adicionado na sacola');
//             Modal.openModal('Produto adicionado na sacola!');
//         } else {
//             const errorData = await response.json();
//             console.error('Erro na resposta:', errorData.message);
//             Modal.openModal('Faça login para iniciar suas compras!');
//         }
//     } catch (error) {
//         console.error('Erro ao adicionar produto à sacola:', error);
//     }
// }

// const toggleFavorito = async (produtoId) => {
//     const token = localStorage.getItem('authToken');
//     try {
//         const response = await fetch(`/favoritos/${produtoId}`, {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             }
//         });

//         if (!response.ok) {
//             throw new Error('Erro ao alternar favorito');
//         }

//         const data = await response.json();
//         await showFavoritos();
//         console.log(data);
//     } catch (error) {
//         console.error('Erro ao alternar favorito:', error);
//     }
// }