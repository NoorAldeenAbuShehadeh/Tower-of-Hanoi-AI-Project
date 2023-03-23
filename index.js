let rings = document.getElementsByClassName('ring')
let tours = document.getElementsByClassName('ring-container')
let dragItem = null 

function ringListener(ringObj){
    ringObj.addEventListener('dragstart',dragStart)
    ringObj.addEventListener('dragend',dragEnd)
}
function tourListener(tourObj){
    tourObj.addEventListener('dragover',dragOver) ;
    tourObj.addEventListener('dragenter',dragEnter);
    tourObj.addEventListener('dragleave',dragLeave);
    tourObj.addEventListener('drop',Drop);
}
function initListener(){
    for(let i of rings){
        ringListener(i)
    }
    for (let j of tours){
        tourListener(j)
    }
}

//Listener Event
function dragStart(){
    dragItem = this;
    console.log(this)
    setTimeout(()=>this.style.display ='none',0);
}
function dragEnd(){
    
    setTimeout(()=>this.style.display ='block',0);
    dragItem = null;
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
//End Listener Event
console.log(rings)
console.log(tours)

// ************
initListener()
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
        ringListener(tmp);
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