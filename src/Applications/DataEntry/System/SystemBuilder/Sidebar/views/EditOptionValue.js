import React, { useState } from 'react';
import { TitleBar, Input, GroupingBox, Toggle, CircleButton } from '../../../../../../components';
import { getParent, getChildren } from '../../ducks/utils';
import { UPDATE_OPTION_VALUE, DELETE_OPTION_VALUE, ADD_OPTION, ADD_TYPE, UPDATE_OPTION, DELETE_OPTION, DELETE_TYPE, UPDATE_TYPE } from '../../ducks/actions';
import { when } from '../../../../../../utils';

function EditOptionValue({
    selectedItem: optionValue,
    selectedItem: {
        id: ovId,
        fakeId: ovFId,
        name: ovName,
        __typename,
    },
    system,
    systemMap,
    queryStatus: {
        validOptions = [],
        detailTypes = [],
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

    const childTypeTypname = `System${__typename
        .replace(/OptionValue/i, 'Type')
        .replace(/Detail/i, 'Configuration')
        .replace(/System/i, 'Detail')}`;

    const [optionSelected, setOptionIsSelected] = useState(true);

    const hasChildren = !!childTypename;
    const optionIsSelected = hasChildren ?
        !!childTypename.match(/option/i)
        :
        optionSelected;

    return (
        <>
            <TitleBar
                title="Edit Option Value"
            />
            <Input
                data-cy="edit-value-name"
                select={{
                    value: {
                        label: ovName,
                        value: ovName,
                    },
                    options: selectValidValues,
                    onChange: ({ value }) => dispatch(UPDATE_OPTION_VALUE, {
                        id: ovId,
                        fakeId: ovFId,
                        __typename,
                        name: value,
                    }),
                }}
            />
            <GroupingBox
                title={(
                    <Toggle
                        buttons={[
                            {
                                text: "Option",
                                "data-cy": "toggle-child-option",
                                selected: optionIsSelected,
                                className: (hasChildren && !optionIsSelected) ? 'warning' : '',
                                onClick: () => setOptionIsSelected(true),
                            },
                            {
                                text: "Details",
                                "data-cy": "toggle-child-detail",
                                selected: !optionIsSelected,
                                className: (hasChildren && optionIsSelected) ? 'warning' : '',
                                onClick: () => setOptionIsSelected(false),
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
                    selectValidValues.length ? {
                        "data-cy": "add-detail",
                        actionType: "add",
                        className: "action",
                        onClick: () => dispatch(ADD_TYPE, {
                            __typename: childTypeTypname,
                            parentOptionValueId: ovId,
                            parentOptionValueFakeId: ovFId,
                            name: "Select Detail Type",
                        }),
                    }
                        :
                        undefined}
            >
                {
                    optionIsSelected ? (
                        hasChildren ? (
                            <div className="input-group">
                                <Input
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
                                    onClick={() => dispatch(DELETE_OPTION, {
                                        __typename: __typename.replace(/value/i, ''),
                                        id: childOptionId,
                                        fakeId: childOptionFakeId,
                                    })}
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
                                    {valueChildren.map(({ name, id, fakeId }) => (
                                        <div
                                            className="input-group"
                                            key={name}
                                        >
                                            <Input
                                                data-cy={`edit-detail-type-${name}`}
                                                select={{
                                                    autoFocus: true,
                                                    value: {
                                                        label: name,
                                                        value: name,
                                                    },
                                                    options: detailTypes.map(name => ({
                                                        value: name,
                                                        label: name,
                                                    })),
                                                    onChange: ({ value }) => dispatch(UPDATE_TYPE, {
                                                        __typename: childTypeTypname,
                                                        id,
                                                        fakeId,
                                                        name: value,
                                                    }),
                                                }}
                                            />
                                            <CircleButton
                                                data-cy={`delete-detail-type-${name}`}
                                                type="small"
                                                className="danger"
                                                actionType="delete"
                                                onClick={() => dispatch(DELETE_TYPE, {
                                                    __typename: childTypename,
                                                    id,
                                                    fakeId,
                                                })}
                                            />
                                        </div>
                                    ))}
                                </>
                            ) : (
                                    <div>
                                        No Details
                                    </div>
                                )
                        )}
            </GroupingBox>
            <button
                className="sidebar-button danger"
                onClick={() => dispatch(DELETE_OPTION_VALUE, {
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
