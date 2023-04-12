export const TowerOfHanoiA_star = (Towers, goal) => {
  const A_star = (Towers) => {
    let closeList = [];
    let openList = [Towers];
    let ListH=[heuristic(Towers,goal[2].length)];
    let ListG=[0];
    let parent_Child = [];
    if (openList.length == 0) return null;

    while (openList.length > 0) {
      let n = best_F(openList, ListH, ListG); //Towers[0].length : number of rings (3-6)
      if (areSame(n, goal)) { //if arrive to goal return the path
        closeList.push(n);
        console.log("Tested path length A*",closeList.length);//tested path
        console.log("Test Array",closeList);
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
          parent_Child.push([[...element], [...n]]); //need to set n as parent of this element
          ListH.push(heuristic(element,goal[2].length))
          ListG.push(gCost(element,parent_Child))
        }
        else{
            if(gCost(element,parent_Child) > gCost(element,[...parent_Child,[element,n]])){
                openList.push(element);
                parent_Child.push([[...element], [...n]]);
                closeList = closeList.filter((e,index) => {
                  if(!areSame(e, element))return e;
                  else {
                    ListG.splice(index,1)
                    ListH.splice(index,1)
                  }
                });
            }
        }
      }

      openList = openList.filter((e,index) => {
        if(!areSame(e, n))return e;
        else {
          ListG.splice(index,1)
          ListH.splice(index,1)
        }
      });
      closeList.push(n);
    }
  };
/* -----------------------------------------calc best--------------------------------------------- */
  const heuristic = (element,n) => {
    let c = element[0].length + element[1].length;
    for (let i = 0; i < element[2].length; i++) {
      if (element[2][i] !== n - i) c++;
    }
    //let c=element[0]*2+element[1];//another heuristic function
    return c;
  };

  const gCost = (element, parent_Child) => {
    let found = false;
    let cg = 0;
    let parent = [];
    for (let i = parent_Child.length - 1; i >= 0; i--) {
      if (areSame(element, parent_Child[0][1])) break;//arrive to root 
      if (areSame(parent_Child[i][0], element)) {
        found = true;
        parent = parent_Child[i][1];
        cg++;
      }
      if (found) {
        if (areSame(parent_Child[i][0],parent)) {
          parent = parent_Child[i][1];
          cg++;
        }
        if (areSame(parent_Child[0][1], parent)) break;
      }
    }
    return cg;
  };

  let best_F = (openList, ListH, ListG) => {

    let best = openList[0];
    let min = [ListH[0],ListG[0]];
    for (let i = 0; i < ListH.length; i++) {
      if (ListH[i] + ListG[i] < min[0] + min[1]) {
        min = [ListG[i],ListH[i]]
        best = openList[i];
      } else if (ListH[i] + ListG[i] < min[0] + min[1]) {
        if (ListH[i] < min[0]) {
          min = [ListG[i],ListH[i]];
          best = openList[i];
        }
      }
    }
    return best;
  };
/*----------------------------------------End calc best--------------------------------- */
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

  const areSame=(A, B)=> {
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

  let tree = A_star(Towers);
  let path = finalPath(tree);
  // console.log(path.length - 1);
  console.log("Solution Array",path);

  return path;
};

// let Towers=[[6,5,4,3,2,1],[],[]]
// TowerOfHanoiA_star(Towers,[[],[],Towers[0]]);
