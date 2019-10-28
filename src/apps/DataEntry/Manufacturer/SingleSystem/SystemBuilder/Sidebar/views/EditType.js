import React from 'react';
import { TitleBar, GroupingBox, Input, CircleButton, confirmWithModal, Select } from '../../../../../../../components';
import { getChildren, filterOptionsAbove, getLastItemFromPath, getAllInstancesOfItem } from '../../../../../../../app-logic/system-utils';
import { UPDATE_ITEM, ADD_ITEM, DELETE_ITEM } from '../../ducks/actions';

function EditType({
    selectedItem: selectedType,
    selectedItem: {
        __typename,
        path: tPath,
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
}) {
    console.log(arguments[0]);

    const isDetail = !!__typename.match(/Detail/i);
    const type = __typename.replace(/System/i, '');

    const {
        0: childOption,
        0: {
            path: oPath = '',
            __typename: oTypename,
        } = {},
    } = getChildren(selectedType, systemMap);

    const tName = getLastItemFromPath(tPath);
    const oName = getLastItemFromPath(oPath);

    const childValues = getChildren(childOption, systemMap); // Types' Child's children
    return (
        <>
            <TitleBar
                title={`Edit ${type}`}
            />
            <Select
                data-cy={`edit-${type.toLowerCase()}-type`}
                label={type}
                value={tName}
                options={(isDetail ?
                    detailTypes
                    :
                    configurationTypes
                )
                    .filter(type => type !== tName)
                    .map(type => type)}
                onChange={name => {
                    if (name !== tName) {
                        const updateType = () => dispatch(UPDATE_ITEM, {
                            path: tPath,
                            __typename,
                            update: {
                                name,
                            }
                        })
                        childOption ?
                            confirmWithModal(updateType, {
                                titleBar: { title: `Change ${oName}` },
                                children: 'Are you sure?',
                                finishButtonText: "Change"
                            })
                            :
                            updateType();
                    }
                }}
            />
            <GroupingBox
                title="Option"
                circleButton={childOption ? undefined : {
                    "data-cy": "add-option",
                    actionType: "add",
                    className: "action",
                    onClick: () => dispatch(ADD_ITEM, {
                        __typename: `${type}Option`,
                        [`parent${__typename}Path`]: tPath,
                        name: 'ADD_OPTION',
                    }),
                }}
            >
                {childOption ? (
                    <div className="input-group">
                        <Select
                            data-cy={`edit-${type.toLowerCase()}-type`}
                            className={childValues.length > 0 ? 'warning' : ''}
                            // autoFocus={childValues.length === 0}
                            value={oName}
                            options={filterOptionsAbove(selectedType, validOptions).map(({ name }) => name)}
                            onChange={name => {
                                const allInstances = getAllInstancesOfItem({
                                    path: `${tPath}.${name}`,
                                    __typename: oTypename,
                                }, systemMap);
                                const firstInstance = systemMap[allInstances[0]];
                                const instanceValues = firstInstance ? getChildren(firstInstance, systemMap) : [];
                                const [instanceDefaultValueKey, instanceDefaultValue] = firstInstance ?
                                    Object.entries(firstInstance).find(([key, value]) => key.match(/default/i))
                                    :
                                    [];
                                if (_optionGroups.some(og => og.name === name)) {
                                    instanceValues.forEach(value => dispatch(ADD_ITEM, {
                                        [`parent${oTypename}Path`]: oPath,
                                        name: getLastItemFromPath(value.path),
                                        __typename: `${oTypename}Value`,
                                    }))
                                }
                                dispatch(UPDATE_ITEM, {
                                    path: oPath,
                                    __typename: oTypename,
                                    update: {
                                        name,
                                        [`default${oTypename}Value`]: instanceDefaultValue,

                                    }
                                })
                            }}
                        />
                        <CircleButton
                            data-cy="delete-option"
                            type="small"
                            actionType="delete"
                            className="danger"
                            onClick={() => {
                                const deleteOption = () => dispatch(DELETE_ITEM, {
                                    path: oPath,
                                    __typename: oTypename,
                                });
                                if (childValues.length > 0) confirmWithModal(deleteOption, {
                                    titleBar: { title: `Delete ${oName}` },
                                    children: `Deleting ${oName.toLowerCase()} will delete all the items below it. Do you want to continue?`,
                                    finishButtonText: 'Delete',
                                    danger: true,
                                });
                                else deleteOption();
                            }}
                        />
                    </div>
                ) : (
                        <div>
                            No Option
                        </div>
                    )}
            </GroupingBox>
            <button
                className="sidebar-button danger"
                data-cy="edit-type-delete-button"
                onClick={() => {
                    const deleteType = () => dispatch(DELETE_ITEM, {
                        path: tPath,
                        __typename,
                    })
                    if (childOption) confirmWithModal(deleteType, {
                        titleBar: { title: `Delete ${tName}` },
                        children: `Deleting ${(tName).toLowerCase()} will delete all the items below it. Do you want to continue?`,
                        finishButtonText: 'Delete',
                        danger: true,
                    });
                    else deleteType();
                }}
            >
                {`Delete ${isDetail ? 'Detail' : 'Configuration'}`}
            </button>
        </>
    );
}

export const SystemDetail = {
    title: "Edit Detail",
    component: EditType,
};

export const SystemConfiguration = {
    title: "Edit Configuration",
    component: EditType,
};
