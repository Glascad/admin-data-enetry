import { DIRECTIONS } from "../../../../../../../../../utils";
import testElevation from "../../../../utils/recursive-elevation/__test__/validation-tests/index.test";
import sample1 from "../../../../utils/sample-elevations/sample1.json";
import sample2 from "../../../../utils/sample-elevations/sample2.json";
import MERGE_CONTAINERS from "../merge-containers";
import applyActionToElevation from "./apply-action";
import chainTests from './chain-tests';

function testMerge({
    elevation,
    direction,
    containerId,
    deletedContainerId,
    daylightOpening,
}) {

    const sampleResult = applyActionToElevation(elevation, MERGE_CONTAINERS, ({
        containers: {
            [containerId]: container,
        },
    }) => ({
        container,
        direction,
    }));

    testElevation({
        description: `${elevation.name} - merge containers - containerId: ${containerId}, direction: ${direction.join(' ')}`,
        elevation: sampleResult.rawElevation,
    });

    describe(`${elevation.name} merging ${containerId} to ${deletedContainerId} ${direction}`, () => {
        test(`container ${containerId} has correct daylight opening`, () => {
            expect(sampleResult.containers[containerId].daylightOpening).toMatchObject(daylightOpening);
        });

        test(`container ${deletedContainerId} is gone (container)`, () => {
            expect(sampleResult.containerIds).toEqual(expect.not.arrayContaining([`${deletedContainerId}`]));
            expect(sampleResult.containers[deletedContainerId]).toBeUndefined();
        });

        test(`references to container ${deletedContainerId} are gone (details)`, () => {
            sampleResult.allDetails.map(detail => {
                expect(detail).not.toHaveProperty("firstContainerId", deletedContainerId);
                expect(detail).not.toHaveProperty("secondContainerId", deletedContainerId);
            });
        });
    });

    return sampleResult.rawElevation;
}

// For sample1
testMerge({
    elevation: sample1,
    direction: DIRECTIONS.LEFT,
    containerId: 710,
    deletedContainerId: 708,
    daylightOpening: {
        x: 480,
        y: 230,
    },
});

testMerge({
    elevation: sample1,
    direction: DIRECTIONS.RIGHT,
    containerId: 707,
    deletedContainerId: 709,
    daylightOpening: {
        x: 480,
        y: 240,
    },
});

testMerge({
    elevation: sample1,
    direction: DIRECTIONS.UP,
    containerId: 709,
    deletedContainerId: 710,
    daylightOpening: {
        x: 235,
        y: 480,
    },
});

testMerge({
    elevation: sample1,
    direction: DIRECTIONS.DOWN,
    containerId: 708,
    deletedContainerId: 707,
    daylightOpening: {
        x: 235,
        y: 480,
    },
});

// For sample2
testMerge({
    elevation: sample2,
    direction: DIRECTIONS.DOWN,
    containerId: 733,
    deletedContainerId: 732,
    daylightOpening: {
        x: 185,
        y: 430,
    },
});

testMerge({
    elevation: sample2,
    direction: DIRECTIONS.LEFT,
    containerId: 739,
    deletedContainerId: 733,
    daylightOpening: {
        x: 380,
        y: 100
    }
});

testMerge({
    elevation: sample2,
    direction: DIRECTIONS.UP,
    containerId: 736,
    deletedContainerId: 737,
    daylightOpening: {
        x: 185,
        y: 320,
    },
});

// sample1 Test Multiple
chainTests({
    initialElevation: sample1,
    actions: [
        {
            action: testMerge,
            payload: {
                direction: DIRECTIONS.LEFT,
                containerId: 709,
                deletedContainerId: 707,
                daylightOpening: {
                    x: 480,
                    y: 240,
                },
            },
        },
        {
            action: testMerge,
            payload: {
                direction: DIRECTIONS.LEFT,
                containerId: 710,
                deletedContainerId: 708,
                daylightOpening: {
                    x: 480,
                    y: 230,
                },
            },
        },
        {
            action: testMerge,
            payload: {
                direction: DIRECTIONS.UP,
                containerId: 709,
                deletedContainerId: 710,
                daylightOpening: {
                    x: 480,
                    y: 480,
                },
            },
        },
    ],
});
