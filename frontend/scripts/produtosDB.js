import Modal from "./modal.js";
import { getFavoritos } from "./favoritos.js";

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/env");
  const env = await response.json();
  const apiURL = env.apiURL;

  let carrosselUltimosLancamentos = document.querySelector(
    "#carrossel__ultimos__lancamentos"
  );
  let carrosselPromo = document.querySelector("#carrossel__promo");

  await getAndShowProdutos(apiURL, carrosselUltimosLancamentos, carrosselPromo);
});

async function getAndShowProdutos(
  apiURL,
  carrosselUltimosLancamentos,
  carrosselPromo
) {
  try {
    const response = await fetch(`${apiURL}/produtos`);
    const produtos = await response.json();
    const favoritos = await getFavoritos();
    const numeroDeFavoritos = document.querySelector(
      ".numero__produtos__favoritos"
    );
    if (favoritos != "Token não encontrado.") {
      numeroDeFavoritos.innerHTML = parseInt(favoritos.length);
    }

    showProdutos(
      produtos,
      carrosselUltimosLancamentos,
      carrosselPromo,
      favoritos
    );
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  }
}

export const adicionaProdutoSacola = async (btnId) => {
  const token = localStorage.getItem("authToken");
  try {
    const response = await fetch(`/sacola/${btnId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
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
  carrosselPromo,
  favoritos
) => {
  carrosselUltimosLancamentos.innerHTML = ""; //produto__nome__favoritar__desativado na img
  carrosselPromo.innerHTML = "";
  let container = "";
  produtos.forEach((produto) => {
    let produtoFavoritado;
    if (favoritos != "Token não encontrado.") {
      produtoFavoritado = favoritos.find(
        (favorito) => favorito._id == produto._id
      );
    }
    container = `<div class="produto">
                <div class="produto__img__container"><img src=${
                  produto.imagem
                } alt="" class="produto__img"></div>
                <div class="produto__infos">
                    <div class="produto__nome__favoritar">
                        <p>${produto.nome}</p>
                        <div class="produto__favoritar" ><img class=${
                          produtoFavoritado
                            ? "reparaBug"
                            : "produto__nome__favoritar__desativado"
                        } 
                        id=${produto._id} 
                        src="../img/coracao.png" alt=""></div>  
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
  let favoritosBtn = document.querySelectorAll(".produto__favoritar img");
  favoritosBtn.forEach((btn) => {
    btn.addEventListener("click", () => toggleFavorito(btn.id));
  });

  produtosBtn.forEach((btn) => {
    btn.addEventListener("click", () => adicionaProdutoSacola(btn.id));
  });
};

export const toggleFavorito = async (produtoId) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    try {
      const response = await fetch(`/favoritos/${produtoId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      const escapedProdutoId = CSS.escape(produtoId);
      const coracaoIcons = document.querySelectorAll(
        `.produto__favoritar img#${escapedProdutoId}`
      );

      const numeroDeFavoritos = document.querySelector(
        ".numero__produtos__favoritos"
      );

      if (data.message == "Produto removido dos favoritos!") {
        coracaoIcons.forEach(
          (coracaoIcon) => (coracaoIcon.style.opacity = "0.5")
        );
        numeroDeFavoritos.innerHTML = parseInt(numeroDeFavoritos.innerHTML) - 1;
      } else if (data.message == "Produto adicionado aos favoritos!") {
        coracaoIcons.forEach(
          (coracaoIcon) => (coracaoIcon.style.opacity = "1")
        );
        numeroDeFavoritos.innerHTML = parseInt(numeroDeFavoritos.innerHTML) + 1;
      }

      Modal.openModal(data.message);
    } catch (error) {
      console.log(error);
    }
  } else {
    Modal.openModal("Faça login para poder favoritar seus produtos!");
  }
};
