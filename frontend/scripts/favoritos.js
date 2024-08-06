import Modal from "./modal.js";
import { showProdutos } from "./produtosDB.js";
const secao = document.querySelector('#home');


const response = await fetch('/env');
const env = await response.json();
const apiURL = env.apiURL;

export const favoritosPage = async(req, res) =>{
    const token = localStorage.getItem('authToken');
    try {
        const response = await fetch(`${apiURL}/favoritos`,{
            method:'GET',
            headers:{
                'Authorization':`Bearer ${token}`,
                'content-type':'application/json'
            } 
        });
            if(response.ok){
                const html = await response.text();
                const busca = document.querySelector('.busca');
                if(busca){
                    busca.remove();
                }
                secao.innerHTML = html;
                const favoritos = await getFavoritos();
                const favoritosContainer = document.querySelector('.favoritos__itens');

                showProdutos(favoritos, favoritosContainer, favoritosContainer, favoritos);
            }else{
                const errorMessage = await response.json()
                if(errorMessage.message == 'Autorização negada: token inválido!'){
                    Modal.openModal('Faça Login para acessar sua sacola!');
                }else{
                    console.log(errorMessage.message)
                }
            }      
    } catch (error) {
        console.log('Erro ao carregar a página dos favoritos:', error);
    }
}

export const getFavoritos = async () =>{
    const token = localStorage.getItem('authToken');
    if(token){
        try {
            const response = await fetch(`${apiURL}/favoritos/produtos`,{
                method:'GET',
                headers:{
                    'Authorization':`Bearer ${token}`,
                    'content-type':'application/json'
                } 
            });

            const data = await response.json()
            const favoritos = data.favoritos;
            return favoritos;
    
        } catch (error) {
            console.log('Erro ao buscar os favoritos do usuário:', error)
        }
    }else{
        return 'Token não encontrado.'
    }
}

