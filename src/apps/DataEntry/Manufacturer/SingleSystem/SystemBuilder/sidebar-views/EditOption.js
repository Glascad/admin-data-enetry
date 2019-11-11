import React from 'react';
import { withRouter } from 'react-router-dom';
import { getChildren, getLastItemFromPath } from '../../../../../../app-logic/system-utils';
import { TitleBar } from "../../../../../../components";
import { OptionAdditionGrouping } from './modules/add-item-grouping';
import { ItemLink } from './modules/item-link';
import { ItemMovement } from './modules/item-movement';
import { OptionNameSelect } from './modules/item-name-select';
import { OptionToggles } from './modules/item-toggles';
import ItemDelete from './modules/ItemDelete';

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

    const { path, } = option;

    const optionName = getLastItemFromPath(path);

    const optionChildValues = getChildren(option, systemMap);

    const validOptionValues = validOptions
        .reduce((values, { name, _validOptionValues }) => (
            optionName.toLowerCase() === name.toLowerCase() ?
                _validOptionValues
                :
                values
        ), []);

    const selectValidOptionValues = validOptionValues
        .filter(({ name }) => !optionChildValues.some(v => getLastItemFromPath(v.path) === name))
        .map(({ name }) => name);

    const optionIsGrouped = _optionGroups.some(({ name }) => name === optionName);

    return (
        <>
            <TitleBar
                title='Edit Option'
            />
            <OptionNameSelect
                {...{
                    _optionGroups,
                    validOptions,
                    option,
                    optionName,
                    children: optionChildValues,
                    dispatch,
                    systemMap,
                }}
            />
            <OptionToggles
                {...{
                    option,
                    optionIsGrouped,
                    dispatch,
                    systemMap,
                }}
            />
            <OptionAdditionGrouping
                {...{
                    validOptionValues,
                    option,
                    optionName,
                    optionIsGrouped,
                    children: optionChildValues,
                    selectValidOptionValues,
                    selectItem,
                    dispatch,
                    systemMap,
                }}
            />
            <ItemMovement
                {...{
                    item: option,
                    name: 'Option',
                    partialAction,
                    cancelPartial,
                    dispatchPartial,
                }}
            />
            <ItemLink
                {...{
                    path,
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
