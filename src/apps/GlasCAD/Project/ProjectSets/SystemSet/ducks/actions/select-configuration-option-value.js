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

    // console.log({ configurations });

    const groupedOptionValues = mergeOptionGroupValues(_systemSetOptionGroupValues, optionGroupValues);
    const defaultPath = getDefaultPath(payloadPath, systemMap, groupedOptionValues);
    // console.log({
    //     payloadPath,
    //     defaultPath,
    // })
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

    // console.log({
    //     payloadPath,
    //     updatedCOV,
    //     newCOV,
    // })

    return {
        ...arguments[1],
        configurations:
            updatedCOV ?
                defaultPath === (previousConfigurationOptionPath || previousDetailConfigurationPath) ?
                    // remove from state if updating back to original path
                    configurations.filter((_, i) => i !== index)
                    :
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

                    // leave state if option value is already selected or if item is in OptionConfigurationsToUnselect
                    configurations
                    :
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
