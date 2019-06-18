import calculateFrameCount from './calculate-frame-count';

const testFrameCount = (bayCount, horizontalCount, frameCount) => {
    test(`With ${bayCount} bays and ${horizontalCount} horizontals, there should be ${frameCount} Frames`, () => {
        expect(calculateFrameCount({ bayCount, horizontalCount })).toBe(frameCount)
    });
}

describe('Calculate Frame Count Tests', () => {
    testFrameCount(1, 0, 4);
    testFrameCount(2, 0, 7);
    testFrameCount(3, 0, 10);
    testFrameCount(4, 0, 13);
    testFrameCount(1, 1, 5);
    testFrameCount(2, 1, 9);
    testFrameCount(3, 1, 13);
    testFrameCount(4, 1, 17);
    testFrameCount(5, 1, 21);
    testFrameCount(1, 2, 6);
    testFrameCount(2, 2, 11);
    testFrameCount(3, 2, 16);
    testFrameCount(4, 2, 21);
})

