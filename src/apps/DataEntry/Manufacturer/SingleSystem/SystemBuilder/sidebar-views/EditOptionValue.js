import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { getChildren, getLastItemFromPath, getParent, getSiblings } from '../../../../../../app-logic/system-utils';
import { TitleBar } from '../../../../../../components';
import { match } from '../../../../../../utils';
import { ValueAdditionGrouping } from './modules/add-item-grouping';
import { ItemDelete } from './modules/item-delete';
import { ItemLink } from './modules/item-link';
import { ItemMovement } from './modules/item-movement';
import { ValueNameSelect } from './modules/item-name-select';
import { ValueToggles } from './modules/item-toggles';


function EditOptionValue({
    location,
    match: systemMatch,
    selectItem,
    selectedItem: optionValue,
    selectedItem: {
        path: ovPath,
        __typename,
    },
    system: {
        _optionGroups
    },
    systemMap,
    queryResult: {
        validOptions = [],
        detailTypes = [],
        configurationTypes = [],
    } = {},
    dispatch,
    dispatchPartial,
    partialAction,
    cancelPartial,
}) {
    console.log(arguments[0]);

    const option = getParent(optionValue, systemMap);
    const values = getSiblings(optionValue, systemMap);
    const valueChildren = getChildren(optionValue, systemMap);

    const { path: oPath, __typename: oTypename } = option;

    const oName = oPath.replace(/^.*\.(\w+)$/, '$1');
    const oVName = ovPath.replace(/^.*\.(\w+)$/, '$1');

    const optionIsGrouped = _optionGroups.some(({ name }) => name === oName);

    const isDefault = option[Object.keys(option).find(k => k.match(/default/i))] === oVName;

    const validValues = validOptions
        .reduce((values, { name, _validOptionValues }) => (
            oName.toLowerCase() === name.toLowerCase() ?
                _validOptionValues
                :
                values
        ), []);

    const selectValidValues = validValues
        .filter(({ name }) => !values.some(v => getLastItemFromPath(v.path) === name))
        .map(({ name }) => name);

    const {
        0: childOption,
        0: {
            path: childOptionPath = '',
            __typename: childTypename = ''
        } = {},
    } = valueChildren;

    const childOptionName = childOption ? getLastItemFromPath(childOptionPath) : '';

    const childOptionChildren = getChildren(childOption, systemMap); // Option Value's Child's Child

    const childTypeTypename = match(__typename)
        .regex(/^System/, 'SystemDetail')
        .regex(/^Detail/, 'DetailConfiguration')
        .otherwise('ConfigurationPart');

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

    const selectValidTypes = childTypename.match(/system/i) ?
        detailTypes
        :
        configurationTypes;

    const selectTypes = selectValidTypes
        .filter(name => !valueChildren.some(({ path: childTypePath }) =>
            name.toLowerCase() === getLastItemFromPath(childTypePath).toLowerCase()
        ));

    return (
        <>
            <TitleBar
                title="Edit Option Value"
            />
            <ValueNameSelect
                {...{
                    selectValidValues,
                    dispatch,
                    ovPath,
                    __typename,
                    systemMap,
                    optionIsGrouped,
                    oVName,
                    hasChildren,
                }}
            />
            <ValueToggles
                {...{
                    __typename,
                    oVName,
                    isDefault,
                    oPath,
                    oTypename,
                    optionIsGrouped,
                    dispatch,
                    systemMap,
                }}
            />
            <ValueAdditionGrouping
                {...{
                    _optionGroups,
                    ovPath,
                    __typename,
                    optionIsSelected,
                    hasChildren,
                    valueChildren,
                    childOption,
                    childOptionPath,
                    childTypeType,
                    childTypeTypename,
                    childOptionChildren,
                    childOptionName,
                    childTypename,
                    selectTypes,
                    optionValue,
                    validOptions,
                    selectValidTypes,
                    setOptionIsSelected,
                    selectItem,
                    dispatch,
                    systemMap,
                }}
            />
            <ItemMovement
                {...{
                    item: optionValue,
                    path: ovPath,
                    name: 'Value',
                    partialAction,
                    cancelPartial,
                    dispatchPartial,
                }}
            />
            <ItemLink
                {...{
                    path: ovPath,
                    match: systemMatch,
                    location,
                }}
            />
            <ItemDelete
                {...{
                    item: optionValue,
                    parentOptionIsGrouped: optionIsGrouped,
                    name: 'Value',
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
