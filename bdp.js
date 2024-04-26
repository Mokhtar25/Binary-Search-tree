const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const trr = Tree(arr);

trr.setroot(trr.del(trr.getroot(), 23));

trr.setroot(trr.insert(trr.root, 23123213));
trr.setroot(trr.insert(trr.getroot(), 7));
console.log(trr.find(8));
trr.print();

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

  return { root, find, setroot, print, getroot, del, insert };
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
