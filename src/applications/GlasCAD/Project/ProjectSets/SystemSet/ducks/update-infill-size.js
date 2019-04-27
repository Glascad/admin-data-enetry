export default function UPDATE_INFILL_SIZE({
    systemSetInput,
}, {
    infillSize,
}) {
    return {
        systemSetInput: {
            ...systemSetInput,
            infillSize
        },
    };
}