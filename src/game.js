'use strict'

import Field from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
    win : 'win',
    lose : 'lose',
    cancel : 'cancel'
}) 

//Builder Pattern
export class GameBuilder {
    withCarrotCount(num) {
        this.carrotCount=num;
        return this;
    }

    withBugCount(num) {
        this.bugCount=num;
        return this;
    }

    withGameDuration(duration) {
        this.gameDuration=duration;
        return this;
    }

    build() {
        console.log(this);
        return new Game(
            this.carrotCount,//
            this.bugCount,
            this.gameDuration
        );
    }
}

class Game {
    constructor(carrotCount,bugCount,gameDuration) {
        this.carrotCount=carrotCount;
        this.bugCount=bugCount;
        this.gameDuration=gameDuration;
        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');
        
        this.started = false;
        this.score = 0;
        this.timer = undefined;

        this.gameBtn = document.querySelector('.game__button');
        this.gameBtn.addEventListener('click', ()=>{
            if(this.started) {
                this.stop(Reason.cancel);
            }else{
                this.start();
            }
        })

        this.gameField = new Field(carrotCount,bugCount);
        this.gameField.setClickListener(this.onItemClick)    
    }

    setGameStopListener(onGameStop) {
        this.onGameStop = onGameStop;
    }
    start() {
        this.started=true;
        this.startGameTimer();
        this.initGame();    
        this.showStopButton();
        this.showTimerAndScore();
        sound.playBackground();
    }
    
    stop(reason) {
        this.started=false;
        this.stopGameTimer();
        this.hideGameButton();
        sound.stopBackground();
        
        this.onGameStop && this.onGameStop(reason);
        
    }

    onItemClick = (item)=> {
        if(!this.started) {
            return;
        }
        if(item ==='carrot'){
            this.score++;
            this.updateScoreBoard();
            if(this.score === this.carrotCount){
                this.stop(Reason.win);
            };
        }else if(item ==='bug'){
            this.stop(Reason.lose);
        };
    };

    showStopButton() {
        const icon = this.gameBtn.querySelector('.fas');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.gameBtn.style.visibility='visible';
    }

    hideGameButton() {
        this.gameBtn.style.visibility='hidden';
    }

    showTimerAndScore() {
        this.gameTimer.style.visibility='visible';
        this.gameScore.style.visibility='visible';
    }

    startGameTimer() {
        let timeleft=this.gameDuration;
        this.updateTimerText(timeleft);
        this.timer=setInterval(()=> {
            if(timeleft<=0){
                clearInterval(this.timer);
                this.stop(this.score===this.carrotCount ? Reason.win : Reason.lose);
                return;
            }else{
                this.updateTimerText(--timeleft);
            }
        }, 1000);    
    };

    stopGameTimer() {
        clearInterval(this.timer);
    }

    updateTimerText(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        this.gameTimer.innerText = `${minutes}:${seconds}`
    }
    
    initGame(){
        this.score=0;
        this.gameScore.innerText= this.carrotCount;
        this.gameField.init();
    }

    updateScoreBoard() {
        this.gameScore.innerText = this.carrotCount-this.score;
    }
}