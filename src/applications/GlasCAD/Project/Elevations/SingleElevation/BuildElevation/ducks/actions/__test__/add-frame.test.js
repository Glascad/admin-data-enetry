import sample1 from "../../../../__test__/sample-elevations/sample1.json";
import sample2 from "../../../../__test__/sample-elevations/sample2.json";
import applyActionToElevation from "./apply-action.js";
import ADD_FRAME from "../add-frame";

const testAddFrame = ({ elevation, distance, vertical, oldContainer, newContainer, expectedDetails, deletedDetails }) => {

    const sampleResult = applyActionToElevation(elevation, ADD_FRAME, ({ containers: { [oldContainer.id]: container } }) => ({
        distance,
        vertical,
        container,
    }));

    // testElevation({
    //     description: `${elevation.name} -add frame - oldContainerId: ${oldContainer.id}, distance: ${newContainer.id}`,
    //     elevation: sampleResult.rawElevation,
    // });

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
            deletedDetails.map(detail => {
                expect(sampleResult.allDetails).toMatchObject(
                    expect.not.arrayContaining([
                        expect.objectContaining(detail),
                    ]),
                );
            });
        });
        return sampleResult;
    });
};

describe('', () => test('', () => expect(true).toBe(true)));

testAddFrame({
    elevation: sample1,
    distance: 50,
    vertical: true,
    oldContainer: {
        id: 708,
        daylightOpening: {
            x: 50,
            y: 230,
        },
    },
    newContainer: {
        id: -1,
        daylightOpening: {
            x: 175,
            y: 230,
        },
    },
    expectedDetails: [
        {
            firstContainerId: 708,
            secondContainerId: -1,
        },
        {
            firstContainerId: -1,
            secondContainerId: 710,
        },
        {
            firstContainerId: 707,
            secondContainerId: -1,
        },
        {
            firstContainerId: -1,
            secondContainerId: undefined,
        }

    ],
    deletedDetails: [
        {
            firstContainerId: 708,
            secondContainerId: 710,
        },

    ],
});

