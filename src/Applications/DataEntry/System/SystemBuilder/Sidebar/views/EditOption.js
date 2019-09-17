import React, { useState } from 'react';
import { TitleBar, Input, GroupingBox, CircleButton, useInitialState, confirmWithModal } from "../../../../../../components";
import { UPDATE_OPTION, ADD_OPTION_VALUE, UPDATE_OPTION_VALUE, DELETE_OPTION_VALUE, DELETE_OPTION } from '../../ducks/actions';
import { systemOptionUpdate } from '../../ducks/schemas';
import { getChildren } from '../../../../../../application-logic/system-utils';


function EditOption({
    selectedItem: option,
    selectedItem: {
        id: oId,
        fakeId: oFId,
        name: oName,
        __typename,
        parentSystemOptionValueId,
        parentSystemOptionValueFakeId,
    } = {},
    systemMap,
    queryResult: {
        validOptions = [],
    } = {},
    dispatch,
}) {
    console.log(arguments[0]);
    const optionValues = getChildren(option, systemMap);

    const validOptionValues = validOptions
        .reduce((values, { name, _validOptionValues }) => (
            oName.toLowerCase() === name.toLowerCase() ?
                _validOptionValues
                :
                values
        ), []);

    const selectValidOptionValues = validOptionValues
        .filter(({ name }) => !optionValues.some(v => v.name === name))
        .map(({ name }) => ({
            value: name,
            label: name,
        }));

    console.log({
        optionValues,
        validOptions,
        validOptionValues,
        selectValidOptionValues,
    });

    return (
        <>
            <TitleBar
                title='Edit Option'
            />
            {/* <div className='sidebar-group'> */}
            <Input
                label='Option Name'
                data-cy='edit-option-name'
                className={optionValues.length ? 'warning' : ''}
                select={{
                    value: {
                        value: oName,
                        label: oName,
                    },
                    ...(optionValues.length ? {
                        options: [],
                    } : {
                            options: validOptions
                                .filter(({ name }) => name !== oName)
                                .map(({ name }) => ({
                                    value: name,
                                    label: name,
                                })),
                            onChange: ({ label }) => dispatch(UPDATE_OPTION, {
                                id: oId,
                                fakeId: oFId,
                                name: label,
                                __typename,
                            }),
                        }),
                }}
            />
            {/* </div> */}
            <GroupingBox
                data-cy="edit-option-values"
                title="Option Values"
                circleButton={selectValidOptionValues.length > 0 ? {
                    "data-cy": "add-option-value",
                    actionType: "add",
                    className: "action",
                    onClick: () => dispatch(ADD_OPTION_VALUE, {
                        parentOptionId: oId,
                        parentOptionFakeId: oFId,
                        name: (validOptionValues.find(({ name }) => !optionValues.some(ov => name === ov.name)) || {}).name || 'New Value',
                        __typename: `${__typename}Value`,
                    }),
                } : undefined}
            >
                {optionValues.length ?
                    optionValues.map(({ name, id, fakeId }, i, { length }) => (
                        <div
                            key={name}
                            className="input-group"
                        >
                            <Input
                                key={id || fakeId}
                                select={{
                                    autoFocus: i === length - 1,
                                    value: {
                                        label: name,
                                        value: id,
                                    },
                                    options: selectValidOptionValues,
                                    onChange: ({ value }) => dispatch(UPDATE_OPTION_VALUE, {
                                        id,
                                        fakeId,
                                        name: value,
                                        __typename: `${__typename}Value`,
                                    }),
                                }}
                            />
                            <CircleButton
                                data-cy={`delete-option-value-${name}`}
                                className="danger"
                                type="small"
                                actionType="delete"
                                onClick={() => dispatch(DELETE_OPTION_VALUE, {
                                    id,
                                    fakeId,
                                    __typename: `${__typename}Value`,
                                })}
                            />
                        </div>
                    )) : (
                        <div>
                            No Values
                        </div>
                    )}
            </GroupingBox>
            {(
                __typename !== 'SystemOption'
                ||
                parentSystemOptionValueFakeId
                ||
                parentSystemOptionValueId
            ) ? (
                    <button
                        className="sidebar-button danger"
                        onClick={() => dispatch(DELETE_OPTION, {
                            id: oId,
                            fakeId: oFId,
                            __typename,
                        })}
                    >
                        Delete Option
                    </button>
                ) : null}
        </>
    );
}

export const SystemOption = {
    title: "Edit Option",
    component: EditOption,
};

export const DetailOption = SystemOption;
export const ConfigurationOption = DetailOption;
