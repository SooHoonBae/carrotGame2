'use strict'

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const carrotSize= 80;

function initGame(){
    addItem('carrot',10,'img/carrot.png');
    addItem('bug',7,'img/bug.png');
};

function addItem(className,count,imgPath){
    const minX=0;
    const minY=0;
    const maxX=fieldRect.width-carrotSize;
    const maxY=fieldRect.height-carrotSize;

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
initGame();