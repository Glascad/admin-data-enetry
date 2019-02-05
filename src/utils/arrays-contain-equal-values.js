
const arraysContainEqualValues = (arr1, arr2) => (
    arr1.every(item => arr2.includes(item))
    &&
    arr2.every(item => arr1.includes(item))
);

export default arraysContainEqualValues;
