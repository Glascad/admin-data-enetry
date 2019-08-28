import { override as defaultOverride } from '../../default';

export default ({
    system,
    system: {
        configurationOverrides,
        configurationOverridesToDelete,
    },
}, {
    detailType,
    configurationType,
}) => {
    const deletedOverride = configurationOverridesToDelete.find(o => o.detailType === detailType
        &&
        o.configurationType === configurationType);
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
                        detailType,
                        configurationType,
                    }),
            },
        };
    }
}