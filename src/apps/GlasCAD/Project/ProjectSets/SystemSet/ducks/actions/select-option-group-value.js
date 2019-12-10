import { replace, unique } from "../../../../../../../utils";
import _ from 'lodash';
import { SELECT_DETAIL_OPTION_VALUE, SELECT_CONFIGURATION_OPTION_VALUE } from ".";
import { getDetailTypeFromPath, getConfigurationTypeFromPath } from "../../../../../../../app-logic/system-utils";

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
    console.log(arguments);
    // find option group in query result
    const { name: oldValue } = _systemSetOptionGroupValues.find(ovg => ovg.optionName === optionName) || {};
    // then find option group in state
    const updatedOGV = optionGroupValues.find(ogv => ogv.optionName === optionName);
    const index = optionGroupValues.indexOf(updatedOGV);
    const newOGV = {
        ...updatedOGV,
        optionName,
        name,
    };
    // get details that need to be updated
    const [newDOVs, DOVsToUpdate] = _.partition(
        details,
        ({ systemDetailPath, detailOptionValuePath }) => !(systemDetailPath || detailOptionValuePath || '').includes(`.${optionName}.`),
    );
    const DTPaths = unique(DOVsToUpdate
        .map(({ systemDetailPath, detailOptionValuePath }) => (systemDetailPath || detailOptionValuePath))
        .concat(_systemSetDetails
            .map(({ detailOptionValuePath }) => detailOptionValuePath)
            .filter(path => path.includes(`.${optionName}`))
        )
        .map(path => path.replace(/(\.__DT__\.\w+)\..*$/, '$1'))
    );
    const detailTypes = DTPaths.map(getDetailTypeFromPath);
    // within details that don't need to be updated, get configurations that need to be updated
    const [newCOVs, COVsToUpdate] = _.partition(
        configurations,
        ({ systemDetailPath, detailOptionValuePath }) => !newDOVs.some(dov => (systemDetailPath || detailOptionValuePath).startsWith(dov.systemDetailPath || dov.detailOptionValuePath)),
    );
    const CTPaths = unique(COVsToUpdate
        .map(({ systemDetailPath, detailOptionValuePath }) => (systemDetailPath || detailOptionValuePath))
        .concat(_systemSetConfigurations.map(({ configurationOptionValuePath }) => configurationOptionValuePath))
        .map(path => path.replace(/(\.__CT__\.\w+)\..*$/, '$1'))
        .filter(path => !detailTypes.includes(getDetailTypeFromPath(path)))
    );
    const configurationTypes = CTPaths.map(getConfigurationTypeFromPath);
    // update configurations
    return CTPaths.reduce((systemSetUpdate, path) => (
        SELECT_CONFIGURATION_OPTION_VALUE(
            arguments[0],
            systemSetUpdate,
            [
                path,
                systemMap,
            ],
        )
        // update details
    ), DTPaths.reduce((systemSetUpdate, path) => (
        SELECT_DETAIL_OPTION_VALUE(
            arguments[0],
            systemSetUpdate,
            [
                path,
                systemMap,
            ],
        )
    ), {
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
    }))
}
