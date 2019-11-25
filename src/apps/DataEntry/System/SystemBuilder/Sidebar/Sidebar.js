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
    selectedItem,
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

    const children = getChildren(selectedItem, systemMap);

    const name = __typename.replace(/^.*([A-Z]\w+)$/, '$1');

    return selectedItem ? (
        <RightSidebar
            open={!!selectedItem}
            handleCloseClick={() => selectItem()}
        >
            <TitleBar
                title={`Edit ${name}`}
            />
            <ItemName
                {...{
                    queryResult,
                    system,
                    selectedItem,
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
                    selectedItem,
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
                    selectedItem,
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
                    selectedItem,
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
