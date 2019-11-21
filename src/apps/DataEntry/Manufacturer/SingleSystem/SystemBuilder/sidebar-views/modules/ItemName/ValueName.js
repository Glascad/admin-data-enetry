import React from 'react';
import { Select, confirmWithModal } from '../../../../../../../../components';
import { UPDATE_ITEM } from '../../../../ducks/actions';
import { getAllInstancesOfItem } from '../../../../../../../../app-logic/system-utils';

export const ValueName = ({
    selectOptions,
    item: {
        path,
        __typename
    },
    itemName,
    optionIsGrouped,
    children,
    dispatch,
    systemMap,
}) => (
        <Select
            label="Option Value"
            value={itemName}
            data-cy="edit-value-name"
            options={selectOptions}
            onChange={name => {
                if (name !== itemName) {
                    const updateOptionValue = () => dispatch(UPDATE_ITEM, {
                        path,
                        __typename,
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

export default ValueName;
