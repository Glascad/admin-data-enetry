import RecursiveElevation from '../elevation';
import sample1 from '../../../__test__/sample-elevations/sample1.json';
import sample2 from '../../../__test__/sample-elevations/sample2.json';

export default function testElevation({ description, elevation }) {
    const sampleResult = new RecursiveElevation(elevation);
    describe(`${description} - Recursive elevation interface provides access to all necessary items through both arrays and objects by id`, () => {
        test("Provides access to all expected keys", () => {
            expect(sampleResult).toMatchObject({
                containerIds: expect.arrayContaining([expect.any(String)]),
                containers: expect.any(Object),
                allContainers: expect.arrayContaining([expect.any(RecursiveElevation.RecursiveContainer)]),
                detailIds: expect.arrayContaining([expect.any(String)]),
                details: expect.any(Object),
                allDetails: expect.any(Array),
                allFrames: expect.any(Array),
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
            elevation._elevationContainers.forEach(({ id = '', fakeId = '' }) => {
                expect(sampleResult.containers).toHaveProperty(`${id}` || `_${fakeId}`, expect.any(RecursiveElevation.RecursiveContainer));
            });
            elevation._containerDetails.forEach(({ id = '', fakeId = '' }) => {
                expect(sampleResult.details).toHaveProperty(`${id}` || `_${fakeId}`, expect.any(RecursiveElevation.RecursiveDetail));
            });
        });
    });

    describe(`${description} - Recursive elevation generates frames correctly`, () => {
        test("All \'existing\' details are assigned to a single frame", () => {

            // sampleResult.allFrames.forEach(_frame => sampleResult.allFrames.slice().forEach(otherFrame => {
            //     if (_frame !== otherFrame) {
            //         expect(_frame).toMatchObject({
            //             details: expect.not.arrayContaining(otherFrame.details),
            //         });
            //     }
            // }));
        });
        test("All non \'existing\' details are not assigned a frame", () => {
            sampleResult.allDetails.forEach(detail => {
                expect(!!detail._frame).toBe(!!detail.exists);
            });
        });
    });

    describe(`${description} - Recursive elevation generates container dimensions correctly`, () => {

    });

    describe(`${description} - Recursive elevation generates rough opening dimensions correctly`, () => {

    });
}

testElevation({
    description: sample1.name,
    elevation: sample1,
});

testElevation({
    description: sample2.name,
    elevation: sample2,
});
