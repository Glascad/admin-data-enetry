import React from 'react';
import { GroupingBox, confirmWithModal, Select, CircleButton, Toggle, ToggleBox } from '../../../../../../../components';
import { getAllInstancesOfItem, getLastItemFromPath, getChildren, filterOptionsAbove, getParentPath } from '../../../../../../../app-logic/system-utils';
import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from '../../../ducks/actions';
import { getSelectTypeName } from '../../../ducks/utils';

const Row = ({
    item,
    item: {
        __typename: childTypename = '',
        path: childPath = '',
    },
    selectValue = '',
    handleSelectChange,
    selectOptions,
    grandchildren,
    dispatch,
    selectItem,
}) => (
        <div className="input-group">
            {console.log({ item })}
            <Select
                data-cy={`edit-child-${selectValue.toLowerCase()}`}
                value={selectValue}
                options={selectOptions}
                onChange={handleSelectChange}
            />
            <CircleButton
                data-cy={`select-child-${selectValue.toLowerCase()}`}
                className="primary"
                actionType="arrow"
                onClick={() => selectItem(item)}
            />
            <CircleButton
                data-cy={`delete-child-${selectValue.toLowerCase()}`}
                type="small"
                className="danger"
                actionType="delete"
                onClick={() => {
                    const deleteType = () => dispatch(DELETE_ITEM, {
                        __typename: childTypename,
                        path: childPath,
                    });
                    if (grandchildren.length > 0) confirmWithModal(deleteType, {
                        titleBar: { title: `Delete ${selectValue}` },
                        children: `Deleting ${selectValue.toLowerCase()} will delete all the items below it. Do you want to continue?`,
                        danger: true,
                        finishButtonText: 'Delete',
                    });
                    else deleteType();
                }}
            />
        </div>
    );

export const OptionAdditionGrouping = ({
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
                    const { path: ovPath, __typename: valueTypename } = item;
                    const vName = ovPath.replace(/^.*\.(\w+)$/, '$1');
                    return (
                        <div
                            className="input-group"
                        >
                            <Select
                                data-cy='edit-option-values'
                                key={'Option Name'}
                                value={vName}
                                options={selectValidOptionValues}
                                // autoFocus={i === length - 1}
                                onChange={name => {
                                    if (name !== vName) {
                                        const valueChildren = getChildren({ __typename: valueTypename, path: ovPath }, systemMap);
                                        const updateOptionValue = () => dispatch(UPDATE_ITEM, {
                                            path: ovPath,
                                            __typename: valueTypename,
                                            update: {
                                                name,
                                            }
                                        })
                                        valueChildren.length > 0 ?
                                            confirmWithModal(updateOptionValue, {
                                                titleBar: { title: `Change ${vName}` },
                                                children: 'Are you sure?',
                                                finishButtonText: 'Change',
                                            })
                                            :
                                            updateOptionValue();
                                    }
                                }}
                            />
                            <CircleButton
                                data-cy={`select-option-value-${vName.toLowerCase()}`}
                                className="primary"
                                actionType="arrow"
                                onClick={() => selectItem(item)}
                            />
                            <CircleButton
                                data-cy={`delete-option-value-${vName.toLowerCase()}`}
                                className="danger"
                                type="small"
                                actionType="delete"
                                onClick={() => {
                                    const valueChildren = getChildren({ __typename: valueTypename, path: ovPath }, systemMap);

                                    const deleteOptionValue = () => dispatch(DELETE_ITEM, {
                                        path: ovPath,
                                        __typename: valueTypename,
                                    });
                                    const deleteValueFromEachOption = () => {
                                        getAllInstancesOfItem({ path: ovPath, __typename: valueTypename }, systemMap)
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
                                                titleBar: { title: `Delete ${vName}` },
                                                children: `Deleting ${vName.toLowerCase()} will delete all the items below it. Do you want to continue?`,
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

export const ValueAdditionGrouping = ({
    _optionGroups,
    optionValue,
    optionValue: {
        path,
        __typename
    },
    validOptions,
    optionIsSelected,
    hasChildren,
    valueChildren,
    childOption,
    childOptionPath,
    childTypeType,
    childTypeTypename,
    childOptionChildren,
    childOptionName,
    childTypename,
    selectTypes,
    selectValidTypes,
    setOptionIsSelected,
    selectItem,
    dispatch,
    systemMap,
}) => (
        <ToggleBox
            views={[
                {
                    toggle: {
                        text: "Option",
                        "data-cy": "toggle-child-option",
                        selected: optionIsSelected,
                        className: (hasChildren && !optionIsSelected) ? 'disabled' : '',
                        onClick: () => !hasChildren && setOptionIsSelected(true),
                    },
                    render: () => hasChildren ? (
                        <div className="input-group">
                            <Row
                                item={childOption}
                                selectOptions={filterOptionsAbove(optionValue, validOptions)
                                    .map(({ name }) => name)}
                                grandchildren={childOptionChildren}
                                dispatch={dispatch}
                                selectValue={childOptionName}
                                selectItem={selectItem}
                                handleSelectChange={name => {
                                    const allInstances = getAllInstancesOfItem({
                                        path: `${path}.${name}`,
                                        __typename: childTypename,
                                    }, systemMap);
                                    const firstInstance = systemMap[allInstances[0]];
                                    const instanceValues = firstInstance ? getChildren(firstInstance, systemMap) || []
                                        :
                                        [];
                                    const [instanceDefaultValueKey, instanceDefaultValue] = firstInstance ?
                                        Object.entries(firstInstance).find(([key]) => key.match(/default/i)) || []
                                        :
                                        [];
                                    dispatch(UPDATE_ITEM, {
                                        path: childOptionPath,
                                        __typename: childTypename,
                                        update: {
                                            name,
                                            [`default${childTypename}Value`]: instanceDefaultValue,

                                        }
                                    })
                                    if (_optionGroups.some(og => og.name === name)) {
                                        instanceValues.forEach(value => dispatch(ADD_ITEM, {
                                            [`parent${childTypename}Path`]: `${getParentPath({ path: childOptionPath })}.${name}`,
                                            name: getLastItemFromPath(value.path),
                                            __typename: `${childTypename}Value`,
                                        }, {
                                            replaceState: true
                                        }))
                                    }
                                }}
                            />
                        </div>
                    ) : (
                            <div>
                                No Option
                            </div>
                        )
                },
                {
                    toggle: {
                        text: `${childTypeType.slice(0, 6)}s`,
                        "data-cy": `toggle-child-${childTypeType.toLowerCase()}`,
                        selected: !optionIsSelected,
                        className: hasChildren && optionIsSelected ? 'disabled' : '',
                        onClick: () => !hasChildren && setOptionIsSelected(false),
                    },
                    render: () => hasChildren ? (
                        <>
                            {valueChildren.map((item, i, { length }) => {
                                const { path: childTypePath = '', partNumber = '' } = item;
                                const childTypeChildren = getChildren({ path: childTypePath }, systemMap);
                                const childName = childTypePath ?
                                    getLastItemFromPath(childTypePath)
                                    :
                                    partNumber;
                                return (
                                    <Row
                                        key={i}
                                        item={item}
                                        selectOptions={selectTypes}
                                        grandchildren={childTypeChildren}
                                        dispatch={dispatch}
                                        selectValue={childName}
                                        selectItem={selectItem}
                                        handleSelectChange={name => {
                                            if (childName !== name) {
                                                const updateType = () => dispatch(UPDATE_ITEM, {
                                                    __typename: childTypeTypename,
                                                    path: childTypePath,
                                                    update: {
                                                        name,
                                                    },
                                                });
                                                if (childTypeChildren.length > 0) {
                                                    confirmWithModal(updateType, {
                                                        titleBar: { title: `Change ${childName}` },
                                                        children: 'Are you sure?',
                                                        finishButtonText: 'Change',
                                                    });
                                                } else {
                                                    updateType();
                                                }
                                            }
                                        }}
                                    />
                                )
                            })}
                        </>
                    ) : (
                            <div>
                                No {childTypeType}
                            </div>
                        )
                },
            ]}
            circleButton={optionIsSelected ?
                hasChildren ?
                    undefined
                    :
                    {
                        "data-cy": "add-option",
                        actionType: "add",
                        className: "action",
                        onClick: () => dispatch(ADD_ITEM, {
                            __typename: __typename.replace(/value/i, ''),
                            [`parent${__typename}Path`]: path,
                            name: "ADD_OPTION",
                        }),
                    }
                :
                valueChildren.length < selectValidTypes.length ? {
                    "data-cy": `add-${childTypeType.toLowerCase()}`,
                    actionType: "add",
                    className: "action",
                    onClick: () => {
                        dispatch(ADD_ITEM, {
                            __typename: childTypeTypename,
                            [`parent${__typename}Path`]: path,
                            name: getSelectTypeName(valueChildren, `ADD_${childTypeType.toUpperCase()}`),
                        })
                    },
                }
                    :
                    undefined}
        />
    );

export const TypeAdditionGrouping = ({
    _optionGroups,
    validOptions,
    selectedType,
    selectedType: {
        path,
        __typename
    } = {},
    type,
    oName,
    childOption,
    childOption: {
        path: oPath,
        __typename: oTypename,
    } = {},
    childValues,
    selectItem,
    dispatch,
    systemMap,
}) => (
        <GroupingBox
            title="Option"
            circleButton={childOption ? undefined : {
                "data-cy": "add-option",
                actionType: "add",
                className: "action",
                onClick: () => dispatch(ADD_ITEM, {
                    __typename: `${type}Option`,
                    [`parent${__typename}Path`]: path,
                    name: 'ADD_OPTION',
                }),
            }}
        >
            {childOption ? (
                <div className="input-group">
                    <Row
                        item={childOption}
                        selectOptions={filterOptionsAbove(selectedType, validOptions).map(({ name }) => name)}
                        grandchildren={childValues}
                        dispatch={dispatch}
                        selectValue={oName}
                        selectItem={selectItem}
                        handleSelectChange={name => {
                            const allInstances = getAllInstancesOfItem({
                                path: `${path}.${name}`,
                                __typename: oTypename,
                            }, systemMap);
                            const firstInstance = systemMap[allInstances[0]];
                            const instanceValues = firstInstance ? getChildren(firstInstance, systemMap) : [];
                            const [instanceDefaultValueKey, instanceDefaultValue] = firstInstance ?
                                Object.entries(firstInstance).find(([key, value]) => key.match(/default/i))
                                :
                                [];
                            dispatch(UPDATE_ITEM, {
                                path: oPath,
                                __typename: oTypename,
                                update: {
                                    name,
                                    [`default${oTypename}Value`]: instanceDefaultValue,

                                }
                            })
                            if (_optionGroups.some(og => og.name === name)) {
                                instanceValues.forEach(value => dispatch(ADD_ITEM, {
                                    [`parent${oTypename}Path`]: `${getParentPath({ path: oPath })}.${name}`,
                                    name: getLastItemFromPath(value.path),
                                    __typename: `${oTypename}Value`,
                                }, {
                                    replaceState: true
                                }))
                            }
                        }}

                    />
                </div>
            ) : (
                    <div>
                        No Option
                    </div>
                )}
        </GroupingBox>
    );
