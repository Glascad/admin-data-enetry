import { replace, unique } from "../../../../../../../utils";
import _ from 'lodash';
import { SELECT_DETAIL_OPTION_VALUE, SELECT_CONFIGURATION_OPTION_VALUE } from ".";
import { getDetailTypeFromPath, getConfigurationTypeFromPath } from "../../../../../../../app-logic/system";

export default function SELECT_OPTION_GROUP_VALUE({
    _systemSet: {
        _systemSetDetails = [],
        _systemSetConfigurations = [],
        _systemSetOptionGroupValues = [],
    },
}, {
    details = [],
    configurations = [],
    optionGroupValues = [],
}, [
    optionName,
    name,
    systemMap,
]) {
    // console.log(arguments);
    console.log({configurations})
    // find option group in query result
    const { name: oldValue } = _systemSetOptionGroupValues.find(ovg => ovg.optionName === optionName) || {};
    // then find option group in state
    const updatedOGV = optionGroupValues.find(ogv => ogv.optionName === optionName);
    const index = optionGroupValues.indexOf(updatedOGV);
    const newOGV = {
        // ...updatedOGV,
        optionName,
        name,
    };
    // get details that need to be updated
    const [newDOVs, DOVsToUpdate] = _.partition(
        details,
        ({ systemDetailPath, detailOptionValuePath }) => !(systemDetailPath || detailOptionValuePath).includes(`.${optionName}.`),
    );

    const DTPaths = unique(DOVsToUpdate
        .map(({ systemDetailPath, detailOptionValuePath }) => (systemDetailPath || detailOptionValuePath))
        .concat(_systemSetDetails
            .map(({ detailOptionValuePath, systemDetailPath }) => detailOptionValuePath || systemDetailPath)
            .filter(path => path.includes(`.${optionName}`))
        )
        // .map(path => path.replace(/(\.__CT__\.\w+)\..*$/, '$1')) // old way delete if not using
        .map(path => path.replace(new RegExp(`(^.*${optionName})\\..*$`), '$1'))
    );

    const detailTypes = DTPaths.map(getDetailTypeFromPath);

    // within details that don't need to be updated, get configurations that need to be updated
    const [newCOVs, COVsToUpdate] = _.partition(
        configurations,
        ({ detailConfigurationPath, configurationOptionValuePath }) => !newDOVs
            .some(dov => (detailConfigurationPath || configurationOptionValuePath)
                .startsWith(dov.systemDetailPath || dov.detailOptionValuePath))
    );
    const CTPaths = unique(COVsToUpdate
        .map(({ detailConfigurationPath, configurationOptionValuePath }) => (detailConfigurationPath || configurationOptionValuePath))
        .concat(_systemSetConfigurations.map(({ configurationOptionValuePath, detailConfigurationPath }) => configurationOptionValuePath || detailConfigurationPath))
        // .map(path => path.replace(/(\.__CT__\.\w+)\..*$/, '$1')) // old way, delete if working
        .map(path => path.replace(new RegExp(`(^.*${optionName})\\..*$`), '$1'))
        .filter(path => !detailTypes.includes(getDetailTypeFromPath(path)))
    );
    const configurationTypes = CTPaths.map(getConfigurationTypeFromPath);

    console.log({
        configurations,
        newCOVs,
        COVsToUpdate,
        DTPaths,
        CTPaths,
    })

    const systemSetWithUpdatedOptionGroupValue = {
        ...arguments[1],
        optionGroupValues: oldValue === name ?
            // if option group value is same as query result, then remove from state,
            optionGroupValues.filter((_, i) => i !== index)
            :
            updatedOGV ?
                // otherwise if option group is in state, update in state
                replace(optionGroupValues, index, newOGV)
                :
                // otherwise add to state
                optionGroupValues.concat(newOGV),
        details: newDOVs,
        configurations: newCOVs,
    }

    const systemSetWithUpdatedDetails = DTPaths.reduce((systemSetUpdate, path) => (
        SELECT_DETAIL_OPTION_VALUE(
            arguments[0],
            systemSetUpdate,
            [
                path,
                systemMap,
            ],
        )
    ), systemSetWithUpdatedOptionGroupValue)



    // update configurations
    const systemSetWithUpdatedConfigurations =  CTPaths.reduce((systemSetUpdate, path) => (
        SELECT_CONFIGURATION_OPTION_VALUE(
            arguments[0],
            systemSetUpdate,
            [
                path,
                systemMap,
            ],
        )
        // update details
    ), systemSetWithUpdatedDetails)

    console.log({
        systemSetWithUpdatedOptionGroupValue,
        systemSetWithUpdatedDetails,
        systemSetWithUpdatedConfigurations,
    })

    return systemSetWithUpdatedConfigurations;

}
