export default function UPDATE_INFILL_SIZE({
    systemSetInput,
}, {
    infillSize,
}) {
    console.log(arguments);
    return {
        systemSetInput: {
            ...systemSetInput,
            infillSize
        },
    };
}