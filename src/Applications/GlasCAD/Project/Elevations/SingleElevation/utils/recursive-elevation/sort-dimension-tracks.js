
const averagePrecedence = track => (
    track.reduce((sum, { precedence }) => sum + precedence, 0)
    /
    track.length
);

export default (trackOne, trackTwo) => averagePrecedence(trackOne) < averagePrecedence(trackTwo);