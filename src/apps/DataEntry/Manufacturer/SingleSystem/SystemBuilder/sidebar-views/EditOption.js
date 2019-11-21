import React from 'react';
import { withRouter } from 'react-router-dom';
import { getChildren, getLastItemFromPath } from '../../../../../../app-logic/system-utils';
import { TitleBar } from "../../../../../../components";
import BottomButtons from './modules/BottomButtons/BottomButtons';
import { OptionToggles } from './modules/item-toggles';
import ItemChildren from './modules/ItemChildren/ItemChildren';
import ItemName from './modules/ItemName/ItemName';
import ItemToggles from './modules/ItemToggles/ItemToggles';

function EditOption({
    location,
    match,
    selectItem,
    selectedItem: option = {},
    system,
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
            <ItemName
                {...{
                    queryResult,
                    system,
                    item: option,
                    itemName: optionName,
                    children,
                    dispatch,
                    systemMap,
                }}
            />
            <ItemToggles
                {...{
                    item: option,
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
