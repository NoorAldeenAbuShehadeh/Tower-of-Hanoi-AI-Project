

export const TowerOfHanoiGreedyAlgorithm = (Towers) => {
  const GreedyAlgorithm = (Towers) => {
    let closeList = [];
    let openList = [Towers];
    let parent_Child = [];
    const goal = [[], [], Towers[0]];
    if (openList.length == 0) return null;

    while (openList.length > 0) {
      let n = best_Huristic(openList, Towers[0].length); //Towers[0].length : number of rings (3-6)
      if (areSame(n, goal)) {
        //if arrive to goal return the path
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
      }

      openList = openList.filter((element) => !areSame(element, n));
      closeList.push(n);
    }
  };

  let best_Huristic = (openList, n) => {
    let count = [];
    for (const element of openList) {
      let c = element[0].length + element[1].length;
      for (let i = 0; i < element[2].length; i++) {
        if (element[2][i] !== n - i) c++;
      }
      //let c=element[0]*2+element[1];//another heuristic function
      count.push(c);
    }
    let best = openList[0];
    let min = count[0];
    for (let i = 0; i < count.length; i++) {
      if (count[i] < min) {
        min = count[i];
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
    let x = [];
    for (let i = tree.length - 1; i >= 0; i--) {
      if (i === tree.length - 1) {
        path.unshift(tree[i][0]);
        x = tree[i][1];
      } else if (areSame(Towers, tree[i][1]) || i === 0) {
        path.unshift(tree[i][0]);
        path.unshift(tree[i][1]);
        break;
      } else if (areSame(x, tree[i][0])) {
        path.unshift(tree[i][0]);
        x = tree[i][1];
      }
    }
    return path;
  };

  let tree = GreedyAlgorithm(Towers);
  let path = finalPath(tree);
  // console.log(path.length-1);
  // console.log(path);

  return path;
};
// export default TowerOfHanoiGreedyAlgorithm;
