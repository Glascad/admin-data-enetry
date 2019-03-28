
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
    const log = (a, b) => { console.log(a, b); return a; }

    return log({
        elevation: {
            ...elevationInput,
            details: details.filter(({ id, fakeId }) => (id || fakeId) !== (detailId || detailFakeId)),
            detailIdsToDelete: detailIdsToDelete.concat(detailId || []),
        },
    }, arguments);
}
