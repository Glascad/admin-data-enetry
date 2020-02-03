
export default window.getUnknownPathAndKeyFromItem = item => Object.entries(item || {}).find(([key, value]) => value && key.match(/path/i)) || [];
