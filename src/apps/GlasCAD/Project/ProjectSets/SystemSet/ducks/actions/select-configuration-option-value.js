import { getConfigurationTypeFromPath, getDefaultPath, getDetailTypeFromPath } from "../../../../../../../app-logic/system";
import { replace } from "../../../../../../../utils";
import { mergeOptionGroupValues } from "../merge";
import { defaultSystemSetConfiguration } from "../schemas";

export default function SELECT_CONFIGURATION_OPTION_VALUE({
    _systemSet: {
        _systemSetConfigurations = [],
        _systemSetOptionGroupValues = [],
    },
}, {
    optionGroupValues = [],
    configurations = [],
    optionalConfigurationsToUnselect = [],
}, [
    payloadPath,
    systemMap,
]) {
    // console.log(arguments);

    const groupedOptionValues = mergeOptionGroupValues(_systemSetOptionGroupValues, optionGroupValues);
    const defaultPath = getDefaultPath(payloadPath, systemMap, groupedOptionValues);
    const { __typename } = systemMap[defaultPath] || {};
    const configurationPathKey = `${__typename}Path`.replace(/^./, letter => letter.toLowerCase());
    const detailType = getDetailTypeFromPath(defaultPath);
    const configurationType = getConfigurationTypeFromPath(defaultPath);

    // find COV original path in query result
    const {
        configurationOptionValuePath: previousConfigurationOptionPath,
        detailConfigurationPath: previousDetailConfigurationPath,
    } = _systemSetConfigurations.find(cov => (
        (cov.configurationOptionValuePath || cov.detailConfigurationPath).replace(/(__CT__\.\w+)\..*$/, '$1')
        ===
        (defaultPath).replace(/(__CT__\.\w+)\..*$/, '$1')
    )) || {};

    // find COV in state
    const updatedCOV = configurations.find(({ detailConfigurationPath, configurationOptionValuePath }) => (
        getDetailTypeFromPath(detailConfigurationPath || configurationOptionValuePath) === detailType
        &&
        getConfigurationTypeFromPath(detailConfigurationPath || configurationOptionValuePath) === configurationType
    ));

    const index = configurations.indexOf(updatedCOV);

    const newCOV = {
        ...defaultSystemSetConfiguration,
        // ...updatedCOV,
        [configurationPathKey]: defaultPath,
    };

    return {
        ...arguments[1],
        configurations:
            updatedCOV ?
                payloadPath === (previousConfigurationOptionPath || previousDetailConfigurationPath) ?
                    console.log({
                        msg: 'UPDATED && SAME AS ORIGINAL',
                        updatedCOV,
                        previousConfigurationOptionPath,
                        previousDetailConfigurationPath,
                    }) ||
                    // remove from state if updating back to original path
                    configurations.filter((_, i) => i !== index)
                    :
                    console.log({
                        msg: 'UPDATED && NOT SAME AS ORIGINAL',
                        updatedCOV,
                        previousConfigurationOptionPath,
                        previousDetailConfigurationPath,
                    }) ||
                    // replace in state if updating previously updated item
                    replace(configurations, index, newCOV)
                :
                (
                    ((previousConfigurationOptionPath || previousDetailConfigurationPath) === defaultPath)
                    ||
                    optionalConfigurationsToUnselect.some(({ detailType, configurationType }) => {
                        const defaultDetailType = getDetailTypeFromPath(defaultPath);
                        const defaultConfigurationType = getConfigurationTypeFromPath(defaultPath);
                        return defaultDetailType === detailType && defaultConfigurationType === configurationType
                    })
                ) ?
                    console.log({
                        msg: 'NOT UPDATED && NOT SAME OR IS IN OPTIONAL CONFIGURATIONS',
                        updatedCOV,
                        previousConfigurationOptionPath,
                        previousDetailConfigurationPath,
                    }) ||

                    // leave state if option value is already selected or if item is in OptionConfigurationsToUnselect
                    configurations
                    :
                    console.log({
                        msg: 'NOT UPDATED && ADDING TO STATE',
                        updatedCOV,
                        previousConfigurationOptionPath,
                        previousDetailConfigurationPath,
                    }) ||
                    // add to state if updating non-previously updated item
                    configurations.concat(newCOV),
        optionalConfigurationsToUnselect: optionalConfigurationsToUnselect
            .filter(({ detailType, configurationType }) => {
                const defaultDetailType = getDetailTypeFromPath(defaultPath);
                const defaultConfigurationType = getConfigurationTypeFromPath(defaultPath);
                return !(defaultDetailType === detailType && defaultConfigurationType === configurationType)
            }),
    };
}
