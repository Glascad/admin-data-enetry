import React from 'react';
import { getParent, getAllInstancesOfItem } from '../../../../../../../app-logic/system-utils';
import { confirmWithModal, Input } from '../../../../../../../components';
import { UPDATE_ITEM } from '../../../../ducks/actions';
import { getOptionIsGrouped } from '../../../../ducks/utils';

export default function ValueToggles({
    system,
    selectedItem,
    selectedItem: {
        __typename,
    },
    itemName,
    dispatch,
    systemMap,
}) {
    const parent = getParent(selectedItem, systemMap);
    const {
        path: parentPath,
        __typename: parentTypename,
    } = parent;

    const optionIsGrouped = getOptionIsGrouped(system, selectedItem);
    const [defaultKey, isDefault] = Object.entries(parent).find(([key, value]) => key.match(/default/i) && value === itemName) || [];

    return (
        <Input
            data-cy="default-option-value"
            type="switch"
            label="Default"
            readOnly={isDefault}
            checked={isDefault}
            onChange={() => {
                const updateDefault = () => dispatch(UPDATE_ITEM, {
                    ...parent,
                    update: {
                        [`default${__typename}`]: itemName,
                    },
                });
                const updateDefaultForAllInstances = () => {
                    getAllInstancesOfItem({ path: parentPath, __typename: parentTypename }, systemMap)
                        .forEach((instancePath, i) => {
                            const instance = systemMap[instancePath];
                            dispatch(UPDATE_ITEM, {
                                ...instance,
                                update: {
                                    [`default${instance.__typename}Value`]: itemName,
                                }
                            }, {
                                replaceState: i !== 0,
                            });
                        });
                };
                optionIsGrouped ?
                    confirmWithModal(updateDefaultForAllInstances, {
                        titleBar: { title: `Change Default Value For Grouped Option` },
                        children: 'Are you Sure?',
                        finishButtonText: 'Change',
                    })
                    :
                    updateDefault();
            }}
        />
    );
};
