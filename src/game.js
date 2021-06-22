'use strict'

export default class Button {
    constructor() {
        this.gameBtn=document.querySelector('.game__button');
        this.gameBtn.addEventListener('click', ()=>{
            this.onClick && this.onClick()
            })
    }
    
    setClickListener(onClick) {
        this.onClick=onClick;
    }

    showStop() {
        const icon = this.gameBtn.querySelector('.fas');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.gameBtn.style.visibility='visible';
    }

    hide() {
        this.gameBtn.style.visibility='hidden';
    }
}