import sample3 from '../../../../__test__/sample-elevations/sample3.json'
import RecursiveElevation from '../../../../utils/recursive-elevation/elevation.js';

describe('', () => test('', () => { }));

const testAddBay = ({ elevation, deletedDetails, expectedDetails, addBayFirst, expectedDlo, expectedRO, containerId, expectedContainerId }) => {

    const sampleResult = applyActionToElevation(elevation, ADD_BAY, ({containerId, addBayFirst}) => ({
        container,
    }));
    // const sampleResult = new RecursiveElevation(elevation);

    const {
        containers: {
            [expectedContainerId]: {
                daylightOpening: dlo
            }
        },
        roughOpening,
    } = sampleResult;


    describe(`${elevation.name} add-bay tests for DLO, created details, and deleted details.`, () => {

        expectedDetails.forEach(detail => (
            test(`Testing ${elevation.name} for correctly adding detail with firstContainer: ${detail.firstContainer} and secondContainer ${detail.secondContainer}`, () => {
                expect(sampleResult.allDetails).toMatchObject(
                    expect.arrayContaining([
                        expect.objectContaining(detail),
                    ]),
                )
            })
        ));
        deletedDetails.forEach(detail => (
            test(`Testing ${elevation.name} for correctly deleting detail with firstContainer: ${detail.firstContainer} and secondContainer ${detail.secondContainer}`, () => {
                expect(sampleResult.allDetails).toMatchObject(
                    expect.not.arrayContaining([
                        expect.objectContaining(detail),
                    ]),
                )
            })
        ));

        test(`${elevation.name} new bays DLO is x:${expectedDlo.x} y:${expectedDlo.y}`, () => {
            expect(dlo.x).toEqual(expectedDlo.x);
            expect(dlo.y).toEqual(expectedDlo.y);
        });
        
        test(`${elevation.name} new bays Rough Opening is x:${expectedRO.x} y:${expectedRO.y}`, () => {
            expect(roughOpening.x).toEqual(expectedRO.x);
            expect(roughOpening.y).toEqual(expectedRO.y);
        });
    });
}



// testAddBay({
//     elevation: sample3,
//     containerId: 805,
//     expectedContainerId: -1,
//     addBayFirst: true,
//     expectedDlo: {
//         x: 86.6666666666667,
//         y: 380,
//     },
//     expectedRO: {
//         x: 396.666666666667,
//         y: 380,
//     },
//     expectedDetails: [
//         {
//             firstContainerId: 803,
//             secondContainerId: -1,
//         },
//         {
//             firstContainerId: 802,
//             secondContainerId: -1,
//         },
//         {
//             firstContainerId: 801,
//             secondContainerId: -1,
//         },
//         {
//             firstContainerId: 800,
//             secondContainerId: -1,
//         },
//         {
//             firstContainerId: -1,
//             secondContainerId: 811,
//         },
//         {
//             firstContainerId: -1,
//             secondContainerId: 810,
//         },
//         {
//             firstContainerId: -1,
//             secondContainerId: 809,
//         },
//         {
//             firstContainerId: -1,
//             secondContainerId: 808,
//         },
//     ],
//     deletedDetails: [
//         {
//             firstContainerId: 803,
//             secondContainerId: 807,
//         },
//         {
//             firstContainerId: 802,
//             secondContainerId: 805,
//         },
//         {
//             firstContainerId: 801,
//             secondContainerId: 805,
//         },
//         {
//             firstContainerId: 800,
//             secondContainerId: 805,
//         },
//         {
//             firstContainerId: 800,
//             secondContainerId: 804,
//         },
//         {
//             firstContainerId: 807,
//             secondContainerId: 811,
//         },
//         {
//             firstContainerId: 805,
//             secondContainerId: 810,
//         },
//         {
//             firstContainerId: 805,
//             secondContainerId: 809,
//         },
//         {
//             firstContainerId: 805,
//             secondContainerId: 808,
//         },
//         {
//             firstContainerId: 804,
//             secondContainerId: 808,
//         },
//     ],
// });