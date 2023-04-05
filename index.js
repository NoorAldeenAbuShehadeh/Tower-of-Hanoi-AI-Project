import {TowerOfHanoiGreedyAlgorithm} from './Greedy.js'
import { TowerOfHanoiA_star } from './A-star.js';
const Towers = [[3,2,1], [], []];
const rings = document.getElementsByClassName('ring')
const tours = document.getElementsByClassName('ring-container')
const numRing = document.getElementById('num-ring')
const workStatus = document.getElementById('work-status')
const movesNum = document.getElementById('moves-num')
const solveBtn = document.getElementById('solve-btn')
const hintBtn = document.getElementById('hint-btn')
const areas = document.getElementsByClassName('area')
const incBtn = document.getElementById('inc-btn')
const decBtn = document.getElementById('dec-btn')
const userBtn = document.getElementById('User')
const AIBtn = document.getElementById('AI')
const Greedy = document.getElementById('Greedy')
const aStar = document.getElementById('A*')
const Algorithm = document.getElementById('Algorithm')
const restartBtn = document.getElementById('restart-btn')
const speedRange = document.getElementById('speedRange')
const executeSpeed = document.getElementById('execute-speed')
const slidecontainer = document.getElementById('slidecontainer')
const minMov = document.getElementById('min-mov')
const tryAgain = document.getElementById('tryAgain')
const header = document.getElementById('header')
let dragItem = null 
let startGame = false
let playMode = "User"
const widthRingUnit = 35
const ringColor = ['#774f9b','#43afe2','#fae50e','#f96c0d','#e24ba5','#c0504e']
let from
let to
let hintAction = false
// const GreedyPath = TowerOfHanoiGreedyAlgorithm(Towers); //applay algorithm
// console.log(GreedyPath);

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
    for(let i=0; i< rings.length;i++){
        rings[i].setAttribute("draggable", true);
    }
}
incBtn.addEventListener('click',addRing)
decBtn.addEventListener('click',removeRing)
solveBtn.addEventListener('click',solve)
hintBtn.addEventListener('click',hint)
restartBtn.addEventListener('click',reloadePage)
userBtn.addEventListener('change',getCheckedMode)
AIBtn.addEventListener('change',getCheckedMode)
tryAgain.addEventListener('click',reloadePage)
speedRange.addEventListener('input',speedControl)
//Listener Event
function dragStart(){
    if(this === tours[0].children[0] || this === tours[1].children[0] ||this === tours[2].children[0])
    {
        console.log('ok move it');
        dragItem = this;
        setTimeout(()=>this.style.display ='none',0);
    }
    // console.log(this);
}
function dragEnd(){
    
    // console.log(this);
    setTimeout(()=>this.style.display ='block',0);
    dragItem = null;
}
function checkEndGame(){
    // console.log(Number(numRing.innerText));
    // console.log(tours[2])
    let getGoal= true;
        for (let i = 0 ; i < tours[2].children.length -1 ; i++)
        {
            let firstEl = tours[2].children[i].style.width;
            firstEl = Number(firstEl.substring(0,firstEl.length-2))
            let secoundEl = tours[2].children[i+1].style.width;
            secoundEl = Number(secoundEl.substring(0,secoundEl.length-2))
            // console.log('firstEl------------------',firstEl);
            // console.log('secoundEl',secoundEl);
            if(firstEl > secoundEl)
            {
                getGoal=false;
                break;
            }
        }
        if(getGoal && tours[2].children.length === Number(numRing.innerText)){
            workStatus.innerHTML="Congratulation we get the Goal 🎉"
            tryAgain.style.display='flex'
        }
}
function disableBtn(){
    AIBtn.disabled = true;
    userBtn.disabled = true;
    Greedy.disabled = true;
    aStar.disabled = true;

}
function Drop(){
    this.style.border = 'none'
    let correctMove = true;
    if(dragItem == null)
    {
        correctMove=false;
    }
    else if(this.children.length>0){
        let firstEl = dragItem.style.width;
        firstEl = Number(firstEl.substring(0,firstEl.length-2))
        let secoundEl = this.children[0].style.width
        secoundEl = Number(secoundEl.substring(0,secoundEl.length-2))
        console.log('firstEl',firstEl);
        console.log('secoundEl',secoundEl);
        if(firstEl > secoundEl)
        {
            correctMove=false
        }
    }
    if(correctMove){
    this.prepend(dragItem) ;
    startGame = true;
    disableBtn()
    movesNum.innerText = Number(movesNum.innerText)+1
    workStatus.innerHTML='Move one Disk'
    }
    else{
        console.log('filed move not in the top');
        workStatus.innerHTML="Not correct move"
    }
    checkEndGame()
}
function dragOver(e){
    e.preventDefault();
}
function dragEnter(e){
    e.preventDefault();
    this.style.border = '2px dashed red'
    // console.log("enter",this);
}
function dragLeave(){
    this.style.border = 'none'
    // console.log("leave",this);
}
//End Listener Event

// ************
function initRing(){
    
    for(let i=0 ; i< 3 ; i++)
    {
        rings[i].style.width = String(widthRingUnit*(i+1))+"px"
        rings[i].style.backgroundColor = ringColor[i]
    }
    
    // rings[1].style.width = String(widthRingUnit*2)+"px"
    // rings[1].style.backgroundColor = ringColor[1]
    // rings[2].style.width = String(widthRingUnit*3)+"px"
    // rings[2].style.backgroundColor = ringColor[2]
}
function addRing()
{
    if (!startGame)
    {
        if(numRing.innerText < 6){
            Towers[0].unshift(Number(numRing.innerText)+1)
            console.log(Towers);
            numRing.innerText++;
            workStatus.innerHTML='Add New Disk'
            let tmp = rings[2].cloneNode(true)
            ringListener(tmp);
            tmp.style.width = String(35*(Number(numRing.innerText)))+"px"
            tmp.style.backgroundColor = ringColor[Number(numRing.innerText)-1]
            minMov.innerHTML = `Minimum Number of Movement: ${(2**Number(numRing.innerText))-1}`
            // console.log(minMov);
            // if(numRing.innerText == 4 )
            // {
            //     tmp.style.width="140px"
            // }
            // else if(numRing.innerText == 5 )
            // {
            //     tmp.style.width="175px"
            // }
            // else if(numRing.innerText == 6 )
            // {
            //     tmp.style.width="210px"
            // }
            
            tours[0].append(tmp)
        }
        else{
            workStatus.innerHTML='Maximum Number of Disks 6'
        }
        
    }
    else{
        workStatus.innerHTML="Game already started we can't add new ring"
    }
    
}

function removeRing(){
    if (!startGame)
    {
        if(numRing.innerText >= 4){
            Towers[0].shift()
            console.log(Towers);
            numRing.innerText--;
            workStatus.innerHTML='Remove Disk'
            let lastElementFirstTour = tours[0].children[tours[0].children.length-1]
            minMov.innerHTML = `Minimum Number of Movement: ${(2**Number(numRing.innerText))-1}`
            lastElementFirstTour.remove()
        }else{
            workStatus.innerHTML='Minimum Number of Disks 3'
        }
    }
    else{
        workStatus.innerHTML="Game already started we can't remove ring"
    }
}
function delay(ms)
{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve('success')
        }, ms);
    })
}
async function moveRing(tourStart,tourEnd){
    let node = tours[tourStart].children[0]
    // setTimeout(()=>node.style.display ='none',0);
    
    // setTimeout(()=>{
        node.style.display ='none'
        areas[tourStart].append(node)
        node.style.display ='block'
        await delay(500/executeSpeed.innerHTML)
    // },((2.3-executeSpeed.innerHTML)*500))
    // setTimeout(()=>node.style.display ='block',500);
    
    // setTimeout(()=>this.style.display ='block',0);
    // setTimeout(()=>{
        node.style.display ='none'
        areas[tourEnd].append(node)
        node.style.display ='block'
        await delay(500/executeSpeed.innerHTML)
    // },((2.3-executeSpeed.innerHTML)*500*2))

    // setTimeout(()=>{
        node.style.display ='none'
        tours[tourEnd].prepend(node)
        node.style.display ='block'
        await delay(500/executeSpeed.innerHTML)
    // },((2.3-executeSpeed.innerHTML)*500*3))
}
async function hint(){
    if(!hintAction)
    {
        startGame = true    
        disableBtn()
        hintAction =true
        let hintArr =[[],[],[]]
    for(let i=0 ; i<tours[0].children.length;i++)
    {
        let widthsize = tours[0].children[i].style.width
        widthsize = (Number(widthsize.slice(0, -2))/widthRingUnit); 
        // console.log("0",widthsize);
        hintArr[0].unshift(widthsize)
    }
    for(let i=0 ; i<tours[1].children.length;i++)
    {
        let widthsize = tours[1].children[i].style.width
        widthsize = (Number(widthsize.slice(0, -2))/widthRingUnit); 
        // console.log("1",widthsize);
        hintArr[1].unshift(widthsize)
    }
    for(let i=0 ; i<tours[2].children.length;i++)
    {
        let widthsize = tours[2].children[i].style.width
        widthsize = (Number(widthsize.slice(0, -2))/widthRingUnit); 
        // console.log("2",widthsize);
        hintArr[2].unshift(widthsize)
    }
    console.log(hintArr);
    let sol = TowerOfHanoiGreedyAlgorithm(hintArr,[[],[],[...Towers[0]]]);
    // 
    for(let i =0 ;i<sol.length - 1 ;i++){
        for (let j=0 ; j< 3 ; j++){
            if( sol[i][j].length - sol[i+1][j].length === 1 ){
                from = j
            }
            else if(sol[i][j].length - sol[i+1][j].length === -1)
            {
                to = j 
            }
        }
        console.log(from,"-->",to)
        

        workStatus.innerHTML = `Move Disk from Tower ${from} to Tower ${to}`
        movesNum.innerHTML = Number(movesNum.innerHTML)+1
        await moveRing(from,to)
        
        
        break
    }
    checkEndGame()
    //
    hintAction=false
    }
     

}
async function solve(){
    console.log("startGame",startGame);
    if(!startGame)
    {
    startGame = true    
    disableBtn()
    let sol;
    if(aStar.checked){
        sol = TowerOfHanoiA_star(Towers,[[],[],[...Towers[0]]])
    }else if(Greedy.checked){
        sol = TowerOfHanoiGreedyAlgorithm(Towers,[[],[],[...Towers[0]]])
    }
    console.log("Solution", sol);
    
    // 
    for(let i =0 ;i<sol.length ;i++){
        console.log(sol[i]);
    }
    //
    for(let i =0 ;i<sol.length - 1 ;i++){
        // console.log("+++++++++++++++++++++++++++++");
        // console.log(sol[i][0].length,"+",sol[i][1].length,"+",sol[i][2].length)
        // console.log(sol[i+1][0].length,"+",sol[i+1][1].length,"+",sol[i+1][2].length)
        // console.log(sol[i][0].length - sol[i+1][0].length,"+",sol[i][1].length - sol[i+1][1].length,"+",sol[i][2].length - sol[i+1][2].length)
        // // 1 from ==== -1 to
        
        // setTimeout(()=>{
        for (let j=0 ; j< 3 ; j++){
            if( sol[i][j].length - sol[i+1][j].length === 1 ){
                from = j
            }
            else if(sol[i][j].length - sol[i+1][j].length === -1)
            {
                to = j 
            }
        }
    //     // console.log("+++++++++++++++++++++++++++++");

    //     // break
        console.log(from,"-->",to)
        workStatus.innerHTML = `Move Disk from Tower ${from} to Tower ${to}`
        await moveRing(from,to)
        
        movesNum.innerHTML = Number(movesNum.innerHTML)+1
    // },(1700*i))//2.5-executeSpeed.innerHTML
        
        // setTimeout(()=>{moveRing(from,to)},1500*i)
        
    }
    workStatus.innerHTML ="Game finish successfully 🎉"
    tryAgain.style.display='flex'
    }
    else{
        workStatus.innerHTML="Game already started"
    }
    console.log("startGame",startGame);
    
}
function getCheckedMode(){
    if (userBtn.checked) 
    {
        playMode = userBtn.value
        solveBtn.style.display ='none'
        hintBtn.style.display ='flex'
        slidecontainer.style.display ='none'
        Algorithm.style.display ='none'
        header.style.flexDirection = "row"
        initListener()
        
    }
    else if (AIBtn.checked)
    {
        playMode = AIBtn.value
        slidecontainer.style.display ='flex'
        solveBtn.style.display ='flex'
        hintBtn.style.display ='none'
        Algorithm.style.display ='flex'
        header.style.flexDirection = "column"
        removeListener()
        
    }
    console.log(playMode)
}
function reloadePage ()
{
    location.reload()
}
function speedControl() 
{
    let val = this.value/100
    executeSpeed.innerHTML = val.toFixed(2)
    
    // console.log((executeSpeed.innerHTML)*1500,((executeSpeed.innerHTML)*1500)/3)
}
function removeRingListener(ringObj){
    ringObj.removeEventListener('dragstart',dragStart)
    ringObj.removeEventListener('dragend',dragEnd)
}
function removeTourListener(tourObj){
    tourObj.removeEventListener('dragover',dragOver) ;
    tourObj.removeEventListener('dragenter',dragEnter);
    tourObj.removeEventListener('dragleave',dragLeave);
    tourObj.removeEventListener('drop',Drop);
}
function removeListener(){
    for(let i of rings){
        removeRingListener(i)
    }
    for (let j of tours){
        removeTourListener(j)
    }
    for(let i=0; i< rings.length;i++){
        rings[i].setAttribute("draggable", false);
    }
}
// ****************************************************** main Execute ****************************************//
initListener()
initRing()
getCheckedMode()
// removeListener()
  