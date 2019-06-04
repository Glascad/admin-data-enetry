import applyActionToElevation from "./apply-action";
import MOVE_FRAME from "../move-frame";
import sample1 from "../../../../__test__/sample-elevations/sample1.json";
import sample2 from "../../../../__test__/sample-elevations/sample2.json";
import { DIRECTIONS } from "../../../../utils/recursive-elevation/directions";
import testElevation from '../../../../utils/recursive-elevation/__test__/validation-tests/index.test';

const testMoveFrame = ({ elevation, detailId, distance, expectedDetails, deletedDetails, daylightOpenings }) => {
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

testMoveFrame({
    elevation: sample2,
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

