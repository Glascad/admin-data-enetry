
export default window.filterOptionsAbove = ({ path, newPath }, optionList = []) => optionList.filter(({ name }) => !(newPath ? newPath : path).includes(name));
