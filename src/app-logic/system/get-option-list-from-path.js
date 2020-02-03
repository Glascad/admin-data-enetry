
export default window.getOptionListFromPath = (path = '') => path
    .replace(/^\d+\.(.*__(D|C)T__\.\w+\.?)?/, '')
    .replace(/(\w+)\.(\w+)(\.)?/ig, ' $1:$2 ')
    .trim()
    .split(/\s+/g)
    .map(s => s.trim())
    .filter(Boolean)
    .map(str => str.split(/:/g))
    .map(([name, value]) => ({ name, value }));
