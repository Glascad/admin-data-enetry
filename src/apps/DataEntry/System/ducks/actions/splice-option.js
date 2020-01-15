import React from 'react';
import { getChildren } from '../../../../../app-logic/system';
import ADD_ITEM from './add-item';
import { match, replace } from '../../../../../utils';
import UPDATE_ITEM from './update-item';

export default function SPLICE_OPTION(
    systemInput,
    {
        selectedItem,
        selectedItem: {
            path,
            __typename,
        },
        systemMap
    },
) {
    const childOptionPath = `${path}.SELECT_OPTION`;
    const childOptionParentKey = `parent${__typename}Path`;
    const childOptionTypename = __typename.match(/Value$/i) ?
    __typename.replace(/value$/i, "")
    :
        __typename.replace(/^.*(System|Detail|Configuration)$/i, '$1Option');

    const childValuePath = `${childOptionPath}.EMPTY_VALUE`
    const childValueParentKey = `parent${childOptionTypename}Path`;
    const childValueTypename = `${childOptionTypename}Value`;
    
    const children = getChildren(selectedItem, systemMap);

    console.log({children});

    // Add Option called "SELECT_OPTION" to selected Item
    const systemInputAfterAddingOption = ADD_ITEM(systemInput, {
        name: 'SELECT_OPTION',
        [childOptionParentKey]: path,
        __typename: childOptionTypename,
    });

    // Add Value called "EMPTY_VALUE" to SELECT_OPTION
    const systemInputAfterAddingOptionValue = ADD_ITEM(systemInputAfterAddingOption, {
        name: 'EMPTY_VALUE',
        [childValueParentKey]: childOptionPath,
        __typename: childValueTypename,
    });

    // move Children to "EMPTY_VALUE"
    const systemInputAfterMovingChildren = children.reduce((accumulatedSystemInput, child) => UPDATE_ITEM(
        accumulatedSystemInput, {
        ...child,
        update: {
            [`parent${childValueTypename}Path`]: childValuePath,
        }
    }),
        systemInputAfterAddingOptionValue);

    return systemInputAfterMovingChildren;
}