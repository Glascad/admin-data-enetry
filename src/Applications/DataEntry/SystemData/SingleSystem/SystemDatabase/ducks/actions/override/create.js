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
    const deletedOverride = configurationOverridesToDelete.find(o => o.detailTypeId === detailTypeId
        &&
        o.configurationTypeId === configurationTypeId);
    if (deletedOverride) {
        return {
            system: {
                ...system,
                configurationOverridesToDelete: configurationOverridesToDelete
                    .filter(o => o !== deletedOverride),
            },
        };
    } else {
        return {
            system: {
                ...system,
                configurationOverrides: configurationOverrides
                    .concat({
                        ...defaultOverride,
                        __created: true,
                        detailTypeId,
                        configurationTypeId,
                    }),
            },
        };
    }
}