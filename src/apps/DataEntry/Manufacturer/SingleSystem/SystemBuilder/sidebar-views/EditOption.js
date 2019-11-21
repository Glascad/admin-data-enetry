import React from 'react';
import { withRouter } from 'react-router-dom';
import { getChildren, getLastItemFromPath } from '../../../../../../app-logic/system-utils';
import { TitleBar } from "../../../../../../components";
import { OptionAdditionGrouping } from './modules/add-item-grouping';
import { ItemLink } from './modules/item-link';
import { OptionNameSelect } from './modules/item-name-select';
import { OptionToggles } from './modules/item-toggles';
import ItemDelete from './modules/ItemDelete';
import ItemMovement from './modules/ItemMovement';
import OptionChildren from './modules/ItemChildren/OptionChildren';
import BottomButtons from './modules/BottomButtons/BottomButtons';
import ItemChildren from './modules/ItemChildren/ItemChildren';

function EditOption({
    location,
    match,
    selectItem,
    selectedItem: option = {},
    system: {
        _optionGroups,
    },
    systemMap,
    queryResult,
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

    const children = getChildren(option, systemMap);

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
                    children,
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
            <ItemChildren
                {...{
                    queryResult,
                    item: option,
                    itemName: optionName,
                    optionIsGrouped,
                    children,
                    selectItem,
                    dispatch,
                    systemMap,
                }}
            />
            <BottomButtons
                {...{
                    item: option,
                    name: 'Option',
                    match,
                    location,
                    partialAction,
                    cancelPartial,
                    dispatchPartial,
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
