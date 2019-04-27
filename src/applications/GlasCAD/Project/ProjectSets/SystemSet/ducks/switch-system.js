export default function SWITCH_SYSTEM({
    systemSetInput,
    systemSetInput: {
        systemId: oldSystemId,
        infillSize,
        systemOptions,
        configurationTypeIds,
        configurationTypeIdsToUnselect,
    },
}, {
    systemId,
}, {
    allManufacturers,
}) {
    if (!systemId || systemId === oldSystemId) return arguments[0];
    else {
        const {
            _systemInfillSizes = [],
        } = allManufacturers.reduce((system, { _systems }) => system || _systems.find(({ id }) => id === systemId), null) || {};
        return {
            systemSetInput: {
                ...systemSetInput,
                systemId,
                infillSize: _systemInfillSizes.includes(infillSize) ? infillSize : _systemInfillSizes[0],
                // systemOptions: 
            },
        };
    }
}