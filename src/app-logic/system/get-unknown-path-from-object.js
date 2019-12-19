
export default window.getUnknownPathFromObject = object => Object.entries(object).find(([key, value]) => value && key.match(/path/i)) || [];
