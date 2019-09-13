import React, { useState, useEffect } from 'react';
import { TitleBar, Input, GroupingBox, Toggle, CircleButton, confirmWithModal } from '../../../../../../components';
import { getParent, getChildren } from '../../ducks/utils';
import { UPDATE_OPTION_VALUE, DELETE_OPTION_VALUE, ADD_OPTION, ADD_TYPE, UPDATE_OPTION, DELETE_OPTION, DELETE_TYPE, UPDATE_TYPE } from '../../ducks/actions';
import { when } from '../../../../../../utils';

function EditOptionValue({
    selectedItem: optionValue,
    selectedItem: {
        id: ovId,
        fakeId: ovFId,
        name: ovName,
        isDefault,
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

    const option = getParent(optionValue, system);
    const values = getChildren(option, systemMap);
    const valueChildren = getChildren(optionValue, systemMap);

    const validValues = validOptions
        .reduce((values, { name, _validOptionValues }) => (
            option.name.toLowerCase() === name.toLowerCase() ?
                _validOptionValues
                :
                values
        ), []);

    const selectValidValues = validValues
        .filter(({ name }) => !values.some(v => v.name === name))
        .map(({ name }) => ({
            value: name,
            label: name,
        }));

    const {
        0: childOption,
        0: {
            id: childOptionId,
            fakeId: childOptionFakeId,
            name: childOptionName,
            __typename: childTypename = ''
        } = {},
    } = valueChildren;

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

    console.log({ selectValidTypes, childTypename, childTypeType, valueChildren });

    const selectTypes = selectValidTypes
        .filter(name => !valueChildren.some(({ detailType = '', configurationType = '' }) => (
            name.toLowerCase() === (detailType || configurationType).toLowerCase()
        )))
        .map(name => ({
            value: name,
            label: name,
        }));

    console.log({ validValues, selectValidValues });

    const childValues = getChildren(childOption, systemMap); //Option Value's Child's Child

    return (
        <>
            <TitleBar
                title="Edit Option Value"
            />
            <Input
                data-cy="edit-value-name"
                // className={hasChildren ? 'warning' : ''}
                select={{
                    value: {
                        label: ovName,
                        value: ovName,
                    },
                    options: selectValidValues,
                    onChange: ({ value }) => hasChildren ?
                        confirmWithModal(() =>
                            dispatch(UPDATE_OPTION_VALUE, {
                                id: ovId,
                                fakeId: ovFId,
                                __typename,
                                name: value,
                            }), {
                            finishingText: 'Update Name'
                        })
                        :
                        dispatch(UPDATE_OPTION_VALUE, {
                            id: ovId,
                            fakeId: ovFId,
                            __typename,
                            name: value,
                        })
                }}
            />
            {isDefault ? null : (
                <button
                    className="sidebar-button light"
                // onClick={() => dispatch(MAKE_DEFAULT, {
                //     id: ovId,
                //     fakeId: ovFId,
                //     __typename,
                // })}
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
                                className: (hasChildren && optionIsSelected) ? 'warning' : '',
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
                            onClick: () => dispatch(ADD_OPTION, {
                                __typename: __typename.replace(/value/i, ''),
                                parentOptionValueId: ovId,
                                parentOptionValueFakeId: ovFId,
                                name: "Select Option",
                            }),
                        }
                    :
                    valueChildren.length < selectValidTypes.length ? {
                        "data-cy": `add-${childTypeType.toLowerCase()}`,
                        actionType: "add",
                        className: "action",
                        onClick: () => dispatch(ADD_TYPE, {
                            __typename: childTypeTypename,
                            parentOptionValueId: ovId,
                            parentOptionValueFakeId: ovFId,
                            type: `Select ${childTypeType} Type`,
                        }),
                    }
                        :
                        undefined}
            >
                {optionIsSelected ? (
                    hasChildren ? (
                        <div className="input-group">
                            <Input
                                className={childValues.length > 0 ? 'warning' : ''}
                                data-cy="edit-option-name"
                                select={{
                                    autoFocus: true,
                                    value: {
                                        label: childOptionName,
                                        value: childOptionName,
                                    },
                                    options: validOptions.map(({ name }) => ({
                                        value: name,
                                        label: name,
                                    })),
                                    onChange: ({ value }) => dispatch(UPDATE_OPTION, {
                                        __typename: __typename.replace(/value/i, ''),
                                        id: childOptionId,
                                        fakeId: childOptionFakeId,
                                        name: value,
                                    }),
                                }}
                            />
                            <CircleButton
                                data-cy="delete-option"
                                type="small"
                                className="danger"
                                actionType="delete"
                                onClick={() => {
                                    return childValues.length > 0 ?
                                        confirmWithModal(() => dispatch(DELETE_OPTION, {
                                            __typename: __typename.replace(/value/i, ''),
                                            id: childOptionId,
                                            fakeId: childOptionFakeId,
                                        }), {
                                            danger: true,
                                            finishButtonText: 'Delete',
                                        })
                                        :
                                        dispatch(DELETE_OPTION, {
                                            __typename: __typename.replace(/value/i, ''),
                                            id: childOptionId,
                                            fakeId: childOptionFakeId,
                                        })
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
                                {valueChildren.map(({ detailType, configurationType, id, fakeId }, i, { length }) => {
                                    const childType = getChildren(childOption, systemMap);
                                    return (
                                        <div
                                            className="input-group"
                                            key={(detailType || configurationType)}
                                        >
                                            <Input
                                                data-cy={`edit-${childTypeType}-type-${(detailType || configurationType)}`}
                                                select={{
                                                    autoFocus: i === length - 1,
                                                    value: {
                                                        label: (detailType || configurationType),
                                                        value: (detailType || configurationType),
                                                    },
                                                    options: selectTypes,
                                                    onChange: ({ value }) => childType.length > 0 ?
                                                        confirmWithModal(() => dispatch(UPDATE_TYPE, {
                                                            __typename: childTypeTypename,
                                                            id,
                                                            fakeId,
                                                            type: value,
                                                        }), {
                                                            danger: true,
                                                            finishButtonText: 'Update Name',
                                                        })
                                                        :
                                                        dispatch(UPDATE_TYPE, {
                                                            __typename: childTypeTypename,
                                                            id,
                                                            fakeId,
                                                            type: value,
                                                        })
                                                }}
                                            />
                                            <CircleButton
                                                data-cy={`delete-${childTypeType.toLowerCase()}-type-${(detailType || configurationType)}`}
                                                type="small"
                                                className="danger"
                                                actionType="delete"
                                                onClick={() => childType.length > 0 ?
                                                    confirmWithModal(() => dispatch(DELETE_TYPE, {
                                                        __typename: childTypename,
                                                        id,
                                                        fakeId,
                                                    }), {
                                                        danger: true,
                                                        finishButtonText: 'Delete',
                                                    })
                                                    :
                                                    dispatch(DELETE_TYPE, {
                                                        __typename: childTypename,
                                                        id,
                                                        fakeId,
                                                    })}
                                            />
                                        </div>
                                    )
                                }
                                )}
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
                onClick={() => hasChildren ?
                    confirmWithModal(() => dispatch(DELETE_OPTION_VALUE, {
                        id: ovId,
                        fakeId: ovFId,
                        __typename,
                    }), {
                        className: "sidebar-button danger",
                        danger: true,
                        finishButtonText: 'Delete',
                    })
                    :
                    dispatch(DELETE_OPTION_VALUE, {
                        id: ovId,
                        fakeId: ovFId,
                        __typename,
                    })}
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
