import React from 'react';
import { Select } from "../../../../../../../components";
import { filterOptionsAbove, getAllInstancesOfItem, getParentPath, getChildren, getLastItemFromPath, filterOptionsAboveAndBelow } from "../../../../../../../app-logic/system";
import { ADD_ITEM, UPDATE_ITEM } from '../../../../ducks/actions';
import { getOptionIsGrouped } from '../../../../ducks/utils';

export default function OptionName({
    queryResult: {
        validOptions,
    },
    system,
    selectedItem,
    selectedItem: {
        path,
        __typename
    } = {},
    itemName,
    children,
    children: {
        0: childValue,
    },
    systemMap,
    dispatch,
}) {
    // spliced options can be updated
    const isSplicedOption = itemName === 'SELECT_OPTION';

    return (
        <Select
            disabled={!!children.length && !isSplicedOption}
            data-cy="edit-option-name"
            label="Option Name"
            value={itemName}
            options={filterOptionsAboveAndBelow(selectedItem, validOptions, systemMap).map(({ name }) => name)}
            onChange={name => {
                const newOptionPath = path.replace(/\w+$/, name);
                const allInstances = getAllInstancesOfItem({
                    path: `${getParentPath(selectedItem)}.${name}`,
                    __typename,
                }, systemMap);
                const firstInstance = systemMap[allInstances[0]];
                const instanceValues = firstInstance ? getChildren(firstInstance, systemMap) : [];
                const [instanceDefaultValueKey, instanceDefaultValue] = firstInstance ?
                    Object.entries(firstInstance).find(([key, value]) => key.match(/default/i))
                    :
                    [];
                const validOptionValues = validOptions
                    .reduce((values, { name: optionName, _validOptionValues }) => (
                        optionName.toLowerCase() === name.toLowerCase() ?
                            _validOptionValues
                            :
                            values
                    ), []);
                
                const selectedOption = validOptionValues[0].name;

                const optionIsGrouped = getOptionIsGrouped(system, {...selectedItem, path: newOptionPath})
                
                dispatch(UPDATE_ITEM, {
                    ...selectedItem,
                    update: {
                        name,
                        [`default${__typename}Value`]: instanceDefaultValue,

                    }
                });
                if (isSplicedOption) {

                    // update the default Value
                    dispatch(UPDATE_ITEM, {
                        ...childValue, // default EMPTY_VALUE
                        path: `${newOptionPath}.EMPTY_VALUE`,
                        update: {
                            name: optionIsGrouped ? instanceDefaultValue : selectedOption,
                        }
                    }, {
                        replaceState: true,
                    });
                }
                
                if (optionIsGrouped) {
                    instanceValues.forEach(value => {
                        const valueName = getLastItemFromPath(value.path);
                        if (!isSplicedOption || valueName !== instanceDefaultValue) dispatch(ADD_ITEM, {
                            [`parent${__typename}Path`]: newOptionPath,
                            name: valueName,
                            __typename: `${__typename}Value`,
                        }, {
                            replaceState: true,
                        })
                    });
                }
            }}
        />
    )
};