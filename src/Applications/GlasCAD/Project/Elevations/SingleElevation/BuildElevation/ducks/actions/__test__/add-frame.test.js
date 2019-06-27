import sample3 from "../../../../__test__/sample-elevations/sample3.json";
import sample4 from "../../../../__test__/sample-elevations/sample4.json";
import sample5 from "../../../../__test__/sample-elevations/sample5.json";
import applyActionToElevation from "./apply-action.js";
import ADD_FRAME from "../add-frame";
import testElevation from '../../../../utils/recursive-elevation/__test__/validation-tests/index.test';
import testElevationArrays from '../../../../utils/recursive-elevation/__test__/validation-tests/test-elevation-arrays.test';


const testAddFrame = ({ elevation, distance, vertical, oldContainer, newContainer, expectedDetails, deletedDetails, elevationArrays }) => {

    const sampleResult = applyActionToElevation(elevation, ADD_FRAME, ({ containers: { [oldContainer.id]: container } }) => ({
        distance,
        vertical,
        container,
    }));

    testElevation({
        description: `${elevation.name} -add frame - oldContainerId: ${oldContainer.id}, distance: ${newContainer.id}`,
        elevation: sampleResult.rawElevation,
    });

    testElevationArrays({
        elevation: sampleResult.rawElevation, ...elevationArrays
    });

    describe(`${elevation.name} adds a new frame in container ${oldContainer}. Testing daylight opening, and details`, () => {
        test(`Testing ${elevation.name}'s ${oldContainer} and ${newContainer} for correct daylight opening and Id`, () => {
            expect(sampleResult).toMatchObject({
                containers: {
                    [newContainer.id]: newContainer,
                    [oldContainer.id]: oldContainer,
                },
            });
        });
        test(`Testing ${elevation.name} for correctly adding details`, () => {
            expect(sampleResult.allDetails).toMatchObject(
                expect.arrayContaining(
                    expectedDetails.map(detail =>
                        expect.objectContaining(detail),
                    )),
            );

        });
        test(`Testing ${elevation.name} for correctly deleting details`, () => {
            deletedDetails.forEach(detail => (
                expect(sampleResult.allDetails).toMatchObject(
                    expect.not.arrayContaining([
                        expect.objectContaining(detail),
                    ]),
                )
            ));
        });
        return sampleResult;
    });
};

// describe('', () => test('', () => expect(true).toBe(true)));

//Undefined ids do not work
//Sample4 Test1
testAddFrame({
    elevation: sample4,
    distance: 90,
    vertical: false,
    oldContainer: {
        id: 887,
        daylightOpening: {
            x: 185,
            y: 280,
        },
    },
    newContainer: {
        id: -10000,
        daylightOpening: {
            x: 185,
            y: 90,
        },
    },
    expectedDetails: [
        {
            firstContainerId: 887,
            secondContainerId: -10000,
        },
        {
            firstContainerId: 886,
            secondContainerId: -10000,
        },
    ],
    deletedDetails: [
    ],
});

// //Sample3 Test1
testAddFrame({
    elevation: sample3,
    distance: 30,
    vertical: false,
    oldContainer: {
        id: 805,
        daylightOpening: {
            x: 86.6666666666667,
            y: 210,
        },
    },
    newContainer: {
        // id: -100001,
        // daylightOpening: {
        //     x: 86.6666666666667,
        //     y: 30,
        // },
    },
    expectedDetails: [
        // {
        //     firstContainerId: 802,
        //     secondContainerId: -100001,
        // },
        // {
        //     firstContainerId: 805,
        //     secondContainerId: -100001,
        // },
        // {
        //     firstContainerId: -100001,
        //     secondContainerId: 807,
        // },
        // {
        //     firstContainerId: -100001,
        //     secondContainerId: 810,
        // },
    ],
    deletedDetails: [
        {
            firstContainerId: 805,
            secondContainerId: 807,
        },
    ],
});

// Sample3 Test2
// testAddFrame({
//     elevation: sample3,
//     distance: 55,
//     vertical: false,
//     oldContainer: {
//         id: 805,
//         daylightOpening: {
//             x: 86.6666666666667,
//             y: 185,
//         },
//     },
//     newContainer: {
//         id: -10002,
//         daylightOpening: {
//             x: 86.6666666666667,
//             y: 55,
//         },
//     },
//     expectedDetails: [
//         {
//             firstContainerId: 802,
//             secondContainerId: -10002,
//         },
//         {
//             firstContainerId: 805,
//             secondContainerId: -10002,
//         },
//         {
//             firstContainerId: -10002,
//             secondContainerId: 807,
//         },
//         {
//             firstContainerId: -10002,
//             secondContainerId: 810,
//         },
//     ],
//     deletedDetails: [
//         {
//             firstContainerId: 805,
//             secondContainerId: 807,
//         },
//         {
//             firstContainerId: 805,
//             secondContainerId: 810,
//         },
//     ],
// });

// //Sample3 Test3
// testAddFrame({
//     elevation: sample3,
//     distance: 60,
//     vertical: false,
//     oldContainer: {
//         id: 805,
//         daylightOpening: {
//             x: 86.6666666666667,
//             y: 180,
//         },
//     },
//     newContainer: {
//         id: -10003,
//         daylightOpening: {
//             x: 86.6666666666667,
//             y: 60,
//         },
//     },
//     expectedDetails: [
//         {
//             firstContainerId: 802,
//             secondContainerId: -10003,
//         },
//         {
//             firstContainerId: 805,
//             secondContainerId: -10003,
//         },
//         {
//             firstContainerId: -10003,
//             secondContainerId: 807,
//         },
//         {
//             firstContainerId: -10003,
//             secondContainerId: 810,
//         },
//     ],
//     deletedDetails: [
//         {
//             firstContainerId: 805,
//             secondContainerId: 807,
//         },
//         {
//             firstContainerId: 805,
//             secondContainerId: 810,
//         },
//     ],
// });

// //Sample3 Test4
// testAddFrame({
//     elevation: sample3,
//     distance: 65,
//     vertical: false,
//     oldContainer: {
//         id: 805,
//         daylightOpening: {
//             x: 86.6666666666667,
//             y: 175,
//         },
//     },
//     newContainer: {
//         id: -10004,
//         daylightOpening: {
//             x: 86.6666666666667,
//             y: 65,
//         },
//     },
//     expectedDetails: [
//         {
//             firstContainerId: 802,
//             secondContainerId: -10004,
//         },
//         {
//             firstContainerId: 805,
//             secondContainerId: -10004,
//         },
//         {
//             firstContainerId: -10004,
//             secondContainerId: 807,
//         },
//         {
//             firstContainerId: -10004,
//             secondContainerId: 810,
//         },
//     ],
//     deletedDetails: [
//         {
//             firstContainerId: 805,
//             secondContainerId: 807,
//         },
//         {
//             firstContainerId: 805,
//             secondContainerId: 810,
//         },
//         {
//             firstContainerId: -10004,
//             secondContainerId: 809,
//         },
//     ],
// });

// //Sample3 Test5
// testAddFrame({
//     elevation: sample3,
//     distance: 120,
//     vertical: false,
//     oldContainer: {
//         id: 805,
//         daylightOpening: {
//             x: 86.6666666666667,
//             y: 120,
//         },
//     },
//     newContainer: {
//         id: -10005,
//         daylightOpening: {
//             x: 86.6666666666667,
//             y: 120,
//         },
//     },
//     expectedDetails: [
//         {
//             firstContainerId: 802,
//             secondContainerId: -10005,
//         },
//         {
//             firstContainerId: 805,
//             secondContainerId: -10005,
//         },
//         {
//             firstContainerId: -10005,
//             secondContainerId: 807,
//         },
//         {
//             firstContainerId: -10005,
//             secondContainerId: 810,
//         },
//         {
//             firstContainerId: -10005,
//             secondContainerId: 809,
//         },
//     ],
//     deletedDetails: [
//         {
//             firstContainerId: 805,
//             secondContainerId: 807,
//         },
//         {
//             firstContainerId: 805,
//             secondContainerId: 810,
//         },
//         {
//             firstContainerId: 802,
//             secondContainerId: 805,
//         },
//     ],
// });

// //Sample3 Test6
// testAddFrame({
//     elevation: sample3,
//     distance: 180,
//     vertical: false,
//     oldContainer: {
//         id: 805,
//         daylightOpening: {
//             x: 86.6666666666667,
//             y: 60,
//         },
//     },
//     newContainer: {
//         id: -10006,
//         daylightOpening: {
//             x: 86.6666666666667,
//             y: 180,
//         },
//     },
//     expectedDetails: [
//         {
//             firstContainerId: 802,
//             secondContainerId: -10006,
//         },
//         {
//             firstContainerId: 805,
//             secondContainerId: -10006,
//         },
//         {
//             firstContainerId: -10006,
//             secondContainerId: 807,
//         },
//         {
//             firstContainerId: -10006,
//             secondContainerId: 810,
//         },
//         {
//             firstContainerId: -10006,
//             secondContainerId: 809,
//         },
//         {
//             firstContainerId: 801,
//             secondContainerId: -10006,
//         },
//     ],
//     deletedDetails: [
//         {
//             firstContainerId: 805,
//             secondContainerId: 807,
//         },
//         {
//             firstContainerId: 805,
//             secondContainerId: 810,
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
//             firstContainerId: 805,
//             secondContainerId: 809,
//         },
//     ],
// });

// //Sample5 Test1
// testAddFrame({
//     elevation: sample5,
//     distance: 85,
//     vertical: true,
//     oldContainer: {
//         id: 890,
//         daylightOpening: {
//             x: 285,
//             y: 185,
//         },
//     },
//     newContainer: {
//         id: -10007,
//         daylightOpening: {
//             x: 85,
//             y: 185,
//         },
//     },
//     expectedDetails: [
//         {
//             firstContainerId: 890,
//             secondContainerId: -10007,
//         },
//         {
//             firstContainerId: 893,
//             secondContainerId: -10007,
//         },
//     ],
//     deletedDetails: [

//     ],
// });

// //Sample5 Test2
// testAddFrame({
//     elevation: sample5,
//     distance: 180,
//     vertical: true,
//     oldContainer: {
//         id: 890,
//         daylightOpening: {
//             x: 190,
//             y: 185,
//         },
//     },
//     newContainer: {
//         id: -10008,
//         daylightOpening: {
//             x: 180,
//             y: 185,
//         },
//     },
//     expectedDetails: [
//         {
//             firstContainerId: 890,
//             secondContainerId: -10008,
//         },
//         {
//             firstContainerId: 893,
//             secondContainerId: -10008,
//         },
//     ],
//     deletedDetails: [
//         {
//             firstContainerId: 893,
//             secondContainerId: 890,
//         },

//     ],
// });

// //Sample5 Test3
// testAddFrame({
//     elevation: sample5,
//     distance: 185,
//     vertical: true,
//     oldContainer: {
//         id: 890,
//         daylightOpening: {
//             x: 185,
//             y: 185,
//         },
//     },
//     newContainer: {
//         id: -100000,
//         daylightOpening: {
//             x: 185,
//             y: 185,
//         },
//     },
//     expectedDetails: [
//         {
//             firstContainerId: 890,
//             secondContainerId: -100000,
//         },
//         {
//             firstContainerId: 893,
//             secondContainerId: -100000,
//         },
//     ],
//     deletedDetails: [
//         {
//             firstContainerId: 893,
//             secondContainerId: 890,
//         },

//     ],
//     elevationArrays: {
//         containerCount: 4,
//         detailCount: 12,
//         frameCount: 9,
//     }
// });

// //Sample5 Test4
// testAddFrame({
//     elevation: sample5,
//     distance: 190,
//     vertical: true,
//     oldContainer: {
//         id: 890,
//         daylightOpening: {
//             x: 180,
//             y: 185,
//         },
//     },
//     newContainer: {
//         id: -100001,
//         daylightOpening: {
//             x: 190,
//             y: 185,
//         },
//     },
//     expectedDetails: [
//         {
//             firstContainerId: 890,
//             secondContainerId: -100001,
//         },
//         {
//             firstContainerId: 893,
//             secondContainerId: -100001,
//         },
//     ],
//     deletedDetails: [
//         {
//             firstContainerId: 893,
//             secondContainerId: 890,
//         },

//     ],
//     elevationArrays: {
//         containerCount: 4,
//         detailCount: 12,
//         frameCount: 9,
//     }
// });

// //Sample5 Test5
// testAddFrame({
//     elevation: sample5,
//     distance: 285,
//     vertical: true,
//     oldContainer: {
//         id: 890,
//         daylightOpening: {
//             x: 85,
//             y: 185,
//         },
//     },
//     newContainer: {
//         id: -10009,
//         daylightOpening: {
//             x: 285,
//             y: 185,
//         },
//     },
//     expectedDetails: [
//         {
//             firstContainerId: 890,
//             secondContainerId: -10009,
//         },
//         {
//             firstContainerId: 893,
//             secondContainerId: -10009,
//         },
//         {
//             firstContainerId: 889,
//             secondContainerId: -10009,
//         },
//     ],
//     deletedDetails: [
//         {
//             firstContainerId: 893,
//             secondContainerId: 890,
//         },
//     ],

//     elevationArrays: {
//         containerCount: 4,
//         detailCount: 13,
//         frameCount: 9,
//     }

// });
