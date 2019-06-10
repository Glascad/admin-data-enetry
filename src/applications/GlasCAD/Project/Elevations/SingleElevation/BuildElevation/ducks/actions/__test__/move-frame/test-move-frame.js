import applyActionToElevation from "../apply-action";
import MOVE_FRAME from "../../move-frame";
import testElevation from '../../../../../utils/recursive-elevation/__test__/validation-tests/index.test';
import testElevationArrays from "../../../../../utils/recursive-elevation/__test__/validation-tests/test-elevation-arrays.test";

export default ({
    elevation,
    elevationArrays,
    detailId,
    distance,
    expectedDetails,
    deletedDetails,
    daylightOpenings,
}) => {
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
    if (elevationArrays) {
        testElevationArrays({
            elevation,
            ...elevationArrays,
        });
    }

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
