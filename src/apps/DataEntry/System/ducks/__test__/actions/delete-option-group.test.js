import { systemUpdate } from "../../schemas";
import { DELETE_OPTION_GROUP } from "../../actions";

function testDeleteOptionGroup({
    systemInput,
    payload,
    systemOutput,
}) {
    describe('testing deleting an optionGroup', () => {
        const result = DELETE_OPTION_GROUP(systemInput, payload);
        test('result should have correct shape', () => {
            expect(result).toMatchObject(systemOutput)
        });
    });
}

testDeleteOptionGroup({
    systemInput: {
        newOptionGroups: [],
        optionGroupsToDelete: [],
    },
    payload: {
        path: '1.SET.CENTER.GLAZING'
    },
    systemOutput: {
        newOptionGroups: [],
        optionGroupsToDelete: ['GLAZING']
    }
});

testDeleteOptionGroup({
    systemInput: {
        newOptionGroups: ['GLAZING'],
        optionGroupsToDelete: []
    },
    payload: {
        path: '1.SET.CENTER.GLAZING'
    },
    systemOutput: {
        newOptionGroups: [],
        optionGroupsToDelete: []
    }
});

testDeleteOptionGroup({
    systemInput: {
        newOptionGroups: ['STOPS'],
        optionGroupsToDelete: ['GLAZING']
    },
    payload: {
        path: '1.SET'
    },
    systemOutput: {
        newOptionGroups: ['STOPS'],
        optionGroupsToDelete: ['GLAZING', 'SET']
    }
});
