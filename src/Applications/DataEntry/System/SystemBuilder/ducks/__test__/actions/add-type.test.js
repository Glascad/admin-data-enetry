import { ADD_TYPE } from "../../actions";
import { systemUpdate } from "../../schemas";

function testAddType({
    systemInput,
    payload,
    systemOutput,
}) {
    describe('testing add type', () => {
        const result = ADD_TYPE({ ...systemUpdate, ...systemInput }, payload);
        test('result must be correct', () => {
            expect(result).toMatchObject(systemOutput);
        });
    });
}

testAddType({
    systemInput: {},
    payload: {
        
        parentOptionValueId: 1,
        __typename: "SystemDetailType",
    },
    systemOutput: {
        
    },
});
