import React from 'react';
import ItemName from '../sidebar-views/modules/ItemName/ItemName';
import { TitleBar, RightSidebar } from '../../../../../components';
import ItemToggles from '../sidebar-views/modules/ItemToggles/ItemToggles';
import { getLastItemFromPath, getChildren } from '../../../../../app-logic/system-utils';
import ItemChildren from '../sidebar-views/modules/ItemChildren/ItemChildren';
import BottomButtons from '../sidebar-views/modules/BottomButtons/BottomButtons';

export default function Sidebar({
    queryResult,
    system,
    system: {
        _optionGroups = [],
    },
    systemMap,
    dispatch,
    selectItem,
    selectedItem: item,
    selectedItem: {
        path,
        __typename = '',
    } = {},
    dispatchPartial,
    partialAction,
    cancelPartial,
    match,
    location,
}) {

    const itemName = getLastItemFromPath(path);

    const children = getChildren(item, systemMap);

    const optionIsGrouped = _optionGroups.some(({ name }) => name === itemName);

    const name = __typename.replace(/^.*([A-Z]\w+)$/, '$1');

    return item ? (
        <RightSidebar
            open={!!item}
            handleCloseClick={() => selectItem()}
        >
            <TitleBar
                title={`Edit ${name}`}
            />
            <ItemName
                {...{
                    optionIsGrouped,
                    queryResult,
                    system,
                    systemMap,
                    name,
                    item,
                    dispatch,
                    children,
                    itemName,
                }}
            />
            <ItemToggles
                {...{
                    itemName,
                    name,
                    optionIsGrouped,
                    item,
                    dispatch,
                    systemMap,
                }}
            />
            <ItemChildren
                {...{
                    itemName,
                    optionIsGrouped,
                    system,
                    queryResult,
                    item,
                    children,
                    selectItem,
                    dispatch,
                    systemMap,
                }}
            />
            <BottomButtons
                {...{
                    item,
                    match,
                    location,
                    partialAction,
                    cancelPartial,
                    dispatchPartial,
                    dispatch,
                    systemMap,
                    name,
                }}
            />
        </RightSidebar>
    ) : null;
}
