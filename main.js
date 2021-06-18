'use strict'

const CARROT_SIZE= 80;
const CARROT_COUNT=10;
const BUG_COUNT=7;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn=document.querySelector('.game__button');
const gameTimer=document.querySelector('.game__timer');
const gameScore=document.querySelector('.game__score');

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


function countDown() {
        let timeleft=10;
        setInterval(() => {
        gameTimer.textContent=`0:${timeleft}`;
        timeleft--;
    }, 1000);
};


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
