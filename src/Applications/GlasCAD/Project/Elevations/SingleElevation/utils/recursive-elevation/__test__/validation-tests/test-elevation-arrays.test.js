import sample1 from '../../../../utils/sample-elevations/sample1.json';
import sample2 from '../../../../utils/sample-elevations/sample2.json';
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

        test(`${elevation.name} has correct number of containers`, () => {
            expect(recursiveElevation.allContainers).toHaveProperty('length', containerCount);
        });
        
        test(`${elevation.name} has correct number of details`, () => {
            expect(recursiveElevation.allDetails).toHaveProperty('length', detailCount);
        });

        test(`${elevation.name} has correct rough opening`, () => {
            expect(recursiveElevation.roughOpening).toMatchObject(roughOpening);
        });

        test(`${elevation.name} has correct number of frames`, () => {
            expect(recursiveElevation.allFrames).toHaveProperty('length', frameCount);
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
