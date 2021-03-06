import React, { memo } from 'react';
import { getAllInstancesOfItem, getLastItemFromPath, getParent, getSiblings } from '../../../../../../../app-logic/system';
import { confirmWithModal, Select } from '../../../../../../../components';
import { UPDATE_ITEM } from '../../../../ducks/actions';
import { getOptionIsGrouped } from '../../../../ducks/utils';

export default memo(function ValueName({
    system,
    selectedItem,
    selectedItem: {
        path,
        __typename = '',
    },
    itemName,
    children,
    dispatch,
    systemMap,
    queryResult: {
        validOptions = [],
    },
}) {

    const itemParent = getParent(selectedItem, systemMap);
    const {
        path: parentPath,
    } = itemParent;
    const parentName = getLastItemFromPath(parentPath);
    const siblings = getSiblings(selectedItem, systemMap);

    const optionIsGrouped = getOptionIsGrouped(system, selectedItem);

    const validValues = validOptions
        .reduce((siblings, { name, _validOptionValues }) => (
            parentName.toLowerCase() === name.toLowerCase() ?
                _validOptionValues
                :
                siblings
        ), []);

    const selectOptions = validValues
        .filter(({ name }) => !siblings.some(v => getLastItemFromPath(v.path) === name))
        .map(({ name }) => name);

    return (
        <Select
            label="Option Value"
            value={itemName}
            data-cy="edit-value-name"
            options={selectOptions}
            onChange={name => {
                if (name !== itemName) {
                    const updateOptionValue = () => dispatch(UPDATE_ITEM, {
                        ...selectedItem,
                        update: {
                            name,
                        },
                    });
                    const updateValueFromEachOption = () => {
                        getAllInstancesOfItem({ path, __typename }, systemMap)
                            .forEach(instance => {
                                const item = systemMap[instance];
                                dispatch(UPDATE_ITEM, {
                                    path: item.path,
                                    __typename: item.__typename,
                                    update: {
                                        name,
                                    },
                                }, {
                                    replaceState: true
                                });
                            });
                    };
                    optionIsGrouped ?
                        confirmWithModal(updateValueFromEachOption, {
                            titleBar: { title: `Delete Grouped Option Value` },
                            children: 'Are you Sure?',
                            finishButtonText: 'Change',
                        })
                        :
                        children.length > 0 ?
                            confirmWithModal(updateOptionValue, {
                                titleBar: { title: `Change ${itemName}?` },
                                children: 'Are you Sure?',
                                finishButtonText: 'Change',
                            })
                            :
                            updateOptionValue();
                }
            }}
        />
    );
});
