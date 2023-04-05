

export const TowerOfHanoiGreedyAlgorithm = (Towers,goal) => {
  const GreedyAlgorithm = (Towers) => {
    let closeList = [];
    let openList = [Towers];
    let ListH = [heuristic(Towers,goal[2].length)]
    let parent_Child = [];
    // const goal = [[], [], Towers[0]];
    if (openList.length == 0) return null;

    console.log("Towers",Towers);
    console.log("goal",goal);
    while (openList.length > 0) {
      let n = best_Heuristic(openList, ListH); //Towers[0].length : number of rings (3-6)
      if (areSame(n, goal)) {
        //if arrive to goal return the path
        closeList.push(n);
        console.log("Tested path length Greedy",closeList.length);//tested path
        return parent_Child;
      }
      let expanded = expand(n);
      for (const element of expanded) {
        let exists = false;
        for (let i = 0; i < closeList.length; i++) {
          if (areSame(element, closeList[i])) {
            exists = true;
          }
        }
        for (let i = 0; i < openList.length; i++) {
          if (areSame(element, openList[i])) {
            exists = true;
          }
        }
        if (!exists) {
          openList.push(element);
          ListH.push(heuristic(element,goal[2].length))
          parent_Child.push([[...element], [...n]]); //need to set n as parent of this element
        }
      }
      openList = openList.filter((e,index) => {
        if(!areSame(e, n))return e;
        else {
          ListH.splice(index,1)
        }
      });
      closeList.push(n);
    }
  };

  const heuristic = (element,n) => {
    let c = element[0].length + element[1].length;
    for (let i = 0; i < element[2].length; i++) {
      if (element[2][i] !== n - i) c++;
    }
    //let c=element[0]*2+element[1];//another heuristic function
    return c;
  };

  let best_Heuristic = (openList, ListH) => {

    let best = openList[0];
    let min = ListH[0];
    for (let i = 0; i < ListH.length; i++) {
      if (ListH[i] < min) {
        min = ListH[i];
        best = openList[i];
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
              if (
                tower[j][tower[j].length - 1] > tower[i][tower[i].length - 1]
              ) {
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

  const finalPath = (tree) => {
    let path = [];
    let x = goal;
    for (let i = tree.length - 1; i >= 0; i--) {
      if (areSame(x, tree[i][0])) {
        path.unshift(tree[i][0]);
        x = tree[i][1];
        if(areSame(Towers, tree[i][1])){//resolve problem
          path.unshift(tree[i][1]);
          break;
        }
      }
    }
    return path;
  };

  let tree = GreedyAlgorithm(Towers);
  let path = finalPath(tree);
  console.log(path.length-1);
  console.log(path);

  return path;
};
// 
// let Towers=[[6,5,4,3,2,1],[],[]]
// TowerOfHanoiGreedyAlgorithm(Towers);
