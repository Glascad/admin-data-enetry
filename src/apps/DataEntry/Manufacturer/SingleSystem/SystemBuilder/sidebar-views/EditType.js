import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { getChildren, getLastItemFromPath, getSiblings } from '../../../../../../app-logic/system-utils';
import { TitleBar } from '../../../../../../components';
import { ItemLink } from './modules/item-link';
import { TypeNameSelect } from './modules/item-name-select';
import { TypeToggles } from './modules/item-toggles';
import ValueAndTypeChildren from './modules/ItemChildren/ValueAndTypeChildren';
import ItemDelete from './modules/ItemDelete';
import ItemMovement from './modules/ItemMovement';
import { match } from '../../../../../../utils';
import BottomButtons from './modules/BottomButtons/BottomButtons';
import ItemChildren from './modules/ItemChildren/ItemChildren';


function EditType({
    location,
    match,
    selectItem,
    selectedItem: selectedType,
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
    const type = __typename.replace(/^(System|Detail|Configuration)(\w+)/i, '$2');

    const children = getChildren(selectedType, systemMap);

    const {
        0: child,
        0: {
            path: childPath = '',
            __typename: childTypename,
        } = {},
    } = children;

    const [optionSelected, setOptionIsSelected] = useState(true);

    const optionIsSelected = children.length > 1 ?
        !!childTypename.match(/option/i)
        :
        optionSelected;

    const tName = getLastItemFromPath(path, systemMap);
    const childName = getLastItemFromPath(childPath);

    const siblings = getSiblings(selectedType, systemMap);

    const selectValidTypes = __typename.match(/detail/i) ?
        detailTypes
        :
        __typename.match(/configuration$/i) ?
            configurationTypes
            :
            partTypes;

    const selectTypes = selectValidTypes
        .filter(name => !siblings.some(({ path: typePath }) =>
            name.toLowerCase() === getLastItemFromPath(typePath).toLowerCase()
        ));

    return (
        <>
            <TitleBar
                title={`Edit ${type}`}
            />
            <TypeNameSelect
                {...{
                    type,
                    selectedType,
                    tName,
                    child,
                    oName: childName,
                    selectTypes,
                    dispatch,
                }}
            />
            <TypeToggles
                {...{
                    selectedType,
                    type,
                    optional,
                    dispatch,
                }}
            />
            <ValueAndTypeChildren
                {...{
                    system,
                    queryResult,
                    item: selectedType,
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
                    item: selectedType,
                    name: isDetail ? 'Detail' : 'Configuration',
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
