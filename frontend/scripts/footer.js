
const footerMenu = document.querySelectorAll('.footer__menu');

const handdleMenuList = () =>{
    const setas_up = document.querySelectorAll('.seta_up');
    const listas_menu = document.querySelectorAll('.footer ul');
    setas_up.forEach(seta => seta.classList.add('hide')); 
    listas_menu.forEach(lista => lista.classList.add('hide'));
}

const toggleHide = (element) =>{    
    if(!element.classList.contains('hide')){
        element.classList.add('hide');
    }else{
        element.classList.remove('hide');
    }
}

const toggleMenu = (menu) =>{

    for(let i=0; i<menu.parentElement.children.length; i++){
        if(menu.parentElement.children[i].tagName==='UL'){
            toggleHide(menu.parentElement.children[i])
        }
    }

    for(let i=0; i<menu.children.length; i++){
        if(menu.children[i].classList.contains('seta_down')){
            toggleHide(menu.children[i]);
        }
        if(menu.children[i].classList.contains('seta_up')){
            toggleHide(menu.children[i]);
        }
    }
   
}


footerMenu.forEach(menu => { 
    const setaUp = document.createElement('img');
    setaUp.classList.add('seta_up');
    setaUp.src = './img/arrow_up.svg';
    menu.appendChild(setaUp)
});

footerMenu.forEach(menu =>{ 
    const setaDown = document.createElement('img');
    setaDown.classList.add('seta_down');
    setaDown.src = './img/arrow_down.svg';
    menu.appendChild(setaDown);
});

footerMenu.forEach(menu => menu.addEventListener('click', () => toggleMenu(menu)));

handdleMenuList();


