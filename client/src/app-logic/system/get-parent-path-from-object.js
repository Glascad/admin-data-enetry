
export default window.getParentPathFromObject = object => Object.entries(object).find(([key, value]) => value && key.match(/parent/i)) || [];
