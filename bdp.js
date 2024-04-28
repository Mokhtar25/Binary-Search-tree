const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const trr = Tree(arr);

trr.setroot(trr.del(trr.getroot(), 23));

trr.setroot(trr.insert(trr.root, 23123213));
trr.setroot(trr.insert(trr.getroot(), 7));
// console.log(trr.find(8));
// console.log(trr.isBal());
// trr.getNodeDepth(8);
console.log(trr.getNodeHeigt(8));
console.log(trr.isBal());

function Tree(array) {
  let root = BulidTree(array);

  const setroot = (roots) => {
    if (typeof roots !== "object") return false;
    root = roots;
  };
  const print = (roots = root) => {
    if (roots === null) {
      return;
    }
    if (roots.left !== null) print(roots.left);
    console.log(roots.value);
    if (roots.right !== null) print(roots.right);
  };
  const isBal = (roots = root) => {
    // Base condition
    if (roots === null) return true;

    // for left and right subtree height
    let lh = height(roots.left);
    let rh = height(roots.right);

    // allowed values for (lh - rh) are 1, -1, 0
    if (
      Math.abs(lh - rh) <= 1 &&
      isBal(roots.left) === true &&
      isBal(roots.right) === true
    )
      return true;

    // if we reach here means tree is not
    // height-balanced tree
    return false;
  };
  const height = (root) => {
    // base condition when binary tree is empty
    if (root == null) return 0;
    return Math.max(height(root.left), height(root.right)) + 1;
  };

  const getNodeHeigt = (num) => {
    const node = find(num);
    return getpath(node);
  };
  const getpath = (root) => {
    if (root === null) {
      return 0;
    }

    return Math.max(getpath(root.left), getpath(root.right)) + 1;
  };
  const getNodeDepth = (num) => {
    const que = [root];

    let found = false;
    let h = 0;
    while (que.length !== 0) {
      const value = que.shift();
      if (num === value.value) {
        found = true;
      }

      if (value.left && num < value.value) {
        que.push(value.left);
        h++;
      } else if (value.right && num > value.value) {
        que.push(value.right);
        h++;
      }
    }
    if (found) console.log(h);
    else console.log("-1");
  };
  const getarry = (callback = null) => {
    const arr = [];

    const prints = (roots = root) => {
      if (roots === null) {
        return;
      }
      if (roots.left !== null) prints(roots.left);
      arr.push(roots.value);
      if (roots.right !== null) prints(roots.right);
    };
    prints();
    if (callback !== null) {
      arr.forEach((e) => callback(e));
      return;
    }
    return arr;
  };
  const find = (value) => {
    return finds(root, value);
    function finds(root, value) {
      if (root === null) {
        return false;
      }
      if (root.value === value) {
        return root;
      } else if (root.value > value) {
        return finds(root.left, value);
      } else {
        return finds(root.right, value);
      }
    }
  };
  const insert = (roots, value) => {
    if (checkdup(roots, value) === true) return roots;
    return insertrec(roots, value);
  };
  const insertrec = (roots, value) => {
    if (roots === null) {
      const newnode = MakeNode(value);
      return newnode;
    }

    if (roots.value > value) roots.left = insert(roots.left, value);
    else if (roots.value < value) roots.right = insert(roots.right, value);

    return roots;
  };

  const checkdup = (roots = root, value) => {
    if (roots === null || roots === undefined) {
      return false;
    }

    if (roots.right !== null) if (checkdup(roots.right, value)) return true;

    if (roots.value === value) return true;
    if (roots.left !== null) if (checkdup(roots.left, value)) return true;

    return false;
  };
  const getroot = () => {
    return root;
  };
  const del = (roots, value) => {
    if (roots === null) return roots;

    const MinValue = (node) => {
      while (node.left !== null) {
        node = node.left;
      }
      return node.val;
    };

    if (roots.value < value) {
      roots.right = del(roots.right, value);
    } else if (roots.value > value) {
      roots.left = del(roots.left, value);
    } else {
      if (roots.left === null) return roots.right;
      else if (roots.right === null) return roots.left;

      roots.value = MinValue(roots.right);
      roots.right = del(roots.right, roots.value);
    }
    return roots;
  };

  return {
    root,
    getarry,
    isBal,
    find,
    getNodeDepth,
    getNodeHeigt,
    setroot,
    print,
    getroot,
    del,
    insert,
  };
}

function MakeNode(data) {
  let value = data;
  let left = null;
  let right = null;
  return { value, left, right };
}

function BulidTree(array) {
  const set = new Set(array);
  let arr = [...set];

  arr = arr.sort((a, b) => {
    return a > b ? 1 : -1;
  });

  const makebal = (arr, start, end) => {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);

    const root = MakeNode(arr[mid]);

    root.left = makebal(arr, start, mid - 1);
    root.right = makebal(arr, mid + 1, end);
    return root;
  };
  return makebal(arr, 0, arr.length - 1);
}
