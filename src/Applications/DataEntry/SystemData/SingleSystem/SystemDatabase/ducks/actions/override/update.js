import { override as defaultOverride } from '../../default';

export default ({
    system,
    system: {
        configurationOverrides,
        id: systemId,
        systemType,
    },
}, {
    detailType,
    configurationType,
    ...update
}) => {
    const override = configurationOverrides.find(o => o.detailType === detailType
        &&
        o.configurationType === configurationType);
    if (override) {
        const overrideIndex = configurationOverrides.indexOf(override);
        return {
            system: {
                ...system,
                configurationOverrides: configurationOverrides
                    .replace(overrideIndex, {
                        ...override,
                        ...update,
                    }),
            },
        };
    } else {
        return {
            system: {
                ...system,
                configurationOverrides: configurationOverrides
                    .concat({
                        ...defaultOverride,
                        detailType,
                        configurationType,
                        ...update,
                    }),
            },
        };
    }
}