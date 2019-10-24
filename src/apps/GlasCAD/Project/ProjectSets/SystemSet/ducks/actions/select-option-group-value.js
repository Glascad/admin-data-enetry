import { replace, unique } from "../../../../../../../utils";
import _ from 'lodash';
import { SELECT_DETAIL_OPTION_VALUE, SELECT_CONFIGURATION_OPTION_VALUE } from ".";

export default function SELECT_OPTION_GROUP_VALUE({
    _systemSet: {
        _systemSetDetailOptionValues = [],
        _systemSetConfigurationOptionValues = [],
        _systemSetOptionGroupValues = [],
    },
}, {
    detailOptionValues = [],
    configurationOptionValues = [],
    optionGroupValues = [],
}, [
    optionName,
    name,
    systemMap,
]) {
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
        detailOptionValues,
        ({ oldPath, newPath }) => !(oldPath || newPath).includes(`.${optionName}.`),
    );
    const DTPaths = unique(DOVsToUpdate
        .map(({ oldPath, newPath }) => (oldPath || newPath))
        .concat(_systemSetDetailOptionValues.map(({ detailOptionValuePath }) => detailOptionValuePath))
        .map(path => path.replace(/(\.__DT__\.\w+)\..*$/, '$1'))
    );
    // within details that don't need to be updated, get configurations that need to be updated
    const [newCOVs, COVsToUpdate] = _.partition(
        configurationOptionValues,
        ({ oldPath, newPath }) => !newDOVs.some(dov => (oldPath || newPath).startsWith(dov.oldPath || dov.newPath)),
    );
    const CTPaths = unique(COVsToUpdate
        .map(({ oldPath, newPath }) => (oldPath || newPath))
        .concat(_systemSetConfigurationOptionValues.map(({ configurationOptionValuePath }) => configurationOptionValuePath))
        .map(path => path.replace(/(\.__CT__\.\w+)\..*$/, '$1'))
        //need some filtering here...
    );
    console.log({
        CTPaths,
        DTPaths,
    });
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
        detailOptionValues: newDOVs,
        configurationOptionValues: newCOVs,
    }))
}
