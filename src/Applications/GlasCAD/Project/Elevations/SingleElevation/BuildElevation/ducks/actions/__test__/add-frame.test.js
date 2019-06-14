import sample1 from "../../../../__test__/sample-elevations/sample1.json";
import sample2 from "../../../../__test__/sample-elevations/sample2.json";
import sample3 from "../../../../__test__/sample-elevations/sample3.json";
import sample4 from "../../../../__test__/sample-elevations/sample4.json";
import applyActionToElevation from "./apply-action.js";
import ADD_FRAME from "../add-frame";
import testElevation from '../../../../utils/recursive-elevation/__test__/validation-tests/index.test';

const testAddFrame = ({ elevation, distance, vertical, oldContainer, newContainer, expectedDetails, deletedDetails }) => {

    const sampleResult = applyActionToElevation(elevation, ADD_FRAME, ({ containers: { [oldContainer.id]: container } }) => ({
        distance,
        vertical,
        container,
    }));

    testElevation({
        description: `${elevation.name} -add frame - oldContainerId: ${oldContainer.id}, distance: ${newContainer.id}`,
        elevation: sampleResult.rawElevation,
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
        id: -1,
        daylightOpening: {
            x: 185,
            y: 90,
        },
    },
    expectedDetails: [
        {
            firstContainerId: 887,
            secondContainerId: -1,
        },
        {
            firstContainerId: 886,
            secondContainerId: -1,
        },
    ],
    deletedDetails: [
    ],
});

//Sample3 Test1
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
        id: -2,
        daylightOpening: {
            x: 86.6666666666667,
            y: 30,
        },
    },
    expectedDetails: [
        {
            firstContainerId: 802,
            secondContainerId: -2,
        },
        {
            firstContainerId: 805,
            secondContainerId: -2,
        },
        {
            firstContainerId: -2,
            secondContainerId: 807,
        },
        {
            firstContainerId: -2,
            secondContainerId: 810,
        },
    ],
    deletedDetails: [
        {
            firstContainerId: 805,
            secondContainerId: 807,
        },
    ],
});
//Sample3 Test2
testAddFrame({
    elevation: sample3,
    distance: 55,
    vertical: false,
    oldContainer: {
        id: 805,
        daylightOpening: {
            x: 86.6666666666667,
            y: 185,
        },
    },
    newContainer: {
        id: -3,
        daylightOpening: {
            x: 86.6666666666667,
            y: 55,
        },
    },
    expectedDetails: [
        {
            firstContainerId: 802,
            secondContainerId: -3,
        },
        {
            firstContainerId: 805,
            secondContainerId: -3,
        },
        {
            firstContainerId: -3,
            secondContainerId: 807,
        },
        {
            firstContainerId: -3,
            secondContainerId: 810,
        },
    ],
    deletedDetails: [
        {
            firstContainerId: 805,
            secondContainerId: 807,
        },
        {
            firstContainerId: 805,
            secondContainerId: 810,
        },
    ],
});

//Sample3 Test3
testAddFrame({
    elevation: sample3,
    distance: 60,
    vertical: false,
    oldContainer: {
        id: 805,
        daylightOpening: {
            x: 86.6666666666667,
            y: 180,
        },
    },
    newContainer: {
        id: -4,
        daylightOpening: {
            x: 86.6666666666667,
            y: 60,
        },
    },
    expectedDetails: [
        {
            firstContainerId: 802,
            secondContainerId: -4,
        },
        {
            firstContainerId: 805,
            secondContainerId: -4,
        },
        {
            firstContainerId: -4,
            secondContainerId: 807,
        },
        {
            firstContainerId: -4,
            secondContainerId: 810,
        },
    ],
    deletedDetails: [
        {
            firstContainerId: 805,
            secondContainerId: 807,
        },
        {
            firstContainerId: 805,
            secondContainerId: 810,
        },
    ],
});

//Sample3 Test4
testAddFrame({
    elevation: sample3,
    distance: 65,
    vertical: false,
    oldContainer: {
        id: 805,
        daylightOpening: {
            x: 86.6666666666667,
            y: 175,
        },
    },
    newContainer: {
        id: -5,
        daylightOpening: {
            x: 86.6666666666667,
            y: 65,
        },
    },
    expectedDetails: [
        {
            firstContainerId: 802,
            secondContainerId: -5,
        },
        {
            firstContainerId: 805,
            secondContainerId: -5,
        },
        {
            firstContainerId: -5,
            secondContainerId: 807,
        },
        {
            firstContainerId: -5,
            secondContainerId: 810,
        },
    ],
    deletedDetails: [
        {
            firstContainerId: 805,
            secondContainerId: 807,
        },
        {
            firstContainerId: 805,
            secondContainerId: 810,
        },
        //This one has an error
        {
            firstContainerId: -5,
            secondContainerId: 809,
        },
    ],
});

//Sample3 Test5
testAddFrame({
    elevation: sample3,
    distance: 120,
    vertical: false,
    oldContainer: {
        id: 805,
        daylightOpening: {
            x: 86.6666666666667,
            y: 120,
        },
    },
    newContainer: {
        id: -6,
        daylightOpening: {
            x: 86.6666666666667,
            y: 120,
        },
    },
    expectedDetails: [
        {
            firstContainerId: 802,
            secondContainerId: -6,
        },
        {
            firstContainerId: 805,
            secondContainerId: -6,
        },
        {
            firstContainerId: -6,
            secondContainerId: 807,
        },
        {
            firstContainerId: -6,
            secondContainerId: 810,
        },
        {
            firstContainerId: -6,
            secondContainerId: 809,
        },
    ],
    deletedDetails: [
        {
            firstContainerId: 805,
            secondContainerId: 807,
        },
        {
            firstContainerId: 805,
            secondContainerId: 810,
        },
        {
            firstContainerId: 802,
            secondContainerId: 805,
        },
    ],
});

//Sample3 Test6
testAddFrame({
    elevation: sample3,
    distance: 180,
    vertical: false,
    oldContainer: {
        id: 805,
        daylightOpening: {
            x: 86.6666666666667,
            y: 60,
        },
    },
    newContainer: {
        id: -7,
        daylightOpening: {
            x: 86.6666666666667,
            y: 180,
        },
    },
    expectedDetails: [
        {
            firstContainerId: 802,
            secondContainerId: -7,
        },
        {
            firstContainerId: 805,
            secondContainerId: -7,
        },
        {
            firstContainerId: -7,
            secondContainerId: 807,
        },
        {
            firstContainerId: -7,
            secondContainerId: 810,
        },
        {
            firstContainerId: -7,
            secondContainerId: 809,
        },
        {
            firstContainerId: 801,
            secondContainerId: -7,
        },
    ],
    deletedDetails: [
        {
            firstContainerId: 805,
            secondContainerId: 807,
        },
        {
            firstContainerId: 805,
            secondContainerId: 810,
        },
        {
            firstContainerId: 802,
            secondContainerId: 805,
        },
        {
            firstContainerId: 801,
            secondContainerId: 805,
        },
        {
            firstContainerId: 805,
            secondContainerId: 809,
        },
    ],
});

