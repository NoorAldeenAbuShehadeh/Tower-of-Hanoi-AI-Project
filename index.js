let rings = document.getElementsByClassName('ring')
let tours = document.getElementsByClassName('ring-container')
let dragItem = null
let tourItem = null 

for(let i of rings){
    i.addEventListener('dragstart',dragStart)
    i.addEventListener('dragend',dragEnd)
}

function dragStart(){
    dragItem = this;
    console.log(this)
    setTimeout(()=>this.style.display ='none',0);
}

function dragEnd(){
    
    setTimeout(()=>this.style.display ='block',0);
    dragItem = null;
}

for (let j of tours){
    j.addEventListener('dragover',dragOver) ;
    j.addEventListener('dragenter',dragEnter);
    j.addEventListener('dragleave',dragLeave);
    j.addEventListener('drop',Drop);
}
function Drop(){
    this.append(dragItem) ;
}
function dragOver(e){
    e.preventDefault();
}
function dragEnter(e){
    e.preventDefault();
    this.style.border = '2px dotted red'
}
function dragLeave(){
    this.style.border = 'none'
}

console.log(rings)
console.log(tours)