const rings = document.getElementsByClassName('ring')
const tours = document.getElementsByClassName('ring-container')
const numRing = document.getElementById('num-ring')
const workStatus = document.getElementById('work-status')
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
    if(this === tours[0].children[0] || this === tours[1].children[0] ||this === tours[2].children[0])
    {
        console.log('ok move it');
        dragItem = this;
        setTimeout(()=>this.style.display ='none',0);
    }
    
}
function dragEnd(){
    
    // console.log(this);
    setTimeout(()=>this.style.display ='block',0);
    dragItem = null;
}
function Drop(){
    // console.log(dragItem);
    if(!(dragItem == null)){
    this.prepend(dragItem) ;
    workStatus.innerHTML='Move one Ring'
    }
    else{
        console.log('filed move not in the top');
    }
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

// ************
function initRing(){

    rings[0].style.width ="50px"
    rings[1].style.width ="80px"
    rings[2].style.width ="110px"
}
function addRing()
{
    if (numRing.innerText < 6 )
    {
        numRing.innerText++;
        workStatus.innerHTML='add new Ring'
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
        workStatus.innerHTML='maximum num of Ring 6'
    }
    
}

function removeRing(){
    if (numRing.innerText >= 4 )
    {
        numRing.innerText--;
        workStatus.innerHTML='remove Ring'
        let lastElementFirstTour = tours[0].children[tours[0].children.length-1]
        lastElementFirstTour.remove()
        
    }
    else{
        workStatus.innerHTML='minimum num of Ring 3'
    }
}

// ****************************************************** main Execute ****************************************//
initListener()
initRing()
