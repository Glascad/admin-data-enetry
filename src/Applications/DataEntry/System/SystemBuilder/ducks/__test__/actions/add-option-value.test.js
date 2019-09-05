import ADD_OPTION_VALUE from "../../actions/add-option-value";
import { systemUpdate } from "../../schemas";

function testAddOptionValue({
    systemInput,
    payload,
    systemOutput,
}) {
    describe('testing add option value', () => {
        const result = ADD_OPTION_VALUE({ ...systemUpdate, ...systemInput }, payload);
        test('', () => {
            expect(result).toMatchObject(systemOutput)
        });
    });
}

testAddOptionValue({
    systemInput: {
        
    },
    payload: {
        optionId: 3,
        __typename: "SystemOptionValue",
    },
    systemOutput: {

    },
});
