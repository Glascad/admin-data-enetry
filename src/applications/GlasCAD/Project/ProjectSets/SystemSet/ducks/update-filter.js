export default function UPDATE_FILTER({
    filters: {
        manufacturerId: oldManufacturerId,
        systemTypeId: oldSystemTypeId,
    },
    systemUpdate,
}, {
    manufacturerId: newManufacturerId,
    systemTypeId: newSystemTypeId,
}, {
    allManufacturers,
}) {
    const manufacturerChanged = newManufacturerId && newManufacturerId !== oldManufacturerId;
    const systemTypeChanged = newSystemTypeId && newSystemTypeId !== oldSystemTypeId;

    if (!(manufacturerChanged || systemTypeChanged)) return arguments[0];
    else {
        const manufacturerId = newManufacturerId || oldManufacturerId;
        const systemTypeId = newSystemTypeId || oldSystemTypeId;

        // finish later

        return arguments[0];
    }
}