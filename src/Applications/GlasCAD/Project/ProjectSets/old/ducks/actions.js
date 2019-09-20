import { replace } from "../../../../../../utils";

/**
 * These functions are the actions received by the reducer in ./hooks.js
 * Each function receives the previous state object and a payload, and should return a new state object.
 * Refer to initialState in ./hooks.js to see the shape of the state object.
 */

export const UPDATE_FILTER = (state, updatedFilters) => ({
    ...state,
    filters: {
        ...state.filters,
        ...updatedFilters,
    },
});

export const UPDATE_SYSTEM_SET = (state, updatedSystemSet) => ({
    ...state,
    systemSetInput: {
        ...state.systemSetInput,
        ...updatedSystemSet,
    },
});

export const SELECT_OPTION_VALUE = ({
    systemSetInput,
    systemSetInput: {
        selectedOptionValues,
    },
    ...state
}, {
    optionId,
    valueId,
}) => {
    const optionIndex = selectedOptionValues.findIndex(({ systemOptionId }) => systemOptionId === optionId);

    const selectedOptionValue = {
        systemOptionId: optionId,
        optionValueId: valueId,
    };

    return {
        ...state,
        systemSetInput: {
            ...systemSetInput,
            selectedOptionValues: optionIndex !== -1 ?
                replace(selectedOptionValues, optionIndex, selectedOptionValue)
                :
                selectedOptionValues.concat(selectedOptionValue)
        },
    };
}
