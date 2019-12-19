import getChildren from './get-children';
import SystemMap from './system-map';

export default window.makeRenderable = system => {
    const systemMap = new SystemMap(system);
    const makeNodeRenderable = node => ({
        item: node,
        identifier: 'path',
        branches: getChildren(node, systemMap).map(makeNodeRenderable),
    });
    return makeNodeRenderable(systemMap);
}
