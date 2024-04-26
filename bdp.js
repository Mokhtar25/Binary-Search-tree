const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const trr = Tree(arr);

trr.root = trr.del(6345);

trr.print();

function Tree(array) {
  const root = BulidTree(array);

  const print = (roots = root) => {
    if (roots === null) {
      return;
    }
    if (roots.left !== null) print(roots.left);
    console.log(roots.value);
    if (roots.right !== null) print(roots.right);
  };

  const MinValue = (head) => {
    let min = head.value;
    while (head.left) {
      min = head.left.value;
      head = head.left;
    }
    return min;
  };
  const del = (roots, value) => {
    if (roots === null) return roots;

    if (roots.value > value) {
      roots.right = del(roots.right, value);
    } else if (roots.value < value) {
      roots.left = del(roots.left, value);
    } else {
      if (roots.left === null) return roots.right;
      else if (roots.right === null) return roots.left;

      roots.value = MinValue(roots.right);
      roots.right = del(roots.right, roots.value);
      return roots;
    }
  };

  return { root, print, del };
}

function MakeNode(data) {
  const value = data;
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
