import sample1 from "../../../../../utils/sample-elevations/sample1.json";
import RecursiveElevation from "../../../../../utils/recursive-elevation/elevation.js";
import updateDLO from "../update-dlo.js";


const testUpdateDLO = ({ elevation, elevationInput, containerId, vertical, distance, daylightOpening }) => {

    const sampleElevation = new RecursiveElevation(elevation);
    const container = sampleElevation.containers[containerId];
    const { elevationInput: elevationInputResult } = updateDLO({ elevationInput }, { container, vertical, distance });

    describe("Testing update-dlo.js", () => {
        test(`updating dayLightOpening for ${containerId} in ${elevation.name}`, () => {
            expect(elevationInputResult).toMatchObject({
                containers: expect.arrayContaining([
                    expect.objectContaining(
                        {
                            id: containerId,
                            daylightOpening
                        },
                    )

                ]),
            });
        });
    });

};


testUpdateDLO({
    elevation: sample1,
    elevationInput: {
        containers: [],
    },
    containerId: 710,
    vertical: false,
    distance: 20,
    daylightOpening: {
        x: 215,
        y: 230,
    }
});