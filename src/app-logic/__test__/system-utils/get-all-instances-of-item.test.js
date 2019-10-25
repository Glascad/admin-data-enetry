import { getAllInstancesOfItem } from "../../system-utils";
import { sampleSystemMap } from "../sample-systems";

function testGetAllInstancesOfItem({systemMap, itemName, result}) {
    describe(`getting all instances of ${itemName} in systemMap`, () => {
        const allInstances = getAllInstancesOfItem(systemMap, itemName);
        test(`Testing that all instances of ${itemName} are found`, () => {
            expect(allInstances).toMatchObject(result);
        });
    });
};


testGetAllInstancesOfItem({
    systemMap: sampleSystemMap,
    itemName: 'STOPS',
    result: [
        "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS",
        "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.HEAD.STOPS",
        "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.VOID.VOID.__CT__.HORIZONTAL.STOPS",
    ]
});