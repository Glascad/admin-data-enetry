import React from 'react';
import { withRouter } from 'react-router-dom';
import { getChildren, getLastItemFromPath } from '../../../../../../app-logic/system-utils';
import { TitleBar } from "../../../../../../components";
import { OptionAdditionGrouping } from './modules/add-item-grouping';
import { ItemDelete } from './modules/item-delete';
import { ItemLink } from './modules/item-link';
import { ItemMovement } from './modules/item-movement';
import { OptionNameSelect } from './modules/item-name-select';
import { OptionToggles } from './modules/item-toggles';

function EditOption({
    location,
    match,
    selectItem,
    selectedItem: option = {},
    system: {
        _optionGroups,
    },
    systemMap,
    queryResult: {
        validOptions = [],
    } = {},
    dispatch,
    dispatchPartial,
    partialAction,
    cancelPartial,
}) {
    console.log(arguments[0])

    const {
        path: oPath,
        __typename,
        [defaultKey]: defaultValue,
    } = option;

    const defaultKey = Object.keys(option).find(k => k.match(/default/i));
    const optionName = getLastItemFromPath(oPath);

    const optionValues = getChildren(option, systemMap);

    const validOptionValues = validOptions
        .reduce((values, { name, _validOptionValues }) => (
            optionName.toLowerCase() === name.toLowerCase() ?
                _validOptionValues
                :
                values
        ), []);

    const selectValidOptionValues = validOptionValues
        .filter(({ name }) => !optionValues.some(v => getLastItemFromPath(v.path) === name))
        .map(({ name }) => name);

    const optionIsGrouped = _optionGroups.some(({ name }) => name === optionName);

    return (
        <>
            <TitleBar
                title='Edit Option'
            />
            <OptionNameSelect
                {...{
                    optionValues,
                    oPath,
                    option,
                    optionName,
                    validOptions,
                    __typename,
                    systemMap,
                    dispatch,
                    _optionGroups,
                }}
            />
            <OptionToggles
                {...{
                    oPath,
                    option,
                    optionIsGrouped,
                    dispatch,
                    systemMap,
                }}
            />
            <OptionAdditionGrouping
                {...{
                    option,
                    oPath,
                    optionName,
                    __typename,
                    optionIsGrouped,
                    optionValues,
                    selectValidOptionValues,
                    validOptionValues,
                    selectItem,
                    dispatch,
                    systemMap,
                }}
            />
            <ItemMovement
                {...{
                    item: option,
                    path: oPath,
                    name: 'Option',
                    partialAction,
                    cancelPartial,
                    dispatchPartial,
                }}
            />
            <ItemLink
                {...{
                    path: oPath,
                    match,
                    location,
                }}
            />
            <ItemDelete
                {...{
                    item: option,
                    name: 'Option',
                    dispatch,
                    systemMap,
                }}
            />
        </>
    );
}

export const SystemOption = {
    title: "Edit Option",
    component: withRouter(EditOption),
};

export const DetailOption = SystemOption;
export const ConfigurationOption = DetailOption;
