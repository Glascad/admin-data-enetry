import sample1 from "../../../../../utils/sample-elevations/sample1.json";
import deleteContainer from "../delete-container.js";
import RecursiveElevation from "../../../../../utils/recursive-elevation/elevation.js";

const testDeleteContainer = ({ elevation, elevationInput, containerId }) => {

    const sampleElevation = new RecursiveElevation(elevation);
    const container = sampleElevation.containers[containerId];
    const { elevationInput: elevationInputResult } = deleteContainer({ elevationInput }, { container });

    describe("testing delete-container.js", () => {
        test(`Deleting ${containerId} from ${elevation.name}`, () => {
            expect(elevationInputResult).toMatchObject({
                containerIdsToDelete: expect.arrayContaining([
                    containerId
                ]),
            });
        });
    });
};



testDeleteContainer({
    elevation: sample1,
    elevationInput: {
        containers: [],
        containerIdsToDelete: [],
    },
    containerId: 710,
})
testDeleteContainer({
    elevation: sample1,
    elevationInput: {
        containers: [],
        containerIdsToDelete: [],
    },
    containerId: 707,
})