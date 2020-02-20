export default function getPartId(
    partNumber,
    {
        _manufacturer: {
            _parts = []
        } = {}
    } = {}
) {
    return _parts.reduce((partId, part) => part.partNumber === partNumber ? part.id : partId, undefined);
};