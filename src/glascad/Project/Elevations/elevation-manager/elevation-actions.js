
export default {
    UPDATE({
        elevation,
    }, update) {
        return {
            elevation: {
                ...elevation,
                ...update,
            },
        };
    },
};
