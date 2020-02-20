import { replace, unique } from "../../../../../../../utils";
import _ from 'lodash';
import { SELECT_DETAIL_OPTION_VALUE, SELECT_CONFIGURATION_OPTION_VALUE } from "../actions";
import { getDetailTypeFromPath, getConfigurationTypeFromPath } from "../../../../../../../app-logic/system";

export default function SELECT_OPTION_GROUP_VALUE({
    _systemSet: {
        _systemSetDetails = [],
        _systemSetConfigurations = [],
        _systemSetOptionGroupValues = [],
    },
}, {
    systemId,
    details = [],
    configurations = [],
    optionGroupValues = [],
}, [
    optionName,
    name,
    systemMap,
]) {
    // console.log(arguments);
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
    // get details that need to be updated from state and query results 
    console.log({ details });
    const [newDOVs, DOVsToUpdate] = _.partition(
        details,
        ({ systemDetailPath, detailOptionValuePath }) => !(systemDetailPath || detailOptionValuePath).includes(`.${optionName}.`),
    );

    const allDOVsToUpdate = _systemSetDetails
        .filter(({ detailOptionValuePath, systemDetailPath }) => (
            (detailOptionValuePath || systemDetailPath).startsWith(systemId || '')
            &&
            (systemDetailPath || detailOptionValuePath).includes(`.${optionName}.`)
        ))
        .concat(DOVsToUpdate);

    const DTPaths = unique(allDOVsToUpdate
        .map(({ systemDetailPath, detailOptionValuePath }) => (systemDetailPath || detailOptionValuePath))
        .map(path => path.replace(new RegExp(`(^.*${optionName})\\..*$`), '$1'))
    );

    const detailTypes = DTPaths.map(getDetailTypeFromPath);

    // within details that don't need to be updated, get configurations that need to be updated
    const COVsToUpdate = configurations.filter(
        ({ detailConfigurationPath, configurationOptionValuePath }) => (
            !allDOVsToUpdate
                .some(dov => (detailConfigurationPath || configurationOptionValuePath)
                    .startsWith(dov.systemDetailPath || dov.detailOptionValuePath))
        ));

    const allCOVsToUpdate = _systemSetConfigurations
        .filter(({ detailConfigurationPath, configurationOptionValuePath }) =>
            (detailConfigurationPath || configurationOptionValuePath).match(new RegExp(`^${systemId || ''}\..*__CT__.*\\.${optionName}\\.`))
            &&
            !configurations
                .some(({ detailConfigurationPath: cDCP, configurationOptionValuePath: cCOVP }) =>
                    (
                        getDetailTypeFromPath(detailConfigurationPath || configurationOptionValuePath) === getDetailTypeFromPath(cDCP || cCOVP)
                        &&
                        getConfigurationTypeFromPath(detailConfigurationPath || configurationOptionValuePath) === getConfigurationTypeFromPath(cDCP || cCOVP)
                    )
                ))
        .concat(COVsToUpdate);

    const CTPaths = unique(allCOVsToUpdate
        .map(({ detailConfigurationPath, configurationOptionValuePath }) => (detailConfigurationPath || configurationOptionValuePath))
        .map(path => path.replace(new RegExp(`(^.*${optionName})\\..*$`), '$1'))
        .filter(path => !detailTypes.includes(getDetailTypeFromPath(path)))
    );

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
        details,
        configurations,
    }
    // console.log({ systemSetWithUpdatedOptionGroupValue })

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


    // console.log({ systemSetWithUpdatedDetails })

    // update configurations
    const systemSetWithUpdatedConfigurations = CTPaths.reduce((systemSetUpdate, path) => (
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

    // console.log({ systemSetWithUpdatedConfigurations })

    return systemSetWithUpdatedConfigurations;

}
