import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { getChildren, getLastItemFromPath, getParent, getSiblings } from '../../../../../../app-logic/system-utils';
import { TitleBar } from '../../../../../../components';
import { match } from '../../../../../../utils';
import BottomButtons from './modules/BottomButtons/BottomButtons';
import { ValueToggles } from './modules/item-toggles';
import ItemChildren from './modules/ItemChildren/ItemChildren';
import ItemName from './modules/ItemName/ItemName';
import ItemToggles from './modules/ItemToggles/ItemToggles';


function EditOptionValue({
    location,
    match: systemMatch,
    selectItem,
    selectedItem: optionValue,
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

    const valueParentOption = getParent(optionValue, systemMap);
    const valueSiblings = getSiblings(optionValue, systemMap);
    const children = getChildren(optionValue, systemMap);

    const {
        path: oPath,
        __typename: oTypename,
    } = valueParentOption;

    const oName = getLastItemFromPath(oPath);
    const oVName = getLastItemFromPath(path);

    const optionIsGrouped = _optionGroups.some(({ name }) => name === oName);

    const [defaultKey, isDefault] = Object.entries(valueParentOption).find(([key, value]) => key.match(/default/i) && value === oVName) || [];

    const validValues = validOptions
        .reduce((valueSiblings, { name, _validOptionValues }) => (
            oName.toLowerCase() === name.toLowerCase() ?
                _validOptionValues
                :
                valueSiblings
        ), []);

    const selectValidValues = validValues
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
            'Part'

    const [optionSelected, setOptionIsSelected] = useState(true);

    const hasChildren = !!childTypename;
    const optionIsSelected = hasChildren ?
        !!childTypename.match(/option/i)
        :
        optionSelected;
    
    console.log(optionValue);

    return (
        <>
            <TitleBar
                title="Edit Option Value"
            />
            <ItemName
                {...{
                    item: optionValue,
                    itemName: oVName,
                    selectOptions: selectValidValues,
                    optionIsGrouped,
                    children,
                    dispatch,
                    systemMap,
                }}
            />
            <ItemToggles
                {...{
                    item: optionValue,
                    itemName: oVName,
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
                    item: optionValue,
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
                    item: optionValue,
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
