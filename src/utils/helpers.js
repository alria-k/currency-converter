export function swapItemsInArray(arr, index1, index2) {
  if (
    index1 === index2 ||
    index1 < 0 ||
    index2 < 0 ||
    index1 >= arr.length ||
    index2 >= arr.length
  )
    return;

  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
}
