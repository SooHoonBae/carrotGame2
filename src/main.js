'use strict'

import PopUp from './popup.js';
import Field from './field.js';
import * as sound from './sound.js';

const CARROT_COUNT=10;
const BUG_COUNT=7;
const GAME_DURATION_SEC=10;


const gameBtn=document.querySelector('.game__button');
const gameTimer=document.querySelector('.game__timer');
const gameScore=document.querySelector('.game__score');

let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
const gameField = new Field(CARROT_COUNT,BUG_COUNT);

gameField.setClickListener(onItemClick)

function onItemClick(item) {
    if(!started) {
        return;
    }
    if(item ==='carrot'){
        score++;
        updateScoreBoard();
        if(score === CARROT_COUNT){
            finishGame(true);
        };
    }else if(item ==='bug'){
        finishGame(false);
    };
};

gameBtn.addEventListener('click',()=>{
    if(started) {
        stopGame();
    }else{
        startGame();
    }
});
gameFinishBanner.setClickListener(()=>{
    startGame()
})
function startGame() {
    started=true;
    initGame();    
    showStopButton();
    showTimerandScore();
    startGameTimer();
    sound.playBackground();
}

function stopGame() {
    started=false;
    stopGameTimer();
    hideGameButton();
    gameFinishBanner.showWithText('replay?');
    sound.stopBackground();
    sound.playAlert();
}
function showStopButton() {
    const icon = gameBtn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    gameBtn.style.visibility='visible';
};
function hideGameButton() {
    gameBtn.style.visibility='hidden';
}
function showTimerandScore() {
    gameTimer.style.visibility='visible';
    gameScore.style.visibility='visible';
}
function startGameTimer() {
    let timeleft=GAME_DURATION_SEC;
    updateTimerText(timeleft);
    timer=setInterval(()=> {
        if(timeleft<=0){
            finishGame(score===CARROT_COUNT);
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

function initGame(){
    score=0;
    gameScore.innerText=CARROT_COUNT;
    gameField.init();
};

function finishGame(win) {
    started=false;
    stopGameTimer();
    hideGameButton();
    if (win){
        sound.playWin();
    }else{
        sound.playBug();
    }
    sound.stopBackground();
    gameFinishBanner.showWithText(win? 'You win❤' : 'You Lost💥');
}
function updateScoreBoard() {
    gameScore.innerText= CARROT_COUNT-score;
}