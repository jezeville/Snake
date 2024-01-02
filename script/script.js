let creationPixel = () => {
    let conteneur = document.getElementById('conteneur');
    for (let i = 0; i < 625; i++) {
        let pixel = document.createElement('div');
        pixel.id = i;
        pixel.className = "pixel";
        conteneur.append(pixel);
        if (i == 287) {
            pixel.classList.add('head');
        }
    }
}
creationPixel();


//Gestion de la queu
let Totalpoint = 0;
let tabPosition = [];
let time = 0;

let Tail = () =>{
    time = Totalpoint * 170;
    return time;
}

let followingTail = (position) =>{
    
    if(Totalpoint != 0){
        let pastHead = position[0].head;
        let object = {pastHead};
        position.push(object);
        pastHead.classList.add('colored');

    }
    if(position.length != 1){
       let time = Tail(); 
        setTimeout(() => { 
            position[1].pastHead.classList.remove('colored');
    } , time );
}
}

// Apparition des points

    let hasard = Math.floor(Math.random()*625);
    let point = document.getElementById(hasard);
    point.classList.add('point');
    
let apparitionPoint = (head , positionHead) =>{
    followingTail(positionHead);

    if(head.id === point.id){
        point.classList.remove('point');
        Totalpoint++;
        hasard = Math.floor(Math.random()*625);
        point = document.getElementById(hasard);
        point.classList.add('point');
    }
}


// déplacement 
let changementHead = (head, suivant) => {
    tabPosition = [];
    head.classList.remove('head');
    suivant.classList.add('head');
    let tailError = document.querySelectorAll('.colored');
        for(let elem of tailError){
            if(suivant.id === elem.id){
                alert('error');
            }
    }
    let id = 1;
    let object = {id ,  head , suivant};
    tabPosition.push(object);
    return tabPosition;
}
let moveRightInterval;
let moveLeftInterval;
let moveTopInterval;
let moveBottomInterval;


let direction = (e) => {
    //droite
    if (e.key === "ArrowRight" && !moveRightInterval) {
        moveRightInterval = setInterval(() => {
            let head = document.querySelector('.head');
            let suivant = head.nextElementSibling;
            if (parseInt(head.id)+1%25 === 0){
                let oppositeBordure = parseInt(head.id) - 24;
                suivant = document.getElementById(oppositeBordure);
            }
            let positionHead = changementHead(head, suivant);
            apparitionPoint(head, positionHead);
        }, 170);
    } else if (e.key !== "ArrowRight" && moveRightInterval) {
        clearInterval(moveRightInterval);
        moveRightInterval = null;
    }
    //gauche
    if (e.key === "ArrowLeft" && !moveLeftInterval) {
        moveLeftInterval = setInterval(() => {
            let head = document.querySelector('.head');
            let suivant = head.previousElementSibling;
            if (parseInt(head.id)%25 === 0){
                let oppositeBordure = 24 + parseInt(head.id);
                suivant = document.getElementById(oppositeBordure);
            }
            let positionHead = changementHead( head, suivant);
            apparitionPoint(head , positionHead);
        }, 170);
    } else if (e.key !== "ArrowLeft" && moveLeftInterval) {
        clearInterval(moveLeftInterval);
        moveLeftInterval = null;
    }
    //top
    if (e.key === "ArrowUp" && !moveTopInterval) {
        moveTopInterval = setInterval(() => {
            let head = document.querySelector('.head');
            let suivant = document.getElementById(parseInt(head.id) - 25);
            if (parseInt(head.id)<=24){
                let oppositeBordure = 600 + parseInt(head.id);
                suivant = document.getElementById(oppositeBordure);
            }
            let positionHead = changementHead( head, suivant);
            apparitionPoint(head , positionHead);
        }, 170);
    } else if (e.key !== "ArrowUp" && moveTopInterval) {
        clearInterval(moveTopInterval);
        moveTopInterval = null;
    }
    //bottom
    if (e.key === "ArrowDown" && !moveBottomInterval) {
        moveBottomInterval = setInterval(() => {
            let head = document.querySelector('.head');
            let suivant = document.getElementById(parseInt(head.id) + 25);
            if (parseInt(head.id)>=600){
                let oppositeBordure = parseInt(head.id)-600;
                suivant = document.getElementById(oppositeBordure);
            }
            let positionHead = changementHead( head, suivant);
            apparitionPoint(head , positionHead);
        }, 170);
    } else if (e.key !== "ArrowDown" && moveBottomInterval) {
        clearInterval(moveBottomInterval);
        moveBottomInterval = null;
    }        
}

document.addEventListener("keyup", direction);


