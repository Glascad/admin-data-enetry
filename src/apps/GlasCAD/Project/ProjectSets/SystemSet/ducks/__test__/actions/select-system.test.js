import SELECT_SYSTEM from "../../actions/select-system";
import { defaultSystemSetUpdate } from "../../schemas";
import { sample1 } from '../sample-query-results';

function testSelectSystem({
    queryResult,
    systemSetUpdate,
    systemName,
    newUpdate,
}) {
    describe('testing select system', () => {
        test('result should be correct', () => {
            // const result = SELECT_SYSTEM(queryResult, { ...defaultSystemSetUpdate, ...systemSetUpdate }, { systemName });
            // expect(result).toMatchObject(newUpdate);
        });
    });
}

testSelectSystem({
    queryResult: sample1,
    systemSetUpdate: {

    },
    systemName: "Sys3",
    newUpdate: {

    },
});
