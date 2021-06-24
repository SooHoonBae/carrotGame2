'use strict'

const CARROT_SIZE= 80;
import * as sound from './sound.js';

export const ItemType = Object.freeze({
    carrot : 'carrot',
    bug : 'bug'
})
export class Field {
    constructor(carrotCount,bugCount) {
        this.carrotCount=carrotCount;
        this.bugCount=bugCount;
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        this.field.addEventListener('click',this.onClick);
    }

    setClickListener(onItemClick) {
        this.onItemClick=onItemClick;
    }
    
    onClick = event => {
        const target=event.target;
        if(target.matches('.carrot')){
            target.remove();
            sound.playCarrot();
            this.onItemClick && this.onItemClick(ItemType.carrot);
        }else if(target.matches('.bug')){
            this.onItemClick && this.onItemClick(ItemType.bug);
        };
    }
    init() {
        this.field.innerHTML='';
        this._addItem(ItemType.carrot,this.carrotCount,'img/carrot.png');
        this._addItem(ItemType.bug,this.bugCount,'img/bug.png');
    }

    _addItem(className,count,imgPath){
        const minX=0;
        const minY=0;
        const maxX=this.fieldRect.width-CARROT_SIZE;
        const maxY=this.fieldRect.height-CARROT_SIZE;
    
        for(let i=0;i<count;i++){
            const item= document.createElement('img');
            item.setAttribute('class',className);
            item.setAttribute('src',imgPath);
            const x = randomNumber(minX,maxX);
            const y = randomNumber(minY,maxY);
            item.style.position='absolute';
            item.style.left=`${x}px`;
            item.style.top=`${y}px`;
            this.field.appendChild(item);
        }
    }
}

function randomNumber(min,max){
    return Math.random()*(max-min)+min;
}