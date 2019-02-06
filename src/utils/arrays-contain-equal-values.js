
/**
 * arraysContainEqualValues takes in two arrays and returns a Boolean whether each value in each array is contained by the other array.
 * 
 * The number of occurrences of each item in each array is disregarded.
 */

const arraysContainEqualValues = (arr1, arr2) => (
    arr1.every(item => arr2.includes(item))
    &&
    arr2.every(item => arr1.includes(item))
);

export default arraysContainEqualValues;
