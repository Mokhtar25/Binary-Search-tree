function MakeNode(data) {
  const value = data;
  const left = null;
  const right = null;
}

function BulidTree(array) {
  const set = new Set(array);
  const arr = [...set];

  return arr.sort((a, b) => {
    return a > b ? 1 : -1;
  });
}

const arr = [1, 3, 123, 12, 21, 1, 3, 2];
console.log(BulidTree(arr));
