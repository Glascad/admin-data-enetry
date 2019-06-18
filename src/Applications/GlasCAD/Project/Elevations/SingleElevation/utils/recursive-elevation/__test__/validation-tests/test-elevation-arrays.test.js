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
    describe(`testing container and detail lengths.`, () => {

        test(`Tests ${elevation.name} for correct containers and details`, () => {
            expect(recursiveElevation).toMatchObject({
                allContainers: {
                    length: containerCount,
                },
                allDetails: {
                    length: detailCount,
                },
                roughOpening,
            });
        });

        test(`Tests ${elevation.name} for correct frame length`, () => {
            expect(recursiveElevation).toMatchObject({
                allFrames: {
                    length: frameCount,
                },
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
    // roughOpening: sample1.roughOpening,
});

testElevationArrays({
    elevation: sample2,
    containerCount: 9,
    detailCount: 26,
    frameCount: 14,
    // roughOpening: sample1.roughOpening,
});