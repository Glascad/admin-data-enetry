
export default ({
    dimension,
    offset,
}, {
    dimension: otherDimension,
    offset: otherOffset,
}) => (
        offset < otherOffset ?
            offset + dimension > otherOffset
            :
            otherOffset + otherDimension > offset
    );
