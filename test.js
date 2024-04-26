function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

function Tree(array) {
  const root = BuildTree(array);

  const print = (roots = root) => {
    if (roots === null) {
      return;
    }
    if (roots.left !== null) print(roots.left);
    console.log(roots.val);
    if (roots.right !== null) print(roots.right);
  };

  const del = (roots, value) => {
    if (roots === null) return roots;

    if (value < roots.val) {
      roots.left = del(roots.left, value);
    } else if (value > roots.val) {
      roots.right = del(roots.right, value);
    } else {
      if (roots.left === null) return roots.right;
      else if (roots.right === null) return roots.left;

      // Find the minimum value in the right subtree
      const minValue = findMinValue(roots.right);
      roots.val = minValue;

      // Delete the minimum value node from the right subtree
      roots.right = del(roots.right, minValue);
    }
    return roots;
  };

  const findMinValue = (node) => {
    while (node.left !== null) {
      node = node.left;
    }
    return node.val;
  };

  return { root, print, del };
}

function BuildTree(array) {
  const set = new Set(array);
  const arr = [...set].sort((a, b) => a - b);

  const makeBalanced = (arr, start, end) => {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const root = new TreeNode(arr[mid]);

    root.left = makeBalanced(arr, start, mid - 1);
    root.right = makeBalanced(arr, mid + 1, end);
    return root;
  };

  return makeBalanced(arr, 0, arr.length - 1);
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const trr = Tree(arr);
trr.root = trr.del(trr.root, 8);
trr.print();
