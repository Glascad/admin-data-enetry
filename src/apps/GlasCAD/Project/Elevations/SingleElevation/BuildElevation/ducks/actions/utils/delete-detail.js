
export default function deleteDetail({
    elevationInput,
    elevationInput: {
        details = [],
        detailIdsToDelete = [],
    },
}, {
    detail: {
        id: detailId,
    },
}) {
    return {
        elevationInput: {
            ...elevationInput,
            details: details.filter(({ id }) => id !== detailId),
            detailIdsToDelete: detailIdsToDelete.concat(detailId || []),
        },
    };
}
