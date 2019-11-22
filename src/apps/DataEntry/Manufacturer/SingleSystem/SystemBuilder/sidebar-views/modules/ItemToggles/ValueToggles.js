import React from 'react';
import { getParent, getAllInstancesOfItem } from '../../../../../../../../app-logic/system-utils';
import { confirmWithModal, Input } from '../../../../../../../../components';
import { UPDATE_ITEM } from '../../../../ducks/actions';

export default function ValueToggles({
    item,
    item: {
        __typename,
    },
    itemName,
    optionIsGrouped,
    dispatch,
    systemMap,
}) {

    const valueParentOption = getParent(item, systemMap);

    const {
        path: parentPath,
        __typename: parentTypename,
    } = valueParentOption;

    const [defaultKey, isDefault] = Object.entries(valueParentOption).find(([key, value]) => key.match(/default/i) && value === itemName) || [];

    return (
        <Input
            data-cy="default-option-value"
            type="switch"
            label="Default"
            readOnly={isDefault}
            checked={isDefault}
            onChange={() => {
                const updateDefault = () => dispatch(UPDATE_ITEM, {
                    path: parentPath,
                    __typename: parentTypename,
                    update: {
                        [`default${__typename}`]: itemName,
                    },
                });
                const updateDefaultForAllInstances = () => {
                    getAllInstancesOfItem({ path: parentPath, __typename: parentTypename }, systemMap)
                        .forEach((instance, i) => {
                            const { path: instancePath, __typename: instanceTypename } = systemMap[instance];
                            dispatch(UPDATE_ITEM, {
                                path: instancePath,
                                __typename: instanceTypename,
                                update: {
                                    [`default${instanceTypename}Value`]: itemName,
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
