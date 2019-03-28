
export default function deleteDetail({
    elevation: elevationInput,
    elevation: {
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
        elevation: {
            ...elevationInput,
            details: details.filter(({ id, fakeId }) => (id || fakeId) !== (detailId || detailFakeId)),
            detailIdsToDelete: detailIdsToDelete.concat(detailId || []),
        },
    };
}
