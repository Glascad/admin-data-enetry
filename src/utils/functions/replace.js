export default function replace(arr, i, val) {
    if (parseInt(i) !== i) throw new TypeError("First argument to replace() must be an integer");
    const newArr = arr.slice();
    newArr[i] = val;
    return newArr;
};