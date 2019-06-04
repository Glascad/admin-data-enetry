import calculateDetailCount from './calculate-detail-count';

const testDetailCount = (bayCount, horizontalCount, detailCount) => {
    test(`With ${bayCount} bays and ${horizontalCount} horizontals, there should be ${detailCount} details`, () => {
        expect(calculateDetailCount({ bayCount, horizontalCount })).toBe(detailCount)
    });
}

describe('Calculate Detail Count Tests', () => {
    testDetailCount(1, 0, 4);
    testDetailCount(2, 0, 7);
    testDetailCount(3, 0, 10);
    testDetailCount(4, 0, 13);
    testDetailCount(1, 1, 7);
    testDetailCount(2, 1, 12);
    testDetailCount(3, 1, 17);
    testDetailCount(4, 1, 22);
    testDetailCount(5, 1, 27);
    testDetailCount(1, 2, 10);
    testDetailCount(2, 2, 17);
    testDetailCount(3, 2, 24);
    testDetailCount(4, 2, 31);
})
