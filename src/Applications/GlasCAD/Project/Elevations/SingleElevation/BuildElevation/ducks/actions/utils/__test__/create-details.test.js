import sample1 from "../../../../../__test__/sample-elevations/sample1.json"
import createDetail from "../create-detail.js";
import RecursiveElevation from "../../../../../utils/recursive-elevation/elevation.js";

const testCreateDetail = ({ elevation, elevationInput, firstContainerId, secondContainerId, vertical }) => {

    const sampleElevation = new RecursiveElevation(elevation);
    const firstContainer = sampleElevation.containers[firstContainerId];
    const secondContainer = sampleElevation.containers[secondContainerId];
    const { elevationInput: elevationInputResult } = createDetail({ elevationInput }, { firstContainer, secondContainer, vertical });

    describe("Testing create-detail.js", () => {
        test(`Detail is correctly made between ${firstContainer.rawContainer.id} and ${secondContainer.rawContainer.id} and is vertical: ${vertical}`, () => {
            expect(elevationInputResult).toMatchObject({
                details: expect.arrayContaining([
                    expect.objectContaining(
                        { firstContainerId, secondContainerId, vertical },
                    ),
                ]),
            });
        });
    });
};

testCreateDetail({
    elevation: sample1,
    elevationInput: {
        details: [],
    },

    firstContainerId: 707,
    secondContainerId: 710,
    vertical: false,
});
testCreateDetail({
    elevation: sample1,
    elevationInput: {
        details: [],
    },

    firstContainerId: 709,
    secondContainerId: 708,
    vertical: true,
});
