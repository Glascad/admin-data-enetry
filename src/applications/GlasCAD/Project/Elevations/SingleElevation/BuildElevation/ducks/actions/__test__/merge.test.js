import applyActionToElevation from "./apply-action";
import MERGE_CONTAINERS from "../merge-containers";
import sample1 from "../../../../__test__/sample-elevations/sample1.json";
import sample2 from "../../../../__test__/sample-elevations/sample2.json";
import { DIRECTIONS } from "../../../../utils/recursive-elevation/directions";

const testMerge = ({ name, elevation, direction, containerId, deletedContainerId, daylightOpening }) => {
    const sampleResult = applyActionToElevation(elevation, MERGE_CONTAINERS, ({
        containers: {
            [containerId]: container,
        },
    }) => ({
        container,
        direction,
    }))
    describe(`${name} merging ${containerId} to ${deletedContainerId} ${direction}`, () => {
        test(`container ${containerId} has correct daylight opening`, () => {

            expect(sampleResult.containers[containerId].daylightOpening).toMatchObject(daylightOpening);

        })
        test(`container ${deletedContainerId} is gone (container)`, () => {
            expect(sampleResult.containerIds).toEqual(expect.not.arrayContaining([`${deletedContainerId}`]));
            expect(sampleResult.containers[deletedContainerId]).toBeUndefined();
        })
        test(`creferences to container ${deletedContainerId} are gone (details)`, () => {

            sampleResult.allDetails.map(detail => {
                expect(detail).not.toHaveProperty("firstContainerId", deletedContainerId);
                expect(detail).not.toHaveProperty("secondContainerId", deletedContainerId);
                expect(detail).not.toHaveProperty("firstContainerFakeId", deletedContainerId);
                expect(detail).not.toHaveProperty("secondContainerFakeId", deletedContainerId);
            });
        })
    })
    return sampleResult.rawElevation;
}

const testMultiple = ({ name, initialElevation, actions }) => actions.reduce((elevation, action) => testMerge({
    name,
    elevation,
    ...action
}), initialElevation);


//For sample1
testMerge({
    name: "sample1",
    elevation: sample1,
    direction: DIRECTIONS.LEFT,
    containerId: 710,
    deletedContainerId: 708,
    daylightOpening: {
        x: 480,
        y: 230
    }
})
testMerge({
    name: "sample1",
    elevation: sample1,
    direction: DIRECTIONS.RIGHT,
    containerId: 707,
    deletedContainerId: 709,
    daylightOpening: {
        x: 480,
        y: 240
    }
})
testMerge({
    name: "sample1",
    elevation: sample1,
    direction: DIRECTIONS.UP,
    containerId: 709,
    deletedContainerId: 710,
    daylightOpening: {
        x: 235,
        y: 480
    }
})
testMerge({
    name: "sample1",
    elevation: sample1,
    direction: DIRECTIONS.DOWN,
    containerId: 708,
    deletedContainerId: 707,
    daylightOpening: {
        x: 235,
        y: 480
    }
})

//For sample2
testMerge({
    name: "sample2",
    elevation: sample2,
    direction: DIRECTIONS.DOWN,
    containerId: 733,
    deletedContainerId: 732,
    daylightOpening: {
        x: 185,
        y: 430
    }
})
testMerge({
    name: "sample2",
    elevation: sample2,
    direction: DIRECTIONS.LEFT,
    containerId: 739,
    deletedContainerId: 733,
    daylightOpening: {
        x: 380,
        y: 100
    }
})
testMerge({
    name: "sample2",
    elevation: sample2,
    direction: DIRECTIONS.UP,
    containerId: 736,
    deletedContainerId: 737,
    daylightOpening: {
        x: 185,
        y: 320
    }
})

//sample1 Testmultiple
testMultiple({
    name: "sample1",
    initialElevation: sample1,
    actions: [
        {
            direction: DIRECTIONS.LEFT,
            containerId: 709,
            deletedContainerId: 707,
            daylightOpening: {
                x: 480,
                y: 240
            }
        },
        {
            direction: DIRECTIONS.LEFT,
            containerId: 710,
            deletedContainerId: 708,
            daylightOpening: {
                x: 480,
                y: 230
            }
        },
        {
            direction: DIRECTIONS.UP,
            containerId: 709,
            deletedContainerId: 710,
            daylightOpening: {
                x: 480,
                y: 480
            }
        },

    ]
})
