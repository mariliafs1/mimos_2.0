

const carrossel = document.querySelector('.carrossel__container');
const setasBtn = document.querySelectorAll('.carrossel__seta');
const primeiraImg_carrossel = document.querySelectorAll('.carrossel_img')[0];


const carrossel2 = document.querySelector('#carrossel__ultimos__lancamentos');
const setasCarrossel2 = document.querySelectorAll('.ultimos__lancamentos__carrossel__seta');


const carrossel3 = document.querySelector('#carrossel__promo');
const setasCarrossel3 = document.querySelectorAll('.promo__carrossel__seta');
const primeiraImg3 =  carrossel3.querySelectorAll('.produto')[0];  
let primeiraImg2 =  carrossel2.querySelectorAll('.produto')[0];

let isArrastoStart = false, prevPageX, prevScrollLeft,  positionDiff2;
// let prevPageX2, prevScrollLeft2;


const mostrarSeta = (carrosselVar, setasBtnVar) =>{
    let scrollWidth = carrosselVar.scrollWidth - carrosselVar.clientWidth;
    carrosselVar.scrollLeft == 0 ? setasBtnVar[0].classList.add("seta__hide") : setasBtnVar[0].classList.remove("seta__hide");
    carrosselVar.scrollLeft >= (scrollWidth - 1) ? setasBtnVar[1].classList.add("seta__hide") : setasBtnVar[1].classList.remove("seta__hide");
}

const arrastoSeta = (carrosselVar, setasBtnVar, primeiraImg, diff) =>{
    setasBtnVar.forEach(seta =>{
        seta.addEventListener("click", ()=>{
            let primeiraImgWidth = 200 + diff;
            // let primeiraImgWidth = primeiraImg.clientWidth + diff;
            carrosselVar.classList.add("arrasto__seta");
            carrosselVar.scrollLeft += seta.classList.contains('left') ? -primeiraImgWidth : +primeiraImgWidth;
            setTimeout(()=> mostrarSeta(carrosselVar, setasBtnVar), 60);
        });
    });
}



arrastoSeta(carrossel, setasBtn, primeiraImg_carrossel, 15);

arrastoSeta(carrossel2, setasCarrossel2, primeiraImg2, 15);

arrastoSeta(carrossel3, setasCarrossel3, primeiraImg3, 15);




const autoSlide = (carrosselVar)=>{
    let primeiraImg2 =  document.querySelector('.primeiraImg2');

    if(carrosselVar.scrollLeft == (carrosselVar.scrollWidth - carrosselVar.clientWidth)) return;
    if(carrosselVar.scrollLeft == (0)) return;
    
    positionDiff2 = Math.abs(positionDiff2);
    let primeiraImg2Width = 240 +15;
    // let primeiraImg2Width = primeiraImg2.clientWidth +15;
    let valDifference = primeiraImg2Width - positionDiff2;
    if(carrosselVar.scrollLeft > prevScrollLeft ){
        return carrosselVar.scrollLeft += positionDiff2 > primeiraImg2Width/3 ? valDifference : -positionDiff2;

    }
    carrosselVar.scrollLeft -= positionDiff2 > primeiraImg2Width/3 ? valDifference : -positionDiff2;
}

const arrastoStart = (e) =>{  //NAO TEM PQ MECHER AQUI ~~~~~~~~~~~~~~~~~~~~~~
    isArrastoStart = true;
    let elementoCarrossel = e.target.parentElement;
    
  
    if(elementoCarrossel.classList.contains('carrossel__container')){
        prevPageX = e.pageX || e.touches[0].pageX;
        prevScrollLeft = elementoCarrossel.scrollLeft;
    }else if(elementoCarrossel.parentElement.parentElement.classList.contains('carrossel2__container')){
        let elementoCarrossel2 = elementoCarrossel.parentElement.parentElement;
        prevPageX = e.pageX || e.touches[0].pageX;
        prevScrollLeft = elementoCarrossel2.scrollLeft;

    }   
}


const arrasto = (e) => {
    if(!isArrastoStart) return;
    e.preventDefault();


    let elementoCarrossel = e.target.parentElement;
    
    if(elementoCarrossel.classList.contains('carrossel__container')){
        
        elementoCarrossel.classList.remove("arrasto__seta");
        elementoCarrossel.classList.add("arrasto__cursor");
        let positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
        elementoCarrossel.scrollLeft = prevScrollLeft - positionDiff;
        mostrarSeta(e.target.parentElement, setasBtn);

    }else if(elementoCarrossel.parentElement.parentElement.classList.contains('carrossel2__container')){

        let elementoCarrossel2 = elementoCarrossel.parentElement.parentElement;

        elementoCarrossel2.classList.remove("arrasto__seta");
        elementoCarrossel2.classList.add("arrasto__cursor");
        positionDiff2 = (e.pageX || e.touches[0].pageX) - prevPageX;
        elementoCarrossel2.scrollLeft = prevScrollLeft - positionDiff2;
        if(elementoCarrossel2.classList.contains('carrossel3')){
            mostrarSeta(elementoCarrossel2, setasCarrossel3);
        }else{
            mostrarSeta(elementoCarrossel2, setasCarrossel2);
        }
    }
}

const arrastoStop = (e) =>{
    isArrastoStart = false;
    let elementoCarrossel = e.target.parentElement;
    if(elementoCarrossel.classList.contains('carrossel__container')){
        elementoCarrossel.classList.remove("arrasto__seta");
        elementoCarrossel.classList.remove("arrasto__cursor");
    }else if(elementoCarrossel.parentElement.parentElement.classList.contains('carrossel2__container')){
        let elementoCarrossel2 = elementoCarrossel.parentElement.parentElement;
        elementoCarrossel2.classList.remove("arrasto__seta");
        elementoCarrossel2.classList.remove("arrasto__cursor");
        if(window.innerWidth<=550){
            autoSlide(elementoCarrossel2);
        }
    }
}

const scrollWheel = (e) =>{
    e.preventDefault();
    let elementoCarrossel = e.target.parentElement;
    if(elementoCarrossel.classList.contains('carrossel__container')){
        elementoCarrossel.classList.remove("arrasto__seta");
        elementoCarrossel.scrollLeft += e.deltaY;
        mostrarSeta(elementoCarrossel, setasBtn);
    }else if(elementoCarrossel.parentElement.parentElement.classList.contains('carrossel2__container')){
        let elementoCarrossel2 = elementoCarrossel.parentElement.parentElement;
        elementoCarrossel2.classList.remove("arrasto__seta");
        elementoCarrossel2.scrollLeft += e.deltaY;;
        if(elementoCarrossel2.classList.contains('carrossel3')){
            mostrarSeta(elementoCarrossel2, setasCarrossel3);
        }else{
            mostrarSeta(elementoCarrossel2, setasCarrossel2);
        }
    }
}

const carrosselArray = [carrossel, carrossel2, carrossel3];

const eventos = [
    ["mousedown", "touchstart"],
    ["mousemove", "touchmove"],
    ["mouseup", "touchend"],
    ["wheel"]
];

const funcoes = [
    arrastoStart,
    arrasto,
    arrastoStop,
    scrollWheel
];

createListenerCarrossel(carrosselArray, eventos, funcoes);

function createListenerCarrossel(carrosselArray, eventos, funcoes) {
    carrosselArray.forEach((carrossel, index) => {
        eventos.forEach((evento, i) => {
            // Verifica se há uma função correspondente para este evento
            if (funcoes[i]) {
                evento.forEach((eventoTipo) => {
                    carrossel.addEventListener(eventoTipo, funcoes[i]);
                });
            }
        });
    });
}



// carrossel.addEventListener("mousedown", arrastoStart);
// carrossel.addEventListener("touchstart", arrastoStart);

// carrossel.addEventListener("mousemove", arrasto);
// carrossel.addEventListener("touchmove", arrasto);

// carrossel.addEventListener("mouseup", arrastoStop);
// carrossel.addEventListener("touchend", arrastoStop);

// carrossel.addEventListener("wheel", scrollWheel);

// carrossel2.addEventListener("mousedown", arrastoStart);
// carrossel2.addEventListener("touchstart", arrastoStart);

// carrossel2.addEventListener("mousemove", arrasto);
// carrossel2.addEventListener("touchmove", arrasto);

// carrossel2.addEventListener("mouseup", arrastoStop);
// carrossel2.addEventListener("touchend", arrastoStop);

// carrossel2.addEventListener("wheel", scrollWheel);

// carrossel3.addEventListener("mousedown", arrastoStart);
// carrossel3.addEventListener("touchstart", arrastoStart);

// carrossel3.addEventListener("mousemove", arrasto);
// carrossel3.addEventListener("touchmove", arrasto);

// carrossel3.addEventListener("mouseup", arrastoStop);
// carrossel3.addEventListener("touchend", arrastoStop);

// carrossel3.addEventListener("wheel", scrollWheel);

