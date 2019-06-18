import sample1 from "../../../../../__test__/sample-elevations/sample1.json";
import RecursiveElevation from "../../../../../utils/recursive-elevation/elevation.js";
import deleteDetail from "../delete-detail.js";

const testDeleteDetail = ({ elevation, elevationInput, detailId }) => {

    const sampleElevation = new RecursiveElevation(elevation);
    const detail = sampleElevation.details[detailId];
    const { elevationInput: elevationInputResult } = deleteDetail({ elevationInput }, { detail });

    describe("Testing delete-detail.js", () => {
        test(`Deleting ${detailId} from ${elevation.name}`, () => {
            expect(elevationInputResult).toMatchObject({
                detailIdsToDelete: expect.arrayContaining([
                    detailId,
                ]),
            });
        });
    });
};


testDeleteDetail({
    elevation: sample1,
    elevationInput: {
        details: [],
        detailIdsToDelete: [],
    },
    detailId: 1793,
});
testDeleteDetail({
    elevation: sample1,
    elevationInput: {
        details: [],
        detailIdsToDelete: [],
    },
    detailId: 1796,
});
testDeleteDetail({
    elevation: sample1,
    elevationInput: {
        details: [],
        detailIdsToDelete: [],
    },
    detailId: 1799,
});
