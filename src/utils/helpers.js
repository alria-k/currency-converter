export function swapItemsInArray(arr, index1, index2) {
  if (
    index1 === index2 ||
    index1 < 0 ||
    index2 < 0 ||
    index1 >= arr.length ||
    index2 >= arr.length
  )
    return;

  const copyArr = [...arr];

  copyArr[index1] = { ...arr[index2], index: arr[index1].index };
  copyArr[index2] = { ...arr[index1], index: arr[index2].index };

  return copyArr;
}
