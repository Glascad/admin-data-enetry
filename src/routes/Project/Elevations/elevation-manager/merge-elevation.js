
export default function mergeElevation({
    ...elevation
}, {
    elevation: update
}) {
    return {
        ...elevation,
        ...update,
    };
}
