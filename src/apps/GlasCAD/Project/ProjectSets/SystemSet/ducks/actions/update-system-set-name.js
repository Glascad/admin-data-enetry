
export default function UPDATE_SYSTEM_SET_NAME(queryResult, systemSetUpdate, { name }) {
    return {
        ...systemSetUpdate,
        name,
    };
}
