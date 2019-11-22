import React from 'react';
import { withRouter } from 'react-router-dom';
import { getChildren, getLastItemFromPath } from '../../../../../../app-logic/system-utils';
import { TitleBar } from "../../../../../../components";
import BottomButtons from './modules/BottomButtons/BottomButtons';
import ItemChildren from './modules/ItemChildren/ItemChildren';
import ItemName from './modules/ItemName/ItemName';
import ItemToggles from './modules/ItemToggles/ItemToggles';

function EditOption({
    location,
    match,
    selectItem,
    selectedItem: item = {},
    selectedItem: {
        path,
    } = {},
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
    console.log(arguments[0]);

    const itemName = getLastItemFromPath(path);

    const children = getChildren(item, systemMap);

    const optionIsGrouped = _optionGroups.some(({ name }) => name === itemName);

    return (
        <>
            <TitleBar
                title='Edit Option'
            />
            <ItemName
                {...{
                    queryResult,
                    system,
                    item,
                    itemName,
                    children,
                    dispatch,
                    systemMap,
                }}
            />
            <ItemToggles
                {...{
                    item,
                    optionIsGrouped,
                    dispatch,
                    systemMap,
                }}
            />
            <ItemChildren
                {...{
                    queryResult,
                    item,
                    itemName,
                    optionIsGrouped,
                    children,
                    selectItem,
                    dispatch,
                    systemMap,
                }}
            />
            <BottomButtons
                {...{
                    item,
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
