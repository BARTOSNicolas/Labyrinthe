//VARIABLES
let goodWay = [];
let isPlaying = false;
let laby;
let player
let caseUnderPlayer;
let time = 60; //60
let countdown
const btnValid = document.querySelector("#valid");
const btnResolve = document.querySelector("#resolve");
const btnPlay = document.querySelector("#play");
const btnNext = document.querySelector("#nextLevel");
const showLaby = document.querySelector("#showLaby");
const modalWin = new bootstrap.Modal(document.getElementById('modalWin'), {})
const modal = document.getElementById('modalWin');
const timer = document.getElementById('timer');
const cheat = document.getElementById('cheat');
let textPlay = document.getElementById('textPlay');

//Select Option
const selectCase = document.querySelector("#selectCase");
const selectEx = document.querySelector("#selectEx");

//Rempli les select HTML
function showSelect() {
    for (let i = 3; i <= 25; i++) {
        const option = document.createElement('option');
        option.setAttribute("value", i);
        option.innerText = i + " x " + i;
        selectCase.append(option);
    }
    for(let i = 0; i <= 2; i++){
        const option = document.createElement('option');
        option.setAttribute("value", i);
        option.innerText = " exemple " + i;
        selectEx.append(option);
    }
}
showSelect()

//Créer un labyrinthe
function createLaby(caseValue, exValue){
    showLaby.innerHTML = "";
    laby = new Labyrinthe(data, caseValue, exValue);
    laby.createLab();
}

//BTN SELECT
btnValid.addEventListener('click', ()=>{
    clearInterval(countdown);
    textPlay.innerHTML = "Press play button to play";
    let caseValue = selectCase.value;
    let exValue = selectEx.value;
    if(caseValue && exValue){
        btnResolve.setAttribute("disabled", true);
        btnPlay.removeAttribute("disabled");
    }
    createLaby(caseValue, exValue);
    timerResolve()
})

//BTN RESOLVE
btnResolve.addEventListener('click', ()=> {
    btnResolve.setAttribute("disabled", true);
    goodWay = [];
    resolve(laby.tab[0][0]);
})

//BTN PLAY
btnPlay.addEventListener('click', ()=>{
    isPlaying = true;
    play()
    textPlay.innerHTML = "Play with the arrows on the keyboard";
})

//BTN NEXTLEVEL
btnNext.addEventListener('click', ()=>{
    clearInterval(countdown);
    btnResolve.setAttribute("disabled", true);
    btnPlay.removeAttribute("disabled");
    textPlay.innerHTML = "Press play button to play";
    let caseValue = parseInt(selectCase.value) + 1
    let exValue = selectEx.value;
    selectCase.value = caseValue;
    createLaby(caseValue, exValue);
    timerResolve()
    modalWin.hide();
})

//BTN CHEAT
cheat.addEventListener('click', () => {
    if(laby){
        console.log("Tricheur !!!")
        clearInterval(countdown);
        btnResolve.removeAttribute('disabled')
    }
})

//Disable Next si Selectcase > 25
modal.addEventListener('show.bs.modal', ()=>{
    if(selectCase.value == 25){
        btnNext.setAttribute('disabled', true)
    }
})

//RESOLUTION DU LABY
function resolve(position) {
    position.checkNeighbours(laby.tab);
    //Ajoute le parent sauf sur start
    if (!position.start) {
        for (let neighbour of position.neighbours) {
            if (neighbour.visited) {
                position.parent = neighbour;
            }
        }
    }
    position.setVisited();
    // Si c'est la fin on remonte le chemin
    if (position.end) {
        goodWay.unshift(position);
        checkParent(position);
        for (let i = 0; i < goodWay.length; i++) {
            setTimeout(() => {
                if(goodWay[i].start){
                    goodWay[i].setBGColor('#e3e39c');
                }else if(goodWay[i].end){
                    goodWay[i].setBGColor('#ff8c80');
                }else {
                    goodWay[i].setBGColor('#BBB2D9');
                }
            }, 50 * i)
        }

    // Recursivité sur chaque voisins
    } else {
        for (let neighbour of position.neighbours) {
            if (!neighbour.visited) {
                position = laby.tab[neighbour.posX][neighbour.posY];
                resolve(position);
            }
        }
    }
    return position;
}

//Retrouve le chemin via les parents
function checkParent(position) {
    if (position.parent !== undefined) {
        goodWay.unshift(position.parent);
        checkParent(position.parent);
    }
}

//JOUER AU LABY
function play(){
    player = new Player();
    player.createPlayer();
    caseUnderPlayer = setMur(laby.tab);
    btnPlay.setAttribute("disabled", true)
}
//Ecoute les entrées clavier
window.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (isPlaying) {
        move(caseUnderPlayer, event)
    }
    if(isPlaying && caseUnderPlayer.end){
        isPlaying = false;
        setTimeout(()=>{
            modalWin.show();
        }, 500)

    }
});
//Assignation des commandes flèches
function move(item, event){
    if (event.keyCode === 37 && !item.wallLeft) {
        player.movePlayer(-1, 0);
        caseUnderPlayer = setMur(laby.tab);
    }
    if (event.keyCode === 38 && !item.wallUp) {
        player.movePlayer(0, -1);
        caseUnderPlayer = setMur(laby.tab);
    }
    if (event.keyCode === 39 && !item.wallRight) {
        player.movePlayer(1, 0);
        caseUnderPlayer = setMur(laby.tab);
    }
    if (event.keyCode === 40 && !item.wallDown) {
        player.movePlayer(0, 1);
        caseUnderPlayer = setMur(laby.tab);
    }
}
//Vérifie la case sous le joueur
function setMur(tab){
    let nextCase = tab[player.posY][player.posX];
    if(nextCase.start){
        nextCase.setBGColor('#F5F5DC');
    }else if (nextCase.end){
        nextCase.setBGColor('#FFE4E1');
    }else {
        nextCase.setBGColor('#d8f3ea');
    }
    return nextCase;
}

// Timer
function timerResolve(){
    time = 60;
    countdown = setInterval(()=>{
        if(time < 0){
            clearInterval(countdown);
            btnResolve.removeAttribute('disabled');
        }else{
            timer.innerHTML = time + "s";
            time--;
        }
    }, 1000);

}

