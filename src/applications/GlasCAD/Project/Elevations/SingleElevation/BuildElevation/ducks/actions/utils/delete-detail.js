
export default function deleteDetail({
    elevationInput,
    elevationInput: {
        details = [],
        detailIdsToDelete = [],
    },
}, {
    detail: {
        rawDetail: {
            id: detailId,
            fakeId: detailFakeId,
        },
    },
}) {
    return {
        elevationInput: {
            ...elevationInput,
            details: details.filter(({ id, fakeId }) => (id || fakeId) !== (detailId || detailFakeId)),
            detailIdsToDelete: detailIdsToDelete.concat(detailId || []),
        },
    };
}
