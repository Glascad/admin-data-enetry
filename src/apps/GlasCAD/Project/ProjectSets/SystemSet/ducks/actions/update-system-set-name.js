
export default function UPDATE_SYSTEM_SET_NAME(queryResult, systemSetUpdate, {
    name,
}) {
    console.log(arguments);
    return {
        ...systemSetUpdate,
        name,
    };
}
