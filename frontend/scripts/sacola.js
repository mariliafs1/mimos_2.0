const secao = document.querySelector('#home');

export const sacolaAutorizada = async(req, res) =>{
    const token = localStorage.getItem('authToken');
    try {
        const response = await fetch('http://localhost:3000/sacola',{
            method:'get',
            headers:{
                'Authorization': `Bearer ${token}`,
                'content-type':'application/json'
            }
        });
            
            if(response.ok){
                const html = await response.text();
                secao.innerHTML = html;

            }else{
                const errorMessage = await response.json()
                console.error('Erro:', errorMessage.message);
                return errorMessage.message;
            }

    } catch (error) {
        console.log(error)
    }
}

// export const listarProdutosSacola = async () =>{

// }