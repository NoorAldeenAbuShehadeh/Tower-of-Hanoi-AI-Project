const Towers = [[6,5,4,3,2,1], [], []];

const GreedyAlgorithm = (Towers) => {
  let closeList = [];
  let openList = [Towers];
  const goal = [[], [], Towers[0]];
  if (openList.length == 0) return [];

  while (openList.length > 0) {
    let n = best_Huristic(openList,Towers[0].length);
    if (areSame(n, goal)) {//if arrive to goal return the path
      closeList.push(n)
      console.log(closeList.length)
      return closeList;
    }
    let expanded = expand(n);
    for (const element of expanded){
      let exsist = false;
      for (let i = 0; i < closeList.length; i++) {
        if (areSame(element, closeList[i])) {
          exsist=true;
          //need to set n as parent of this element
        }
      }
      for (let i = 0; i < openList.length; i++) {
        if (areSame(element, openList[i])) {
          exsist = true;
          //need to set n as parent of this element
        }
      }
      if(!exsist)openList.push(element);
    }

    openList = openList.filter((element) => !areSame(element, n));
    closeList.push(n);
  }
};

let best_Huristic = (openList,n) => {
  let count=[]
  for (const element of openList){
    let c=element[0].length+element[1].length;
    for(let i=0;i<element[2].length;i++){
      if(element[2][i]!==n-i)c++;
    }
    //let c=element[0]*2+element[1];
    count.push(c);
  }
  let best=openList[0];
  let min=count[0];
  for(let i=0;i<count.length;i++){
    if(count[i] < min){
      min=count[i];
      best=openList[i];
    }
  }
  return best;
};

let expand = (tower) => {
  let result = [];
  for (let i = 0; i < tower.length; i++) {
    for (let j = 0; j < tower.length; j++) {
      let temp = [[...tower[0]], [...tower[1]], [...tower[2]]];
      if (i !== j) {
        if (tower[i].length > 0) {
          if (tower[j].length > 0) {
            if (tower[j][tower[j].length - 1] > tower[i][tower[i].length - 1]) {
              temp[j].push(tower[i][tower[i].length - 1]);
              temp[i].pop();
              result.push(temp);
            }
          } else {
            temp[j].push(tower[i][tower[i].length - 1]);
            temp[i].pop();
            result.push(temp);
          }
        }
      }
    }
  }
  return result;
};

function areSame(A, B) {
  let i, j;
  for (i = 0; i < A.length; i++)
    for (j = 0; j < B.length; j++) if (A[i][j] != B[i][j]) return false;
  return true;
}


console.log(GreedyAlgorithm(Towers))

/*

function countDisksNotInFinalPosition(towers) {
  const numDisks = towers[0].length;
  let count = 0;
  for (let i = 1; i <= numDisks; i++) {
    // check if disk i is not in its final position on tower 3
    if (towers[2].indexOf(i) !== numDisks - i) {
      count++;
    }
  }
  return count;
}

The countDisksNotInFinalPosition function takes in the current state of the towers as an array of arrays,
 where each inner array represents a tower and contains the disk values in ascending order. The function 
 first determines the number of disks by getting the length of the first tower array. It then loops through
  each disk from 1 to the maximum number of disks and checks if it is not in its final position on tower 3. 
  If a disk is not in its final position, the count is incremented. Finally, the function returns the total
   count of disks not in their final position.

Note that this heuristic function is not admissible, since it may overestimate the number of moves
 required to reach the goal state. However, it can still be useful in guiding a search algorithm towards 
 the goal state more quickly than a purely random or uninformed search.
*/
