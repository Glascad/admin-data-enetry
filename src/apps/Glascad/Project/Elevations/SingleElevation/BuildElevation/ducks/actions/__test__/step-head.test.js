import ALTER_ROUGH_OPENING from "../alter-rough-opening";
import { sample7 } from "../../../../utils/sample-elevations";
import applyActionToElevation from "./apply-action";
import testElevation from "../../../../utils/recursive-elevation/__test__/validation-tests/index.test";

function testStepHead({ elevation, containerId, distance, daylightOpening, customRoughOpening }) {

    const result = applyActionToElevation(
        elevation,
        ALTER_ROUGH_OPENING,
        ({
            containers: {
                [containerId]: container
            }
        }) => ({
            container,
            distance,
            first: false,
        }),
    );

    testElevation({
        description: `Testing validity of elevation ${elevation.name} after step head`,
        elevation: result.rawElevation,
    });

    describe(`Testing step head on elevation ${elevation.name} container ${containerId} distance ${distance}`, () => {
        test('container has correct dlo', () => {
            expect(result.containers[containerId].daylightOpening).toMatchObject(daylightOpening);
        });
        test('container is or isn\'t deleted', () => {
            expect(!!result.containers[containerId].customRoughOpening).toBe(!!customRoughOpening);
        });
    });
}

testStepHead({
    elevation: sample7,
    containerId: 1542,
    distance: 24,
    daylightOpening: {
        dimensions: {
            width: 47.6666666666667,
            height: 33,
        }
    },
    customRoughOpening: false,
});
