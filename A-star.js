const TowerOfHanoiA_star = (Towers, goal) => {
  const A_star = (Towers) => {
    let closeList = [];
    let openList = [Towers];
    let parent_Child = [];
    const goal = [[], [], Towers[0]];
    if (openList.length == 0) return null;

    while (openList.length > 0) {
      let n = best_F(openList, parent_Child, goal[2].length); //Towers[0].length : number of rings (3-6)
      if (areSame(n, goal)) { //if arrive to goal return the path
        closeList.push(n);
        return parent_Child;
      }
      let expanded = expand(n);
      for (const element of expanded) {
        let exsist = false;
        for (let i = 0; i < closeList.length; i++) {
          if (areSame(element, closeList[i])) {
            exsist = true;
          }
        }
        for (let i = 0; i < openList.length; i++) {
          if (areSame(element, openList[i])) {
            exsist = true;
          }
        }
        if (!exsist) {
          openList.push(element);
          parent_Child.push([[...element], [...n]]); //need to set n as parent of this element
        }
        else{
            if(gCost(element,parent_Child) > gCost(element,[...parent_Child,[element,n]])){
                openList.push(element);
                parent_Child.push([[...element], [...n]]);
                closeList = closeList.filter((e) => !areSame(e, element));
            }
        }
      }

      openList = openList.filter((element) => !areSame(element, n));
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
      if (areSame(element, parent_Child[0][1])) break;
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

  let best_F = (openList, parent_Child, n) => {
    let count = [];
    let h = [],
      g = [];
    for (const element of openList) {
      let c = heuristic(element,n);
      h.push(c);

      let cg = gCost(element, parent_Child);
      g.push(cg);
      count.push([c, cg]);
    }
    let best = openList[0];
    let min = count[0];
    for (let i = 0; i < count.length; i++) {
      if (count[i][0] + count[i][1] < min[0] + min[1]) {
        min = count[i];
        best = openList[i];
      } else if (count[i][0] + count[i][1] === min[0] + min[1]) {
        if (count[i][0] < min[0]) {
          min = count[i];
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
  console.log(path.length - 1);
  console.log(path);

  return path;
};
//
let Towers=[[6,5,4,3,2,1],[],[]]
TowerOfHanoiA_star(Towers);
// export default TowerOfHanoiA_star;
