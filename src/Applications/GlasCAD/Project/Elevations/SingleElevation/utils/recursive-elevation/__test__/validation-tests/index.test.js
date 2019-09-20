import RecursiveElevation from '../../elevation';
import sample1 from '../../../../utils/sample-elevations/sample1.json';
import sample2 from '../../../../utils/sample-elevations/sample2.json';
import sample3ERROR from '../../../../utils/sample-elevations/sample3-error.json';

export default function testElevation({ description, elevation }) {
    const sampleResult = new RecursiveElevation(elevation);

    describe(`${description} - Recursive elevation interface provides access to all necessary items through both arrays and objects by id`, () => {
        test("Provides access to all expected keys", () => {
            expect(sampleResult).toMatchObject({
                containerIds: expect.any(Array),
                containers: expect.any(Object),
                allContainers: expect.any(Array),
                detailIds: expect.any(Array),
                details: expect.any(Object),
                allDetails: expect.any(Array),
                originalContainer: expect.any(RecursiveElevation.RecursiveContainer),
                sightline: expect.any(Number),
                minimumDaylightOpening: expect.any(Number),
                roughOpening: {
                    x: expect.any(Number),
                    y: expect.any(Number),
                },
                rawElevation: elevation,
            });
        });

        test("Container and detail ids in array match ids in objects", () => {
            expect(Object.keys(sampleResult.containers).slice().sort()).toEqual(sampleResult.containerIds.slice().sort());
            expect(Object.keys(sampleResult.details).slice().sort()).toEqual(sampleResult.detailIds.slice().sort());
        });

        test("Elevation contains all containers and all details", () => {
            elevation._elevationContainers.forEach(({ id }) => {
                expect(sampleResult.containers).toHaveProperty(`${id}`, expect.any(RecursiveElevation.RecursiveContainer));
            });
            elevation._containerDetails.forEach(({ id }) => {
                expect(sampleResult.details).toHaveProperty(`${id}`, expect.any(RecursiveElevation.RecursiveDetail));
            });
        });
    });

    describe(`${description} - Recursive elevation generates frames correctly`, () => {
        test("Elevation successfully generates frames", () => {
            expect(sampleResult).toMatchObject({
                allFrames: expect.any(Array),
            });
        });
        test("All existing and non-existing details are assigned to a single frame", () => {
            sampleResult.allFrames.forEach(
                _frame => sampleResult.allFrames.slice().forEach(
                    otherFrame => {
                        if (_frame !== otherFrame) {
                            expect(_frame).toMatchObject({
                                details: expect.not.arrayContaining(
                                    otherFrame.details.map(
                                        detail => expect.objectContaining(detail),
                                    ),
                                ),
                            });
                        }
                    },
                ),
            );
        });
        test("All non \'existing\' details are not assigned a frame", () => {
            sampleResult.allDetails.forEach(detail => {
                expect(!!detail._frame).toBe(true);
            });
        });
    });

    describe(`${description} - Recursive elevation generates container dimensions correctly`, () => {

    });

    describe(`${description} - Recursive elevation generates rough opening dimensions correctly`, () => {

    });

    return sampleResult.rawElevation;
}

testElevation({
    description: sample1.name,
    elevation: sample1,
});

testElevation({
    description: sample2.name,
    elevation: sample2,
});

// testElevation({
//     description: "ERROR",
//     elevation: sample3ERROR,
// });
