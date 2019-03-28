
export default (() => {
    var fakeId = -1;
    return () => fakeId--;
})();

export const convertFakeIdToNumber = fakeId => typeof fakeId === 'number' ?
    fakeId
    :
    Number(fakeId.replace('_', ''));
