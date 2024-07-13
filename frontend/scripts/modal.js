


function openModal(modalText, redirect){
    const modalContainer = document.querySelector('.modal__sacola__container');
    const modal = document.querySelector('.modal__sacola p');
    const botaoModalClose = document.querySelector('.modalBtn__sacola__close')
    
    modalContainer.classList.add('modal__sacola__show');
    modal.textContent = modalText;

    if(redirect){
        botaoModalClose.addEventListener('click', (e)=> redirecionar(redirect));
        modalContainer.addEventListener('click',(e)=>redirecionar(redirect));
    }else{
        botaoModalClose.addEventListener('click', closeModal);
        modalContainer.addEventListener('click', closeModal);
    }
}

function redirecionar(redirect) {
    window.location.href = redirect
}

function closeModal(){
    const modalContainer = document.querySelector('.modal__sacola__container');
    modalContainer.classList.remove('modal__sacola__show');
}

const Modal = {openModal};
export default Modal;



