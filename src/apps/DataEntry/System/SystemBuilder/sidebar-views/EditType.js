import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { getChildren, getLastItemFromPath, getSiblings } from '../../../../../../app-logic/system-utils';
import { TitleBar } from '../../../../../../components';
import BottomButtons from './modules/BottomButtons/BottomButtons';
import ValueAndTypeChildren from './modules/ItemChildren/ValueAndTypeChildren';
import ItemName from './modules/ItemName/ItemName';
import ItemToggles from './modules/ItemToggles/ItemToggles';


function EditType({
    location,
    match,
    selectItem,
    selectedItem: item,
    selectedItem: {
        __typename,
        path = '',
        optional,
    } = {},
    system,
    systemMap,
    queryResult,
    queryResult: {
        detailTypes = [],
        configurationTypes = [],
        partTypes = [],
    } = {},
    dispatch,
    dispatchPartial,
    partialAction,
    cancelPartial,
}) {
    console.log(arguments[0]);

    const isDetail = !!__typename.match(/Detail/i);
    const name = __typename.replace(/^(System|Detail|Configuration)(\w+)/i, '$2');

    const children = getChildren(item, systemMap);

    const {
        0: child,
        0: {
            path: childPath = '',
            __typename: childTypename,
        } = {},
    } = children;
    
    const childName = getLastItemFromPath(childPath);

    const [optionSelected, setOptionIsSelected] = useState(true);

    const optionIsSelected = children.length > 1 ?
        !!childTypename.match(/option/i)
        :
        optionSelected;

    const itemName = getLastItemFromPath(path, systemMap);

    const siblings = getSiblings(item, systemMap);

    const selectValidTypes = __typename.match(/detail/i) ?
        detailTypes
        :
        __typename.match(/configuration$/i) ?
            configurationTypes
            :
            partTypes;

    const selectOptions = selectValidTypes
        .filter(name => !siblings.some(({ path: typePath }) =>
            name.toLowerCase() === getLastItemFromPath(typePath).toLowerCase()
        ));

    return (
        <>
            <TitleBar
                title={`Edit ${name}`}
            />
            <ItemName
                {...{
                    name,
                    item,
                    itemName,
                    selectOptions,
                    children,
                    dispatch,
                }}
            />
            <ItemToggles
                {...{
                    item,
                    name,
                    optional,
                    dispatch,
                    // systemMap,
                }}
            />
            <ValueAndTypeChildren
                {...{
                    system,
                    queryResult,
                    item,
                    children,
                    child,
                    childName,
                    optionIsSelected,
                    setOptionIsSelected,
                    selectItem,
                    dispatch,
                    systemMap,
                }}
            />
            <BottomButtons
                {...{
                    item,
                    name,
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

const EditWithRouter = withRouter(EditType);

export const System = {
    title: 'Edit System',
    component: EditWithRouter,
}

export const SystemDetail = {
    title: "Edit Detail",
    component: EditWithRouter,
};

export const DetailConfiguration = {
    title: "Edit Configuration",
    component: EditWithRouter,
};
