import { override as defaultOverride } from '../../default';

export default ({
    system,
    system: {
        configurationOverrides,
        configurationOverridesToDelete,
    },
}, {
    detailTypeId,
    configurationTypeId,
}) => {
    const override = configurationOverrides
        .find(o => o.detailTypeId === detailTypeId
            &&
            o.configurationTypeId === configurationTypeId);
    if (override) {
        return {
            system: {
                ...system,
                configurationOverrides: configurationOverrides
                    .filter(o => o !== override),
            },
        };
    } else {
        return {
            system: {
                ...system,
                configurationOverridesToDelete: configurationOverridesToDelete
                    .concat({
                        ...defaultOverride,
                        detailTypeId,
                        configurationTypeId,
                    }),
            },
        };
    }
}