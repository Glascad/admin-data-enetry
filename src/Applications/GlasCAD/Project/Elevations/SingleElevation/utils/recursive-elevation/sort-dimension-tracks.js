
const log = (...a) => console.log(a) || a[a.length - 1];

const averagePrecedence = track => log(
    track,
    track.reduce((sum, { precedence }) => sum + precedence, 0)
    /
    track.length
);

// tracks with greater precedence should come first (be closer to the elevation)
export default (trackOne, trackTwo) => averagePrecedence(trackTwo) - averagePrecedence(trackOne);