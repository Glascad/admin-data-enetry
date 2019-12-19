export default function getPartId(
    partNumber,
    {
        _manufacturer: {
            _parts = []
        } = {}
    } = {}
) {
    const partId = _parts.reduce((partId, part) => part.partNumber === partNumber ? part.id : partId, undefined);
    console.log({
        partId,
        partNumber,
        _parts,
    });
    return partId;
};