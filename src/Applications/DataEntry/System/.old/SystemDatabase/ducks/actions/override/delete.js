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
    const override = configurationOverrides
        .find(o => o.detailType === detailType
            &&
            o.configurationType === configurationType);
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
                        detailType,
                        configurationType,
                    }),
            },
        };
    }
}