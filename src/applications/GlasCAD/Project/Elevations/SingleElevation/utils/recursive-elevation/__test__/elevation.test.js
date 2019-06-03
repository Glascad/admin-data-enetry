import RecursiveElevation from '../elevation';
import sample1 from '../../../__test__/sample-elevations/sample1.json';
import sample2 from '../../../__test__/sample-elevations/sample2.json';

const testElevation = sampleElevation => {
    const elevation = new RecursiveElevation(sampleElevation);
    describe('Recursive elevation interface provides access to all necessary items through both arrays and objects by id', () => {
        test('Provides access to all expected keys', () => {
            expect(elevation).toMatchObject({
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
                rawElevation: sampleElevation,
            });
        });
        test('Container and detail ids in array match ids in objects', () => {
            expect(Object.keys(elevation.containers).slice().sort()).toEqual(elevation.containerIds.slice().sort());
            expect(Object.keys(elevation.details).slice().sort()).toEqual(elevation.detailIds.slice().sort());
        });
        test('Elevation contains all containers and all details', () => {
            sampleElevation._elevationContainers.forEach(({ id, fakeId }) => {
                expect(elevation.containers).toHaveProperty(`${id}` || `_${fakeId}`, expect.any(RecursiveElevation.RecursiveContainer));
            });
            sampleElevation._containerDetails.forEach(({ id, fakeId }) => {
                expect(elevation.details).toHaveProperty(`${id}` || `_${fakeId}`, expect.any(RecursiveElevation.RecursiveDetail));
            });
        });
    });

    describe('Recursive elevation generates frames correctly', () => {
        test('All \'existing\' details are assigned to a single frame', () => {
            elevation.allFrames.forEach(_frame => elevation.allFrames.slice().forEach(otherFrame => {
                if (_frame !== otherFrame) {
                    expect(_frame).toMatchObject({
                        details: expect.not.arrayContaining(otherFrame.details),
                    });
                }
            }));
        });
        test('All non \'existing\' details are not assigned a frame', () => {
            elevation.allDetails.forEach(detail => {
                expect(!!detail._frame).toBe(!!detail.exists);
            });
        });
    });

    describe('Recursive elevation generates container dimensions correctly', () => {

    });

    describe('Recursive elevation generates rough opening dimensions correctly', () => {

    });
}

testElevation(sample1);
testElevation(sample2);
