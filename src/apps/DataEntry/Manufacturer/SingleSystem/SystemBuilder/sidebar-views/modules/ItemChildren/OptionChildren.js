import React from 'react';
import { GroupingBox, Select, CircleButton } from '../../../../../../../../components';

const OptionChildren = ({
    validOptionValues,
    option,
    option: {
        path,
        __typename,
    },
    optionName,
    optionIsGrouped,
    children,
    selectValidOptionValues,
    selectItem,
    dispatch,
    systemMap,
}) => (
        <GroupingBox
            data-cy="edit-option-values"
            title="Option Values"
            circleButton={selectValidOptionValues.length > 0 ? {
                "data-cy": "add-option-value",
                actionType: "add",
                className: "action",
                onClick: () => {
                    const addValueToEachOption = () => {
                        const valueName = (validOptionValues.find(({ name }) => !children
                            .some(ov => name === getLastItemFromPath(ov.path))).name) || 'New Value';
                        getAllInstancesOfItem(option, systemMap)
                            .forEach((instance, i) => {
                                const item = systemMap[instance];
                                dispatch(ADD_ITEM, {
                                    [`parent${item.__typename}Path`]: item.path,
                                    name: valueName,
                                    __typename: `${item.__typename}Value`,
                                }, {
                                    replaceState: i !== 0,
                                })
                            })
                    };
                    optionIsGrouped ?
                        confirmWithModal(addValueToEachOption, {
                            titleBar: { title: `Add Grouped Option Value` },
                            children: `${optionName} Adding a value to a grouped option will add the value to all existing items with the name of ${optionName.toLowerCase()}`,
                            finishButtonText: 'Add Value',
                        })
                        :
                        dispatch(ADD_ITEM, {
                            [`parent${__typename}Path`]: path,
                            name: (validOptionValues.find(({ name }) => !children
                                .some(ov => name === getLastItemFromPath(ov.path))).name) || 'New Value',
                            __typename: `${__typename}Value`,
                        });
                }
            } : undefined}
        >
            {children.length ?
                children.map((item, i, { length }) => {
                    const { path: ovPath, __typename: ovTypename } = item;
                    const ovName = ovPath.replace(/^.*\.(\w+)$/, '$1');
                    return (
                        <div
                            className="input-group"
                        >
                            <Select
                                data-cy='edit-option-values'
                                key={'Option Name'}
                                value={ovName}
                                options={selectValidOptionValues}
                                // autoFocus={i === length - 1}
                                onChange={name => {
                                    if (name !== ovName) {
                                        const valueChildren = getChildren({ __typename: ovTypename, path: ovPath }, systemMap);
                                        const updateOptionValue = () => dispatch(UPDATE_ITEM, {
                                            path: ovPath,
                                            __typename: ovTypename,
                                            update: {
                                                name,
                                            }
                                        })
                                        valueChildren.length > 0 ?
                                            confirmWithModal(updateOptionValue, {
                                                titleBar: { title: `Change ${ovName}` },
                                                children: 'Are you sure?',
                                                finishButtonText: 'Change',
                                            })
                                            :
                                            updateOptionValue();
                                    }
                                }}
                            />
                            <CircleButton
                                data-cy={`select-option-value-${ovName.toLowerCase()}`}
                                className="primary"
                                actionType="arrow"
                                onClick={() => selectItem(item)}
                            />
                            <CircleButton
                                data-cy={`delete-option-value-${ovName.toLowerCase()}`}
                                className="danger"
                                type="small"
                                actionType="delete"
                                onClick={() => {
                                    const valueChildren = getChildren({ __typename: ovTypename, path: ovPath }, systemMap);

                                    const deleteOptionValue = () => dispatch(DELETE_ITEM, {
                                        path: ovPath,
                                        __typename: ovTypename,
                                    });
                                    const deleteValueFromEachOption = () => {
                                        getAllInstancesOfItem({ path: ovPath, __typename: ovTypename }, systemMap)
                                            .forEach(instance => {
                                                const item = systemMap[instance];
                                                dispatch(DELETE_ITEM, item, {
                                                    replaceState: true,
                                                });
                                            });
                                    };
                                    if (optionIsGrouped) {
                                        confirmWithModal(deleteValueFromEachOption, {
                                            titleBar: { title: `Delete Grouped Option Value` },
                                            children: `Deleting a value attached to a grouped option will delete the value to all existing items with the name of ${optionName.toLowerCase()}`,
                                            finishButtonText: 'Delete',
                                            danger: true,
                                        });
                                    } else {
                                        if (valueChildren.length > 0) {
                                            confirmWithModal(deleteOptionValue, {
                                                titleBar: { title: `Delete ${ovName}` },
                                                children: `Deleting ${ovName.toLowerCase()} will delete all the items below it. Do you want to continue?`,
                                                finishButtonText: 'Delete',
                                                danger: true,
                                            });
                                        } else deleteOptionValue();
                                    }
                                }}
                            />
                        </div>
                    )
                }) : (
                    <div>
                        No Values
                    </div>
                )}
        </GroupingBox>);

export default OptionChildren;