import { getParent } from "../../utils";
import { sample1 } from "../../../../sample-systems";

describe('testing get parent', () => {
    const result = getParent({
        __typename: "SystemOptionValue",
        id: 1,
        parentSystemOptionId: 1
    }, sample1);
    test('Result should be correct', () => {
        expect(result).toMatchObject({
            id: 1,
            __typename: "SystemOption",
        });
    });
});
