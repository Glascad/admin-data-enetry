
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