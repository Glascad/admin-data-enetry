import sample1 from '../../../../__test__/sample-elevations/sample1.json';
import sample2 from '../../../../__test__/sample-elevations/sample2.json';
import RecursiveElevation from '../../elevation';

export default function testElevationArrays({
    elevation,
    containerCount = expect.any(Number),
    detailCount = expect.any(Number),
    frameCount = expect.any(Number),
    roughOpening = expect.any(Object),
}) {
    const recursiveElevation = new RecursiveElevation(elevation);
    describe(`testing container, detail, and frame lengths.`, () => {

        test(`Tests ${elevation.name} for correct containers, details, and frames`, () => {
            expect(recursiveElevation).toMatchObject({
                allContainers: {
                    length: containerCount,
                },
                allDetails: {
                    length: detailCount,
                },
                allFrames: {
                    length: frameCount,
                },
                roughOpening,
            });
        });
    });

    return recursiveElevation.rawElevation;
};

testElevationArrays({
    elevation: sample1,
    containerCount: 4,
    detailCount: 12,
    frameCount: 9,
});

testElevationArrays({
    elevation: sample2,
    containerCount: 9,
    detailCount: 26,
    frameCount: 14,
});
