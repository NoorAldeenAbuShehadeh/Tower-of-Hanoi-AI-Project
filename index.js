let rings = document.getElementsByClassName('ring')
let tours = document.getElementsByClassName('ring-container')
let dragItem = null 

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
    this.prepend(dragItem) ;
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

// ************
function initRing(){

    rings[0].style.width ="50px"
    rings[1].style.width ="80px"
    rings[2].style.width ="110px"
}
initRing()
function addRing()
{
    const numRing = document.getElementById('num-ring')
    if (numRing.innerText < 6 )
    {
        numRing.innerText++;
        let tmp = rings[2].cloneNode(true)
        if(numRing.innerText == 4 )
        {
            tmp.style.width="140px"
        }
        else if(numRing.innerText == 5 )
        {
            tmp.style.width="180px"
        }
        else if(numRing.innerText == 6 )
        {
            tmp.style.width="200px"
        }
        
        tours[0].append(tmp)
        
    }
    else{
        
    }
    
}

function removeRing(){
    console.log('remobe');
}