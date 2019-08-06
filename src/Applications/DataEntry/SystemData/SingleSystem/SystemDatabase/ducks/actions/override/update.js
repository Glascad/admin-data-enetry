import { override as defaultOverride } from '../../default';

export default ({
    system,
    system: {
        configurationOverrides,
    },
}, {
    detailTypeId,
    configurationTypeId,
    ...update
}) => {
    // console.log(arguments);
    const override = configurationOverrides.find(o => o.detailTypeId === detailTypeId
        &&
        o.configurationTypeId === configurationTypeId);
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
                        detailTypeId,
                        configurationTypeId,
                        ...update,
                    }),
            },
        };
    }
}