
export default ({ bayCount, horizontalCount }) => (
    bayCount
    +
    (horizontalCount + 1)
    +
    (2 * bayCount * (horizontalCount + 1))
);
