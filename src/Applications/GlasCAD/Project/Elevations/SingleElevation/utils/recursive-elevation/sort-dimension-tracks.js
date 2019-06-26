
const averagePrecedence = track => (
    track.reduce((sum, { precedence }) => sum + precedence, 0)
    /
    track.length
);

// tracks with greater precedence should come first (be closer to the elevation)
export default (trackOne, trackTwo) => averagePrecedence(trackTwo) - averagePrecedence(trackOne);