function Tree(array) {
  const root = BulidTree(array);
}

function MakeNode(data) {
  const value = data;
  const left = null;
  const right = null;
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
