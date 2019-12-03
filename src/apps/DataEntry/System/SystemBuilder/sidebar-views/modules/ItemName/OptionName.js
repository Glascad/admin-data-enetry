import React from 'react';
import { Select } from "../../../../../../../components";
import { filterOptionsAbove, getAllInstancesOfItem, getParentPath, getChildren, getLastItemFromPath } from "../../../../../../../app-logic/system-utils";
import { ADD_ITEM, UPDATE_ITEM } from '../../../../ducks/actions';

const OptionName = ({
    queryResult: {
        validOptions,
    },
    system: {
        _optionGroups,
    },
    selectedItem,
    selectedItem: {
        path,
        __typename
    } = {},
    itemName,
    children,
    systemMap,
    dispatch,
}) => (
        <Select
            disabled={!!children.length}
            data-cy="edit-option-name"
            label="Option Name"
            value={itemName}
            options={filterOptionsAbove(selectedItem, validOptions).map(({ name }) => name)}
            onChange={name => {
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
                dispatch(UPDATE_ITEM, {
                    ...selectedItem,
                    update: {
                        name,
                        [`default${__typename}Value`]: instanceDefaultValue,

                    }
                });
                if (_optionGroups.some(og => og.name === name)) {
                    instanceValues.forEach(value => dispatch(ADD_ITEM, {
                        [`parent${__typename}Path`]: `${getParentPath(selectedItem)}.${name}`,
                        name: getLastItemFromPath(value.path),
                        __typename: `${__typename}Value`,
                    }, {
                        replaceState: true,
                    }));
                }
            }}
        />
    );

export default OptionName;