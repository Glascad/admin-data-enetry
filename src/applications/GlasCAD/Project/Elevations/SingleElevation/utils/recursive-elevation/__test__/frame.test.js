import RecursiveElevation from "../elevation";
import sample1 from '../../../__test__/sample-elevations/sample1';
import sample1Special from '../../../__test__/sample-elevations/sample1-special';

describe('Frame Tests', () => {
    test('sample1 - has correct number of frames', () => {
        const elevation = new RecursiveElevation(sample1)
        expect(elevation.allFrames).toHaveProperty('length', 9);
    });
    test('sample1 special - has correct number of frames', () => {
        const elevation = new RecursiveElevation(sample1Special)
        expect(elevation.allFrames).toHaveProperty('length', 10);
    });
    test('sample1 special - has correct frame references (slightly offset)', () => {
        const elevation = new RecursiveElevation(sample1Special);
        expect(elevation.containers[708].rightFrame).not.toBe(elevation.containers[707].rightFrame);
        expect(elevation.containers[708].rightFrame).not.toBe(elevation.containers[709].leftFrame);
    });
    test('sample1 special - non-matching details do not belong to the same frame (verticals, slightly offset)', () => {
        const elevation = new RecursiveElevation(sample1Special);
        expect(elevation.details[1]._frame).not.toBe(elevation.details[1792]._frame);
    });
    test('sample1 special - non-matching details do not belong to the same frame (horizontals, no offset)', () => {
        const elevation = new RecursiveElevation(sample1Special);
        expect(elevation.details[1799]._frame).not.toBe(elevation.details[1793]._frame);
    });
    test('sample1 special - non-matching details do not belong to the same frame (completely separate)', () => {
        const elevation = new RecursiveElevation(sample1Special);
        expect(elevation.details[1795]._frame).not.toBe(elevation.details[1792]._frame);
        expect(elevation.details[1801]._frame).not.toBe(elevation.details[1792]._frame);
    });
    test('smaple1 special - matching details belong to the same frame', () => {
        const elevation = new RecursiveElevation(sample1Special);
        expect(elevation.details[1791]._frame).toBe(elevation.details[1795]._frame);
        expect(elevation.details[1798]._frame).toBe(elevation.details[1801]._frame);
    });
});
