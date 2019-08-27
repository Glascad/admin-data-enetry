
export default ({ system }, update) => ({
    system: {
        ...system,
        ...update,
    },
});
