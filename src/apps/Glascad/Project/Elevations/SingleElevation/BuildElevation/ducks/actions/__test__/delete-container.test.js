import { sample3 } from "../../../../utils/sample-elevations";
import DELETE_CONTAINER from "../delete-container";
import applyActionToElevation from "./apply-action";
import mergeInput from "../../merge-input";
import { defaultElevationInput } from "../../../BuildElevation";

function testDeleteContainer({
    elevation,
    elevationInput,
    containerId,
    mergedContainerId,
    expectedWidth,
    expectedHeight,
}) {
    describe(`deleting container: ${containerId} results in correct DLO, origin, and elevation`, () => {

        const { rawElevation } = mergeInput({ elevationInput }, { _elevation: elevation });

        const {
            containers: {
                [mergedContainerId || containerId]: {
                    daylightOpening: {
                        dimensions: {
                            width,
                            height,
                        },
                    },
                },
            },
        } = applyActionToElevation(rawElevation, DELETE_CONTAINER, ({
            containers: {
                [containerId]: container
            }
        }) => ({ container }));

        test(`checking correct DLO for container: ${mergedContainerId || containerId}`, () => {
            expect(width).toBe(expectedWidth);
            expect(height).toBe(expectedHeight);
        });
    })
};

// deleting a container from the middle doesn't change the DLO
testDeleteContainer({
    elevation: sample3,
    elevationInput: defaultElevationInput,
    containerId: 805,
    expectedHeight: 250,
    expectedWidth: 86.6666666666667,
});

// deleting a container from the top and bottom expand the height
testDeleteContainer({
    elevation: sample3,
    elevationInput: defaultElevationInput,
    containerId: 807,
    expectedHeight: 90,
    expectedWidth: 86.6666666666667,
});

testDeleteContainer({
    elevation: sample3,
    elevationInput: defaultElevationInput,
    containerId: 804,
    expectedHeight: 40,
    expectedWidth: 86.6666666666667,
});
// deleting a container from the right and left expand the width
testDeleteContainer({
    elevation: sample3,
    elevationInput: defaultElevationInput,
    containerId: 809,
    expectedHeight: 120,
    expectedWidth: 96.6666666666667,
});

testDeleteContainer({
    elevation: sample3,
    elevationInput: defaultElevationInput,
    containerId: 802,
    expectedHeight: 120,
    expectedWidth: 96.6666666666667,
});

// expanding a container from the 4 corners expand the height and width
testDeleteContainer({
    elevation: sample3,
    elevationInput: defaultElevationInput,
    containerId: 803,
    expectedHeight: 90,
    expectedWidth: 96.6666666666667,
});

testDeleteContainer({
    elevation: sample3,
    elevationInput: defaultElevationInput,
    containerId: 811,
    expectedHeight: 90,
    expectedWidth: 96.6666666666667,
});

testDeleteContainer({
    elevation: sample3,
    elevationInput: defaultElevationInput,
    containerId: 800,
    expectedHeight: 100,
    expectedWidth: 96.6666666666667,
});

testDeleteContainer({
    elevation: sample3,
    elevationInput: defaultElevationInput,
    containerId: 808,
    expectedHeight: 100,
    expectedWidth: 96.6666666666667,
});

// deleting 2 vertical containers from the side expands the height and width
testDeleteContainer({
    elevation: sample3,
    elevationInput: {
        containers:
            [
                {
                    __typename: "UPDATED_CONTAINER",
                    id: 810,
                    original: false,
                    daylightOpening:
                    {
                        dimensions:
                        {
                            width: 96.6666666666667,
                            height: 60
                        }
                    }, customRoughOpening: true
                }],
        details: []
    },
    containerId: 809,
    expectedHeight: 190,
    expectedWidth: 96.6666666666667,
});

testDeleteContainer({
    elevation: sample3,
    elevationInput: {
        containers:
            [
                {
                    __typename: "UPDATED_CONTAINER",
                    id: 801,
                    original: false,
                    daylightOpening:
                    {
                        dimensions:
                        {
                            width: 96.6666666666667,
                            height: 60
                        }
                    }, 
                     customRoughOpening: true
                }],
        details: []
    },
    containerId: 802,
    mergedContainerId: 801,
    expectedHeight: 190,
    expectedWidth: 96.6666666666667,
});

// deleting 2 vertical containers from the middle expands just the height

testDeleteContainer({
    elevation: sample3,
    elevationInput: {
        containers:
            [
                {
                    __typename: "UPDATED_CONTAINER",
                    id: 805,
                    original: false,
                    daylightOpening:
                    {
                        dimensions:
                        {
                            width: 86.6666666666667,
                            height: 250
                        }
                    },
                    customRoughOpening: true
                }],
        details: []
    },
    containerId: 804,
    mergedContainerId: 805,
    expectedHeight: 300,
    expectedWidth: 86.6666666666667,
});