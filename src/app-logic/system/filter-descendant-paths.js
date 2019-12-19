
export default window.filterDescendantPaths = paths => paths
    .filter(descendant => !paths.some(path => descendant !== path && descendant.startsWith(path) && !descendant.startsWith(`${path}_`)));