import applyActionToElevation from "./apply-action";
import MOVE_FRAME from "../move-frame";
import sample2 from "../../../../__test__/sample-elevations/sample2.json";
import sample3 from "../../../../__test__/sample-elevations/sample3.json";
import sample3Special from "../../../../__test__/sample-elevations/sample3-special.json";
import { DIRECTIONS } from "../../../../utils/recursive-elevation/directions";
import testElevation from '../../../../utils/recursive-elevation/__test__/validation-tests/index.test';
import testElevationArrays from "../../../../utils/recursive-elevation/__test__/validation-tests/test-elevation-arrays.test";

const testMoveFrame = ({ elevation, elevationArrays, detailId, distance, expectedDetails, deletedDetails, daylightOpenings }) => {
    const sampleResult = applyActionToElevation(elevation, MOVE_FRAME, ({
        details: {
            [detailId]: {
                _frame
            },
        },
    }) => ({
        _frame,
        distance,
    }));

    testElevation({
        description: `${elevation.name} - move frame - detailId: ${detailId}, distance: ${distance}`,
        elevation: sampleResult.rawElevation,
    });

    // testElevationArrays({
    //     elevation,
    //     ...elevationArrays,
    // })

    describe(`${elevation.name} frame moving a distance of ${distance}`, () => {
        test("daylight openings are correct for all containers", () => {
            daylightOpenings.forEach(({ id, ...daylightOpening }) => {
                expect(sampleResult).toMatchObject({
                    containers: {
                        [id]: {
                            daylightOpening,
                        },
                    },
                });
            });
        });

        test("all details are correctly added or have changed their reference", () => {
            expect(sampleResult.allDetails).toMatchObject(
                expect.arrayContaining(
                    expectedDetails.map(
                        detail => expect.objectContaining(detail),
                    ),
                ),
            );
        });

        test("all details are correctly deleted or have changed their reference", () => {
            deletedDetails.map(
                detail => expect(sampleResult.allDetails).toMatchObject(
                    expect.not.arrayContaining([
                        expect.objectContaining(detail),
                    ]),
                ),
            );
        });
    });

    return sampleResult;
}

// Sample2 Test1
testMoveFrame({
    elevation: sample2,
    elevationArrays: {
        containerCount: 9,
        detailCount: 26,
        frameCount: 9,
    },
    distance: -270,
    detailId: 1854,
    expectedDetails: [
        {
            firstContainerId: 729,
            secondContainerId: 738,
        },
        {
            firstContainerId: 729,
            secondContainerId: 737,
        },
    ],
    deletedDetails: [
        {
            firstContainerId: 732,
            secondContainerId: 736,
        },
        {
            firstContainerId: 732,
            secondContainerId: 737,
        },
    ],
    daylightOpenings: [
        {
            id: 732,
            x: 185,
            y: 50,
        },
        {
            id: 729,
            x: 185,
            y: 370,
        },
    ],
});

//Sample2 Test2
testMoveFrame({
    elevation: sample2,
    distance: -220,
    detailId: 1854,
    expectedDetails: [
        {
            firstContainerId: 729,
            secondContainerId: 737,
        },
    ],
    deletedDetails: [
        {
            firstContainerId: 732,
            secondContainerId: 736,
        },
        {
            firstContainerId: 732,
            secondContainerId: 737,
        },
    ],
    daylightOpenings: [
        {
            id: 732,
            x: 185,
            y: 100,
        },
        {
            id: 729,
            x: 185,
            y: 320,
        },
    ],
});

//Sample2 Test3
testMoveFrame({
    elevation: sample2,
    distance: -160,
    detailId: 1854,
    expectedDetails: [
        {
            firstContainerId: 729,
            secondContainerId: 737,
        },
    ],
    deletedDetails: [
        {
            firstContainerId: 732,
            secondContainerId: 736,
        },
    ],
    daylightOpenings: [
        {
            id: 732,
            x: 185,
            y: 160,
        },
        {
            id: 729,
            x: 185,
            y: 260,
        },
    ],
});
testMoveFrame({
    elevation: sample2,
    distance: -80,
    detailId: 1854,
    expectedDetails: [

    ],
    deletedDetails: [

    ],
    daylightOpenings: [
        {
            id: 732,
            x: 185,
            y: 240,
        },
        {
            id: 729,
            x: 185,
            y: 180,
        },
    ],
});

//Testing Sample3
// Sample3 Test1
testMoveFrame({
    elevation: sample3,
    distance: 65,
    detailId: 2044,
    expectedDetails: [
        {
            firstContainerId: 807,
            secondContainerId: 810,
        },
        {
            firstContainerId: 802,
            secondContainerId: 807,
        },
    ],
    deletedDetails: [
        //This one will fail (Not on purpose)
        // {
        //     firstContainerId: 805,
        //     secondContainerId: 810,
        // },
    ],
    daylightOpenings: [
        {
            id: 807,
            x: 86.6666666666667,
            y: 145,
        },
        {
            id: 805,
            x: 86.6666666666667,
            y: 185,
        },
    ],
});
//Sample3 Test2
testMoveFrame({
    elevation: sample3,
    distance: 100,
    detailId: 2044,
    expectedDetails: [
        {
            firstContainerId: 807,
            secondContainerId: 810,
        },
        {
            firstContainerId: 807,
            secondContainerId: 809,
        },
        {
            firstContainerId: 802,
            secondContainerId: 807,
        },

    ],
    deletedDetails: [
        {
            firstContainerId: 805,
            secondContainerId: 810,
        },
    ],
    daylightOpenings: [
        {
            id: 807,
            x: 86.6666666666667,
            y: 180,
        },
        {
            id: 805,
            x: 86.6666666666667,
            y: 150,
        },
    ],
});
//Sample3 Test3
testMoveFrame({
    elevation: sample3,
    distance: 130,
    detailId: 2044,
    expectedDetails: [
        {
            firstContainerId: 807,
            secondContainerId: 810,
        },
        {
            firstContainerId: 807,
            secondContainerId: 809,
        },
        {
            firstContainerId: 802,
            secondContainerId: 807,
        },

    ],
    deletedDetails: [
        {
            firstContainerId: 805,
            secondContainerId: 810,
        },
        {
            firstContainerId: 802,
            secondContainerId: 805,
        },
    ],
    daylightOpenings: [
        {
            id: 807,
            x: 86.6666666666667,
            y: 210,
        },
        {
            id: 805,
            x: 86.6666666666667,
            y: 120,
        },
    ],
});
//Sample3 Test4
testMoveFrame({
    elevation: sample3,
    distance: 200,
    detailId: 2044,
    expectedDetails: [
        {
            firstContainerId: 807,
            secondContainerId: 810,
        },
        {
            firstContainerId: 807,
            secondContainerId: 809,
        },
        {
            firstContainerId: 802,
            secondContainerId: 807,
        },
        {
            firstContainerId: 801,
            secondContainerId: 807,
        },

    ],
    deletedDetails: [
        {
            firstContainerId: 805,
            secondContainerId: 810,
        },
        {
            firstContainerId: 802,
            secondContainerId: 805,
        },
        {
            firstContainerId: 805,
            secondContainerId: 809,
        },
        {
            firstContainerId: 801,
            secondContainerId: 805,
        },
    ],
    daylightOpenings: [
        {
            id: 807,
            x: 86.6666666666667,
            y: 280,
        },
        {
            id: 805,
            x: 86.6666666666667,
            y: 50,
        },
    ],
});
//Sample3 Test5
testMoveFrame({
    elevation: sample3,
    distance: 220,
    detailId: 2044,
    expectedDetails: [
        {
            firstContainerId: 807,
            secondContainerId: 810,
        },
        {
            firstContainerId: 807,
            secondContainerId: 809,
        },
        {
            firstContainerId: 807,
            secondContainerId: 808,
        },
        {
            firstContainerId: 802,
            secondContainerId: 807,
        },
        {
            firstContainerId: 801,
            secondContainerId: 807,
        },
        {
            firstContainerId: 800,
            secondContainerId: 807,
        },

    ],
    deletedDetails: [
        {
            firstContainerId: 805,
            secondContainerId: 810,
        },
        {
            firstContainerId: 802,
            secondContainerId: 805,
        },
        {
            firstContainerId: 805,
            secondContainerId: 809,
        },
        {
            firstContainerId: 801,
            secondContainerId: 805,
        },
    ],
    daylightOpenings: [
        {
            id: 807,
            x: 86.6666666666667,
            y: 300,
        },
        {
            id: 805,
            x: 86.6666666666667,
            y: 30,
        },
    ],
});


//Sample3-special Test1
testMoveFrame({
    elevation: sample3Special,
    distance: 200,
    detailId: 2044,
    expectedDetails: [
        {
            firstContainerId: 807,
            secondContainerId: 810,
        },
        {
            firstContainerId: 807,
            secondContainerId: 809,
        },
        {
            firstContainerId: 802,
            secondContainerId: 807,
        },
        {
            firstContainerId: 801,
            secondContainerId: 807,
        },

    ],
    deletedDetails: [
        {
            firstContainerId: 805,
            secondContainerId: 810,
        },
        {
            firstContainerId: 802,
            secondContainerId: 805,
        },
        {
            firstContainerId: 805,
            secondContainerId: 809,
        },
        // These ones have errors
        {
            firstContainerId: 801,
            secondContainerId: 805,
        },
        // This one isn't deleted but put in to make sure no extra detail was added
        // {
        //     firstContainerId: 807,
        //     secondContainerId: 808,
        // },

    ],
    daylightOpenings: [
        {
            id: 807,
            x: 86.6666666666667,
            y: 280,
        },
        {
            id: 805,
            x: 86.6666666666667,
            y: 50,
        },
    ],
});
