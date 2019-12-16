
export default window.getUnknownPathFromObject = object => Object.entries(object).find(([key]) => key.match(/path/i)) || [];
