import applyActionToElevation from "./apply-action";
import MERGE_CONTAINERS from "../merge-containers";
import sample1 from "../../../../__test__/sample-elevations/sample1.json";
import sample2 from "../../../../__test__/sample-elevations/sample2.json";
import { DIRECTIONS } from "../../../../utils/recursive-elevation/directions";




describe("Sample1 merging 710 to 708 left", () => {
    const sampleResult = applyActionToElevation(sample1, MERGE_CONTAINERS, ({
        containers: {
            710: container,
        },
    }) => ({
        container,
        direction: DIRECTIONS.LEFT,
    }))
    test("container 710 has correct daylight opening", () => {
        // expect(sampleResult)
    })
    test("container 708 is gone (container)", () => {
        expect(sampleResult.containerIds).toEqual(expect.not.arrayContaining(["708"]));
        // expect(sampleResult.containerIds).toEqual(expect.not.arrayContaining(["710"])); //Testing to make sure the test fails

    })
    test("creferences to container 8 are gone (details)", () => {

    })
})