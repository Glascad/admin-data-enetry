import React from 'react';
import { canItemBeGrouped, getAllInstancesOfItem } from '../../../../../../../app-logic/system-utils';
import { Input, confirmWithModal } from '../../../../../../../components';
import { DELETE_OPTION_GROUP, ADD_OPTION_GROUP, UPDATE_ITEM } from '../../../ducks/actions';

export const OptionToggles = ({
    option,
    option: {
        path
    },
    optionIsGrouped,
    dispatch,
    systemMap,
}) => path.match(/__DT__/) && canItemBeGrouped(option, systemMap) ? (
    <Input
        data-cy="group-option"
        type="switch"
        label="Grouped"
        checked={optionIsGrouped}
        onChange={() => dispatch(optionIsGrouped ? DELETE_OPTION_GROUP : ADD_OPTION_GROUP, option)}
    />
) : null;

export const ValueToggles = ({
    __typename,
    oVName,
    isDefault,
    oPath,
    oTypename,
    optionIsGrouped,
    dispatch,
    systemMap,
}) => (
        <Input
            data-cy="default-option-value"
            type="switch"
            label="Default"
            readOnly={isDefault}
            checked={isDefault}
            onChange={() => {
                const updateDefault = () => dispatch(UPDATE_ITEM, {
                    path: oPath,
                    __typename: oTypename,
                    update: {
                        [`default${__typename}`]: oVName,
                    },
                });
                const updateDefaultForAllInstances = () => {
                    getAllInstancesOfItem({ path: oPath, __typename: oTypename }, systemMap)
                        .forEach((instance, i) => {
                            const item = systemMap[instance];
                            dispatch(UPDATE_ITEM, {
                                path: item.path,
                                __typename: item.__typename,
                                update: {
                                    [`default${item.__typename}Value`]: oVName,
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

export const TypeToggles = ({
    selectedType,
    type,
    optional,
    dispatch,
}) => type === 'Configuration' ? (
    <Input
        data-cy="required-optional"
        type="switch"
        label="Required"
        checked={!optional}
        onChange={() => dispatch(UPDATE_ITEM, {
            ...selectedType,
            update: {
                optional: !optional,
            },
        })}
    />
) : null;