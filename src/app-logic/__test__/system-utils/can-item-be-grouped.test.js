import { canItemBeGrouped } from "../../system-utils";
import { sampleSystemMap } from "../sample-systems";

function testCanItemBeGrouped({ systemMap, option, result }) {
    describe(`getting all instances of ${option.path} in systemMap`, () => {
        const allInstances = canItemBeGrouped(option, systemMap);
        test(`Testing that all instances of ${option.path} are found`, () => {
            expect(allInstances).toBe(result);
        });
    });
};

testCanItemBeGrouped({
    systemMap: sampleSystemMap,
    option:
    {
        path: '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS',
        __typename: 'DetailOption'
    },
    result: true
});

testCanItemBeGrouped({
    systemMap: sampleSystemMap,
    option: {
        path: '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.HEAD.STOPS.DOWN.GLAZING',
        __typename: "ConfigurationOption"
    },
    result: true
});
