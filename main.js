'use strict'

const CARROT_SIZE= 80;
const CARROT_COUNT=10;
const BUG_COUNT=7;
const GAME_DURATION_SEC=10;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn=document.querySelector('.game__button');
const gameTimer=document.querySelector('.game__timer');
const gameScore=document.querySelector('.game__score');
const popUp=document.querySelector('.pop-up');
const popUpRefresh=document.querySelector('.pop-up__refresh');
const popUpMessage=document.querySelector('.pop-up__message');

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click',()=>{
    if(started) {
        stopGame();
    }else{
        startGame();
    }
    started=!started;
});

function startGame() {
    initGame();    
    showStopButton();
    showTimerandScore();
    startGameTimer();
}

function stopGame() {
    stopGameTimer();
    hideGameButton();
    showPopUp('replay?');
}
function showStopButton() {
    const icon = gameBtn.querySelector('.fa-play');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
};
function showTimerandScore() {
    gameTimer.style.visibility='visible';
    gameScore.style.visibility='visible';
}
function startGameTimer() {
    let timeleft=GAME_DURATION_SEC;
    updateTimerText(timeleft);
    timer=setInterval(()=> {
        if(timeleft<=0){
            clearInterval(timer);
            return;
        }else{
            updateTimerText(--timeleft);
        }
    }, 1000);    
};
function updateTimerText(time) {
    let minute = Math.floor(time/60);
    let second = time%60;
    gameTimer.innerText=`${minute}:${second}`;
}
function stopGameTimer() {
    clearInterval(timer);
}
function hideGameButton() {
    gameBtn.style.visibility='hidden';
}
function showPopUp(text) {
    popUp.classList.remove('pop-up--hide');
    popUpMessage.innerText=text;
}

function initGame(){
    field.innerHTML='';
    gameScore.innerText=CARROT_COUNT;
    addItem('carrot',CARROT_COUNT,'img/carrot.png');
    addItem('bug',BUG_COUNT,'img/bug.png');
};

function addItem(className,count,imgPath){
    const minX=0;
    const minY=0;
    const maxX=fieldRect.width-CARROT_SIZE;
    const maxY=fieldRect.height-CARROT_SIZE;

    for(let i=0;i<count;i++){
        const item= document.createElement('img');
        item.setAttribute('class',className);
        item.setAttribute('src',imgPath);
        const x = randomNumber(minX,maxX);
        const y = randomNumber(minY,maxY);
        item.style.position='absolute';
        item.style.left=`${x}px`;
        item.style.top=`${y}px`;
        field.appendChild(item);
    }
}
function randomNumber(min,max){
    return Math.random()*(max-min)+min;
}

field.addEventListener('click',onFieldClick)
function onFieldClick(event) {
    if(!started) {
        return;
    }
    const target=event.target;
    if(target.matches('.carrot')){
        event.target.remove();
        score++;
        updateScoreBoard();
        if(score===CARROT_COUNT){
            finishGame(true);
        }
    }else if(target.matches('.bug')){
        stopGameTimer();
        finishGame(false);
    }

}
function finishGame(win) {
    
}
function updateScoreBoard() {
    gameScore.innerText= CARROT_COUNT-score;
}

function removeCarrot() {
    console.log(carrot);
    field.removeChild(carrot);
}