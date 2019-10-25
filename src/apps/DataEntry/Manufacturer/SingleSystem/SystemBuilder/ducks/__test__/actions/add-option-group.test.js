import { systemUpdate } from "../../schemas";
import { ADD_OPTION_GROUP } from "../../actions";

function testAddOptionGroup({
    systemInput,
    payload,
    systemOutput,
}) {
    describe('testing add option group', () => {
        const result = ADD_OPTION_GROUP(systemInput, payload);
        test('result should have correct shape', () => {
            expect(result).toMatchObject(systemOutput)
        });
    });
}

testAddOptionGroup({
    systemInput: {
        newOptionGroups: [],
        optionGroupsToDelete: [],
    },
    payload: {
        path: '1.SET.CENTER.GLAZING'
    },
    systemOutput: {
        newOptionGroups: ['GLAZING'],
        optionGroupsToDelete: []
    }
});

testAddOptionGroup({
    systemInput: {
        newOptionGroups: [],
        optionGroupsToDelete: ['GLAZING']
    },
    payload: {
        path: '1.SET.CENTER.GLAZING'
    },
    systemOutput: {
        newOptionGroups: [],
        optionGroupsToDelete: []
    }
});

testAddOptionGroup({
    systemInput: {
        newOptionGroups: ['STOPS'],
        optionGroupsToDelete: ['GLAZING']
    },
    payload: {
        path: '1.SET'
    },
    systemOutput: {
        newOptionGroups: ['STOPS', 'SET'],
        optionGroupsToDelete: ['GLAZING']
    }
});
