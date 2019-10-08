import { sample1 } from '../sample-systems';
import { getDefaultPath, SystemMap } from '../../system-utils';

function testGetDefaultPath({
    path,
    defaultPath,
    system,
}) {
    describe('Testing get default path', () => {
        const systemMap = new SystemMap(system);
        test('', () => {
            expect(getDefaultPath(systemMap[path], systemMap)).toBe(defaultPath);
        });
    });
}

testGetDefaultPath({
    path: "1.SET",
    defaultPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE",
    system: sample1
});
