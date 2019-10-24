import React, { useState } from 'react';
import { TitleBar, Input, GroupingBox, Toggle, CircleButton, confirmWithModal, Select } from '../../../../../../../components';
import { getParent, getChildren, filterOptionsAbove, getSiblings, getLastItemFromPath } from '../../../../../../../app-logic/system-utils';
import { UPDATE_ITEM, ADD_ITEM, DELETE_ITEM } from '../../ducks/actions';

function EditOptionValue({
    selectedItem: optionValue,
    selectedItem: {
        path: ovPath,
        __typename,
    },
    system,
    systemMap,
    queryResult: {
        validOptions = [],
        detailTypes = [],
        configurationTypes = [],
    } = {},
    dispatch,
}) {
    console.log(arguments[0]);

    const option = getParent(optionValue, systemMap);
    const values = getSiblings(optionValue, systemMap);
    const valueChildren = getChildren(optionValue, systemMap);

    const { path: oPath, __typename: oTypename } = option;

    const oName = oPath.replace(/^.*\.(\w+)$/, '$1');
    const ovName = ovPath.replace(/^.*\.(\w+)$/, '$1');

    const isDefault = option[Object.keys(option).find(k => k.match(/default/i))] === ovName;

    const validValues = validOptions
        .reduce((values, { name, _validOptionValues }) => (
            oName.toLowerCase() === name.toLowerCase() ?
                _validOptionValues
                :
                values
        ), []);

    const selectValidValues = validValues
        .filter(({ name }) => !values.some(v => getLastItemFromPath(v.path) === name))
        .map(({ name }) => name);

    const {
        0: childOption,
        0: {
            path: childOptionPath = '',
            __typename: childTypename = ''
        } = {},
    } = valueChildren;
    const childOptionName = childOption ? getLastItemFromPath(childOptionPath) : '';

    const childOptionChildren = getChildren(childOption, systemMap); // Option Value's Child's Child

    const childTypeTypename = `System${__typename
        .replace(/OptionValue/i, '')
        .replace(/Detail/i, 'Configuration')
        .replace(/System/i, 'Detail')}`;

    const childTypeType = __typename.match(/SystemOption/i) ? 'Detail' : 'Configuration';

    const [optionSelected, setOptionIsSelected] = useState(true);

    const hasChildren = !!childTypename;
    const optionIsSelected = hasChildren ?
        !!childTypename.match(/option/i)
        :
        optionSelected;

    const selectValidTypes = childTypename.match(/detail/i) ?
        detailTypes
        :
        configurationTypes;

    const selectTypes = selectValidTypes
        .filter(name => !valueChildren.some(({ path: childTypePath }) => (
            name.toLowerCase() === (getLastItemFromPath(childTypePath).toLowerCase()))))

    return (
        <>
            <TitleBar
                title="Edit Option Value"
            />
            <Select
                label="Option Value"
                value={ovName}
                data-cy="edit-value-name"
                options={selectValidValues}
                onChange={name => {
                    if (name !== ovName) {
                        const updateOptionValue = () => dispatch(UPDATE_ITEM, {
                            path: ovPath,
                            __typename,
                            update: {
                                name,
                            }
                        })
                        hasChildren ?
                            confirmWithModal(updateOptionValue, {
                                titleBar: { title: `Change ${ovName}?` },
                                children: 'Are you Sure?',
                                finishButtonText: 'Change',
                            })
                            :
                            updateOptionValue()
                    }
                }}
            />
            {isDefault ? null : (
                <button
                    data-cy="edit-option-value-default-button"
                    className="sidebar-button light"
                    onClick={() => dispatch(UPDATE_ITEM, {
                        path: oPath,
                        __typename: oTypename,
                        update: {
                            [`default${__typename}`]: ovName,
                        }
                    })}
                >
                    Make Default
                </button>
            )}
            <GroupingBox
                data-cy="edit-children"
                title={(
                    <Toggle
                        buttons={[
                            {
                                text: "Option",
                                "data-cy": "toggle-child-option",
                                selected: optionIsSelected,
                                className: (hasChildren && !optionIsSelected) ? 'warning' : '',
                                onClick: () => !hasChildren && setOptionIsSelected(true),
                            },
                            {
                                text: `${childTypeType.slice(0, 6)}s`,
                                "data-cy": `toggle-child-${childTypeType.toLowerCase()}`,
                                selected: !optionIsSelected,
                                className: hasChildren && optionIsSelected ? 'warning' : '',
                                onClick: () => !hasChildren && setOptionIsSelected(false),
                            },
                        ]}
                    />
                )}
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
                                [`parent${__typename}Path`]: ovPath,
                                name: filterOptionsAbove(optionValue, validOptions)[0].name,
                            }),
                        }
                    :
                    valueChildren.length < selectValidTypes.length ? {
                        "data-cy": `add-${childTypeType.toLowerCase()}`,
                        actionType: "add",
                        className: "action",
                        onClick: () => dispatch(ADD_ITEM, {
                            __typename: childTypeTypename,
                            [`parent${__typename}Path`]: ovPath,
                            name: selectTypes[0],
                        }),
                    }
                        :
                        undefined}
            >
                {optionIsSelected ? (
                    hasChildren ? (
                        <div className="input-group">
                            <Select
                                className={childOptionChildren.length > 0 ? 'warning' : ''}
                                data-cy="edit-option-name"
                                autoFocus={childOptionChildren.length === 0}
                                value={childOptionName}
                                options={filterOptionsAbove(optionValue, validOptions)
                                    .map(({ name }) => name)}
                                onChange={name => dispatch(UPDATE_ITEM, {
                                    __typename: childTypename,
                                    path: childOptionPath,
                                    update: {
                                        name,
                                    }
                                })}
                            />
                            <CircleButton
                                data-cy="delete-option"
                                type="small"
                                className="danger"
                                actionType="delete"
                                onClick={() => {
                                    const deleteOption = () => dispatch(DELETE_ITEM, {
                                        __typename: childTypename,
                                        path: childOptionPath,
                                    });
                                    if (childOptionChildren.length > 0) confirmWithModal(deleteOption, {
                                        titleBar: { title: `Delete ${childOptionName}` },
                                        children: `Deleting ${childOptionName.toLowerCase()} will delete all the items below it. Do you want to continue?`,
                                        danger: true,
                                        finishButtonText: 'Delete',
                                    })
                                    else deleteOption();
                                }}
                            />
                        </div>
                    ) : (
                            <div>
                                No Option
                            </div>
                        )
                ) : (
                        hasChildren ? (
                            <>
                                {valueChildren.map(({ path: childTypePath }, i, { length }) => {
                                    const childTypeChildren = getChildren({ path: childTypePath }, systemMap);
                                    const childName = childTypePath.replace(/^.*\.(\w+)$/, '$1'); // Not __typename but type's Name
                                    return (<div
                                        className="input-group"
                                    // key={i}
                                    >
                                        <Select
                                            data-cy="edit-value-name"
                                            data-cy={`edit-${childTypeType}-type-${(childName).toLowerCase()}`}
                                            autoFocus={i === length - 1}
                                            value={childName}
                                            options={selectTypes}
                                            onChange={name => {
                                                if (childName !== name) {
                                                    const updateType = () => dispatch(UPDATE_ITEM, {
                                                        __typename: childTypeTypename,
                                                        path: childTypePath,
                                                        update: {
                                                            name,
                                                        }
                                                    });
                                                    childTypeChildren.length > 0 ?
                                                        confirmWithModal(updateType, {
                                                            titleBar: { title: `Change ${childName}` },
                                                            children: 'Are you sure?',
                                                            finishButtonText: 'Change',
                                                        })
                                                        :
                                                        updateType();
                                                }
                                            }}
                                        />
                                        <CircleButton
                                            data-cy={`delete-${childTypeType.toLowerCase()}-type-${childName}`}
                                            type="small"
                                            className="danger"
                                            actionType="delete"
                                            onClick={() => {
                                                const deleteType = () => dispatch(DELETE_ITEM, {
                                                    __typename: childTypename,
                                                    path: childTypePath,
                                                });
                                                if (childTypeChildren.length > 0) confirmWithModal(deleteType, {
                                                    titleBar: { title: `Delete ${childName}` },
                                                    children: `Deleting ${(childName).toLowerCase()} will delete all the items below it. Do you want to continue?`,
                                                    danger: true,
                                                    finishButtonText: 'Delete',
                                                });
                                                else deleteType();
                                            }}
                                        />
                                    </div>
                                    )
                                })}
                            </>
                        ) : (
                                <div>
                                    No {childTypeType}
                                </div>
                            )
                    )}
            </GroupingBox>
            <button
                className="sidebar-button danger"
                data-cy="edit-option-value-delete-button"
                onClick={() => {
                    console.log(ovPath);
                    const deleteOptionValue = () => dispatch(DELETE_ITEM, {
                        path: ovPath,
                        __typename,
                    });

                    if (hasChildren) confirmWithModal(deleteOptionValue, {
                        titleBar: { title: `Delete ${ovName}?` },
                        children: `Deleting ${ovName.toLowerCase()} will delete all the items below it. Do you want to continue?`,
                        danger: true,
                        finishButtonText: 'Delete',
                    });
                    else deleteOptionValue();
                }}
            >
                Delete Option Value
            </button>
        </>
    );
}

export const SystemOptionValue = {
    title: "Edit Option Value",
    component: EditOptionValue,
};

export const DetailOptionValue = SystemOptionValue;
export const ConfigurationOptionValue = DetailOptionValue;
