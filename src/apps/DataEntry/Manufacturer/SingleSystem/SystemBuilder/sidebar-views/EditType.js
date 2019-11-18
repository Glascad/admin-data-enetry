import React from 'react';
import { withRouter } from 'react-router-dom';
import { getChildren, getLastItemFromPath, getSiblings } from '../../../../../../app-logic/system-utils';
import { TitleBar } from '../../../../../../components';
import { TypeAdditionGrouping } from './modules/add-item-grouping';
import { ItemLink } from './modules/item-link';
import { TypeNameSelect } from './modules/item-name-select';
import { TypeToggles } from './modules/item-toggles';
import ItemDelete from './modules/ItemDelete';
import ItemMovement  from './modules/ItemMovement';

function EditType({
    location,
    match,
    selectItem,
    selectedItem: selectedType,
    selectedItem: {
        __typename,
        name: sName,
        path = '',
        optional,
    } = {},
    system,
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

    const isDetail = !!__typename.match(/Detail/i);
    const type = __typename.replace(/^(System|Detail|Configuration)(\w+)/i, '$2');

    const {
        0: childOption,
        0: {
            path: oPath = '',
        } = {},
    } = getChildren(selectedType, systemMap);

    const tName = getLastItemFromPath(path, systemMap);
    const oName = getLastItemFromPath(oPath);

    const childValues = getChildren(childOption, systemMap); // Types' Child's children
    const siblingTypes = getSiblings(selectedType, systemMap);

    const selectValidTypes = __typename.match(/detail/i) ?
        detailTypes
        :
        configurationTypes;

    const selectTypes = selectValidTypes
        .filter(name => !siblingTypes.some(({ path: typePath }) =>
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
                    childOption,
                    oName,
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
            <TypeAdditionGrouping
                {...{
                    validOptions,
                    _optionGroups,
                    selectedType,
                    type,
                    oName,
                    childOption,
                    childValues,
                    selectItem,
                    dispatch,
                    systemMap,
                }}
            />
            <ItemMovement
                {...{
                    item: selectedType,
                    name: isDetail ? 'Detail' : 'Configuration',
                    partialAction,
                    cancelPartial,
                    dispatchPartial,
                }}
            />
            <ItemLink
                {...{
                    path,
                    match,
                    location,
                }}
            />
            <ItemDelete
                {...{
                    item: selectedType,
                    name: isDetail ? 'Detail' : 'Configuration',
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
