import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { TitleBar, Input, GroupingBox, CircleButton, useInitialState, confirmWithModal, Select } from "../../../../../../../components";
import { UPDATE_ITEM, DELETE_ITEM, ADD_ITEM, ADD_OPTION_GROUP, DELETE_OPTION_GROUP } from '../../ducks/actions';
import { getChildren, filterOptionsAbove, getLastItemFromPath, canItemBeGrouped, getAllInstancesOfItem, getParentPath } from '../../../../../../../app-logic/system-utils';
import { parseSearch } from '../../../../../../../utils';

function EditOption({
    location: {
        search,
    },
    match: {
        path,
    },
    selectItem,
    selectedItem: option = {},
    system: {
        _optionGroups,
    },
    systemMap,
    queryResult: {
        validOptions = [],
    } = {},
    dispatch,
    dispatchPartial,
    partialAction,
    cancelPartial,
}) {
    console.log(arguments[0])

    const {
        path: oPath,
        __typename,
        [defaultKey]: defaultValue,
    } = option;

    const defaultKey = Object.keys(option).find(k => k.match(/default/i));
    const optionName = getLastItemFromPath(oPath);

    const optionValues = getChildren(option, systemMap);

    const validOptionValues = validOptions
        .reduce((values, { name, _validOptionValues }) => (
            optionName.toLowerCase() === name.toLowerCase() ?
                _validOptionValues
                :
                values
        ), []);

    const selectValidOptionValues = validOptionValues
        .filter(({ name }) => !optionValues.some(v => getLastItemFromPath(v.path) === name))
        .map(({ name }) => name);

    const optionIsGrouped = _optionGroups.some(({ name }) => name === optionName);

    return (
        <>
            <TitleBar
                title='Edit Option'
            />
            <Select
                disabled={!!optionValues.length}
                data-cy="edit-option-name"
                label="Option Name"
                value={optionName}
                options={filterOptionsAbove(option, validOptions)
                    .map(({ name }) => name)}
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
                        path: oPath,
                        __typename,
                        update: {
                            name,
                            [`default${__typename}Value`]: instanceDefaultValue,

                        }
                    })
                    if (_optionGroups.some(og => og.name === name)) {
                        instanceValues.forEach(value => dispatch(ADD_ITEM, {
                            [`parent${__typename}Path`]: `${getParentPath(option)}.${name}`,
                            name: getLastItemFromPath(value.path),
                            __typename: `${__typename}Value`,
                        }, {
                            replaceState: true,
                        }))
                    }
                }}
            />
            {oPath.match(/__DT__/) && canItemBeGrouped(option, systemMap) ? (
                <Input
                    data-cy="group-option"
                    type="switch"
                    label="Grouped"
                    checked={optionIsGrouped}
                    onChange={() => dispatch(optionIsGrouped ? DELETE_OPTION_GROUP : ADD_OPTION_GROUP, option)}
                />
            ) : null}
            {/* <button
                data-cy="edit-option-value-group-option-button"
                className="sidebar-button light"
                onClick={() => dispatch(optionIsGrouped ? DELETE_OPTION_GROUP : ADD_OPTION_GROUP, option)}
                >
                {optionIsGrouped ? 'Ungroup Option' : 'Group Option'}
            </button> */}
            <GroupingBox
                data-cy="edit-option-values"
                title="Option Values"
                circleButton={selectValidOptionValues.length > 0 ? {
                    "data-cy": "add-option-value",
                    actionType: "add",
                    className: "action",
                    onClick: () => {
                        const addValueToEachOption = () => {
                            const valueName = (validOptionValues.find(({ name }) => !optionValues
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
                                [`parent${__typename}Path`]: oPath,
                                name: (validOptionValues.find(({ name }) => !optionValues
                                    .some(ov => name === getLastItemFromPath(ov.path))).name) || 'New Value',
                                __typename: `${__typename}Value`,
                            });
                    }
                } : undefined}
            >
                {optionValues.length ?
                    optionValues.map((item, i, { length }) => {
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
                                                    })
                                                })
                                        };
                                        optionIsGrouped ?
                                            confirmWithModal(deleteValueFromEachOption, {
                                                titleBar: { title: `Delete Grouped Option Value` },
                                                children: `Deleting a value attached to a grouped option will delete the value to all existing items with the name of ${optionName.toLowerCase()}`,
                                                finishButtonText: 'Delete',
                                                danger: true,
                                            })
                                            :
                                            valueChildren.length > 0 ?
                                                confirmWithModal(deleteOptionValue, {
                                                    titleBar: { title: `Delete ${vName}` },
                                                    children: `Deleting ${vName.toLowerCase()} will delete all the items below it. Do you want to continue?`,
                                                    finishButtonText: 'Delete',
                                                    danger: true,
                                                })
                                                :
                                                deleteOptionValue();


                                    }}
                                />
                            </div>
                        )
                    }) : (
                        <div>
                            No Values
                        </div>
                    )}
            </GroupingBox>
            {!oPath.match(/^\d+\.\w+$/) ? (
                <>
                    <button
                        data-cy="edit-option-move-button"
                        className="sidebar-button light"
                        onClick={() => partialAction && partialAction.ACTION === "MOVE" ?
                            cancelPartial()
                            :
                            dispatchPartial('MOVE', option)}
                    >
                        {partialAction && partialAction.ACTION === "MOVE" ? 'Cancel Move' : 'Move Option'}
                    </button>
                    <button
                        data-cy="edit-option-copy-button"
                        className="sidebar-button light"
                        onClick={() => partialAction && partialAction.ACTION === "COPY" ?
                            cancelPartial()
                            :
                            dispatchPartial('COPY', option)}
                    >
                        {partialAction && partialAction.ACTION === "COPY" ? 'Cancel Copy' : 'Copy Option'}
                    </button>
                </>
            )
                :
                null
            }
            {oPath.match(/__DT__/) ? (
                <Link
                    to={`${path.replace(/build/, 'detail')}${parseSearch(search).update({ path: oPath })}`}
                    className="sidebar-button empty"
                >
                    <button>
                        Edit {oPath.match(/__CT__/) ? "Configuration" : "Detail"}
                    </button>
                </Link>
            ) : null}
            {!oPath.match(/^\d+\.\w+$/) ? (
                <button
                    className="sidebar-button danger"
                    data-cy="edit-option-delete-button"
                    onClick={() => {
                        const deleteOption = () => dispatch(DELETE_ITEM, {
                            path: oPath,
                            __typename,
                        })
                        if (optionValues.length > 0) confirmWithModal(deleteOption, {
                            titleBar: { title: `Delete ${optionName}?` },
                            children: `Deleting ${optionName.toLowerCase()} will delete all the items below it. Do you want to continue?`,
                            finishButtonText: 'Delete',
                            danger: true,
                        })
                        else deleteOption();
                    }}
                >
                    Delete Option
                </button>
            ) : null}
        </>
    );
}

export const SystemOption = {
    title: "Edit Option",
    component: withRouter(EditOption),
};

export const DetailOption = SystemOption;
export const ConfigurationOption = DetailOption;
