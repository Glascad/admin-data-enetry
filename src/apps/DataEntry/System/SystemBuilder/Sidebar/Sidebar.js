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
    console.log(arguments[0]);

    const itemName = getLastItemFromPath(path);

    const children = getChildren(item, systemMap);

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
                    queryResult,
                    system,
                    item,
                    itemName,
                    children,
                    name,
                    dispatch,
                    systemMap,
                }}
            />
            <ItemToggles
                {...{
                    system,
                    item,
                    itemName,
                    name,
                    dispatch,
                    systemMap,
                }}
            />
            <ItemChildren
                {...{
                    queryResult,
                    system,
                    item,
                    itemName,
                    children,
                    selectItem,
                    dispatch,
                    systemMap,
                }}
            />
            <BottomButtons
                {...{
                    match,
                    location,
                    system,
                    item,
                    name,
                    partialAction,
                    cancelPartial,
                    dispatchPartial,
                    dispatch,
                    systemMap,
                }}
            />
        </RightSidebar>
    ) : null;
}
