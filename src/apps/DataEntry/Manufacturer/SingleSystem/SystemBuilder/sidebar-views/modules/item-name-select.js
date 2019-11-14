import React from 'react';
import { Select, confirmWithModal } from '../../../../../../../components';
import { UPDATE_ITEM, ADD_ITEM } from '../../ducks/actions';
import { filterOptionsAbove, getAllInstancesOfItem, getLastItemFromPath, getParentPath, getChildren } from '../../../../../../../app-logic/system-utils';

export const TypeNameSelect = ({
    type,
    tName,
    tPath,
    __typename,
    oName,
    childOption,
    selectTypes,
    dispatch,
}) => (
        <Select
            data-cy={`edit-${type.toLowerCase()}-type`}
            readOnly={type === 'System'}
            label={type}
            value={tName}
            options={selectTypes}
            onChange={name => {
                if (name !== tName) {
                    const updateType = () => dispatch(UPDATE_ITEM, {
                        path: tPath,
                        __typename,
                        update: {
                            name,
                        },
                    });
                    childOption ?
                        confirmWithModal(updateType, {
                            titleBar: { title: `Change ${oName}` },
                            children: 'Are you sure?',
                            finishButtonText: "Change",
                        })
                        :
                        updateType();
                }
            }}
        />
    );

export const OptionNameSelect = ({
    validOptions,
    option,
    option: {
        path,
        __typename
    },
    optionName,
    children,
    systemMap,
    dispatch,
    _optionGroups,
}) => (
        <Select
            disabled={!!children.length}
            data-cy="edit-option-name"
            label="Option Name"
            value={optionName}
            options={filterOptionsAbove(option, validOptions).map(({ name }) => name)}
            onChange={name => {
                const allInstances = getAllInstancesOfItem({
                    path: `${getParentPath(option)}.${name}`,
                    __typename,
                }, systemMap);
                const firstInstance = systemMap[allInstances[0]];
                const instanceValues = firstInstance ? getChildren(firstInstance, systemMap) : [];
                const [instanceDefaultValueKey, instanceDefaultValue] = firstInstance ?
                    Object.entries(firstInstance).find(([key, value]) => key.match(/default/i))
                    :
                    [];
                dispatch(UPDATE_ITEM, {
                    path,
                    __typename,
                    update: {
                        name,
                        [`default${__typename}Value`]: instanceDefaultValue,

                    }
                });
                if (_optionGroups.some(og => og.name === name)) {
                    instanceValues.forEach(value => dispatch(ADD_ITEM, {
                        [`parent${__typename}Path`]: `${getParentPath(option)}.${name}`,
                        name: getLastItemFromPath(value.path),
                        __typename: `${__typename}Value`,
                    }, {
                        replaceState: true,
                    }));
                }
            }}
        />
    );

export const ValueNameSelect = ({
    selectValidValues,
    optionValue: {
        path,
        __typename
    },
    oVName,
    optionIsGrouped,
    hasChildren,
    dispatch,
    systemMap,
}) => (
        <Select
            label="Option Value"
            value={oVName}
            data-cy="edit-value-name"
            options={selectValidValues}
            onChange={name => {
                if (name !== oVName) {
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
                        hasChildren ?
                            confirmWithModal(updateOptionValue, {
                                titleBar: { title: `Change ${oVName}?` },
                                children: 'Are you Sure?',
                                finishButtonText: 'Change',
                            })
                            :
                            updateOptionValue();
                }
            }}
        />
    );
