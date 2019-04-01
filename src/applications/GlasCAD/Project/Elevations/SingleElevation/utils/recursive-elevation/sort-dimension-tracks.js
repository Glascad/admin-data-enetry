
const averagePrecedence = track => (
    track.reduce((sum, { precedence }) => sum + precedence, 0)
    /
    (track.length - 1)
);

export default (trackOne, trackTwo) => averagePrecedence(trackOne) < averagePrecedence(trackTwo);