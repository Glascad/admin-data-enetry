export default function getPartFromPartId(
    partId,
    {
        _manufacturer: {
            _parts = []
        } = {}
    } = {}
) {
    return _parts.find(part => part.id === partId);
};