import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { getChildren, getLastItemFromPath, getParent, getSiblings } from '../../../../../../app-logic/system-utils';
import { TitleBar } from '../../../../../../components';
import { match } from '../../../../../../utils';
import BottomButtons from './modules/BottomButtons/BottomButtons';
import ItemChildren from './modules/ItemChildren/ItemChildren';
import ItemName from './modules/ItemName/ItemName';
import ItemToggles from './modules/ItemToggles/ItemToggles';


function EditOptionValue({
    location,
    match: systemMatch,
    selectItem,
    selectedItem: item,
    selectedItem: {
        path,
        __typename,
    },
    system,
    system: {
        _optionGroups
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

    const children = getChildren(item, systemMap);
    
    const valueParentOption = getParent(item, systemMap);
    const {
        path: oPath,
        __typename: oTypename,
    } = valueParentOption;
    
    const oName = getLastItemFromPath(oPath);
    const itemName = getLastItemFromPath(path);
    
    const optionIsGrouped = _optionGroups.some(({ name }) => name === oName);
    
    const [defaultKey, isDefault] = Object.entries(valueParentOption).find(([key, value]) => key.match(/default/i) && value === itemName) || [];
    
    const valueSiblings = getSiblings(item, systemMap);
    const validValues = validOptions
        .reduce((valueSiblings, { name, _validOptionValues }) => (
            oName.toLowerCase() === name.toLowerCase() ?
                _validOptionValues
                :
                valueSiblings
        ), []);

    const selectOptions = validValues
        .filter(({ name }) => !valueSiblings.some(v => getLastItemFromPath(v.path) === name))
        .map(({ name }) => name);

    const {
        0: child,
        0: {
            path: childPath = '',
            __typename: childTypename = ''
        } = {},
    } = children;

    const childName = child ? getLastItemFromPath(childPath) : '';

    const childTypeType = __typename.match(/SystemOption/i) ?
        'Detail'
        :
        __typename.match(/DetailOption/i) ?
            'Configuration'
            :
            'Part';

    const [optionSelected, setOptionIsSelected] = useState(true);

    const hasChildren = !!childTypename;
    const optionIsSelected = hasChildren ?
        !!childTypename.match(/option/i)
        :
        optionSelected;

    console.log(item);

    return (
        <>
            <TitleBar
                title="Edit Option Value"
            />
            <ItemName
                {...{
                    item,
                    itemName,
                    selectOptions,
                    optionIsGrouped,
                    children,
                    dispatch,
                    systemMap,
                }}
            />
            <ItemToggles
                {...{
                    item,
                    itemName,
                    isDefault,
                    optionIsGrouped,
                    dispatch,
                    systemMap,
                }}
            />
            <ItemChildren
                {...{
                    system,
                    queryResult,
                    item,
                    children,
                    child,
                    childTypeType,
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
                    parentOptionIsGrouped: optionIsGrouped,
                    name: 'Value',
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

export const SystemOptionValue = {
    title: "Edit Option Value",
    component: withRouter(EditOptionValue),
};

export const DetailOptionValue = SystemOptionValue;
export const ConfigurationOptionValue = DetailOptionValue;
