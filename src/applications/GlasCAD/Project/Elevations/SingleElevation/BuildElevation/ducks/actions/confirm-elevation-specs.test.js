import sample1 from "../../../__test__/sample-elevations/sample1.json";
import sample2 from "../../../__test__/sample-elevations/sample2.json";
import RecursiveElevation from "../../../utils/recursive-elevation/elevation.js";

export default function confirmElevationSpecs({ elevation, expectedContainersSize, expectedDetailsSize, expectedFramesSize }) {
    const recursiveElevation = new RecursiveElevation(elevation);
    describe(`testing container, detail, and frame lengths.`, () => {

        test(`Tests ${elevation.name} for correct containers, details, and frames`, () => {
            expect(recursiveElevation).toMatchObject({
                allContainers: {
                    length: expectedContainersSize,
                },
                allDetails: {
                    length: expectedDetailsSize,
                },
                allFrames: {
                    length: expectedFramesSize,
                },
            });
        });
    });
    return confirmElevationSpecs;
};

confirmElevationSpecs({
    elevation: sample1,
    expectedContainersSize: 4,
    expectedDetailsSize: 12,
    expectedFramesSize: 9,
})
confirmElevationSpecs({
    elevation: sample2,
    expectedContainersSize: 9,
    expectedDetailsSize: 26,
    expectedFramesSize: 14,
})