import React, { useState } from 'react';
import { TitleBar, Input, GroupingBox, CircleButton, useInitialState, confirmWithModal } from "../../../../../../components";
import { UPDATE_OPTION, ADD_OPTION_VALUE, UPDATE_OPTION_VALUE, DELETE_OPTION_VALUE, DELETE_OPTION } from '../../ducks/actions';
import { systemOptionUpdate } from '../../ducks/schemas';
import { getChildren, filterOptionsAbove } from '../../../../../../application-logic/system-utils';


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
    system,
    systemMap,
    queryResult: {
        validOptions = [],
    } = {},
    dispatch,
}) {

    console.log(arguments[0])

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
                            options: filterOptionsAbove(option, system, validOptions)
                                // .filter(({ name }) => name !== oName)
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
                        setAsDefault: !!(optionValues.length === 0)
                    }),
                } : undefined}
            >
                {optionValues.length ?
                    optionValues.map(({ name, id, fakeId, __typename: valueTypename, name: vName }, i, { length }) => (
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
                                    onChange: ({ value }) => {
                                        const valueChildren = getChildren({ __typename: valueTypename, fakeId, id }, systemMap);
                                        const updateOptionValue = () => dispatch(UPDATE_OPTION_VALUE, {
                                            id,
                                            fakeId,
                                            name: value,
                                            __typename: `${__typename}Value`,
                                        })
                                        if (valueChildren.length > 0) confirmWithModal(updateOptionValue, {
                                            titleBar: { title: `Change ${value}` },
                                            children: 'Are you sure?',
                                            finishButtonText: 'Change',
                                        })
                                        else updateOptionValue();
                                    }

                                }}
                            />
                            <CircleButton
                                data-cy={`delete-option-value-${name}`}
                                className="danger"
                                type="small"
                                actionType="delete"
                                onClick={() => {
                                    const valueChildren = getChildren({ __typename: valueTypename, fakeId, id }, systemMap);
                                    const defaultOptionValueIdKey = `default${__typename}ValueId`
                                    const defaultOptionValueFakeIdKey = `default${__typename}ValueFakeId`
                                    const isDefault = id ? option[defaultOptionValueIdKey] === id : option[defaultOptionValueFakeIdKey] === fakeId;
                                    const newDefaultId = (optionValues.length > 1) && isDefault ?
                                        optionValues.find(v => !(v.id === id && v.fakeId === fakeId)).id
                                        :
                                        undefined;
                                    const newDefaultFakeId = !newDefaultId && isDefault && (optionValues.length > 1) ?
                                        optionValues.find(v => !(v.id === id && v.fakeId === fakeId)).fakeId
                                        :
                                        undefined;

                                    console.log({ newDefaultId, newDefaultFakeId });
                                    const deleteOptionValue = () => dispatch(DELETE_OPTION_VALUE, {
                                        parentOptionId: oId,
                                        parentOptionFakeId: oFId,
                                        id,
                                        fakeId,
                                        __typename: `${__typename}Value`,
                                        newDefaultId,
                                        newDefaultFakeId,
                                    });
                                    if (valueChildren.length > 0) confirmWithModal(deleteOptionValue, {
                                        titleBar: { title: `Delete ${vName}` },
                                        children: `Deleting ${vName.toLowerCase()} will delete all the items below it. Do you want to continue?`,
                                        finishButtonText: 'Delete',
                                        danger: true,
                                    })
                                    else deleteOptionValue();
                                }}
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
                        data-cy="edit-option-delete-button"
                        onClick={() => {
                            const deleteOption = () => dispatch(DELETE_OPTION, {
                                id: oId,
                                fakeId: oFId,
                                __typename,
                            })
                            if (optionValues.length > 0) confirmWithModal(deleteOption, {
                                titleBar: { title: `Delete ${oName}?` },
                                children: `Deleting ${oName.toLowerCase()} will delete all the items below it. Do you want to continue?`,
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
    component: EditOption,
};

export const DetailOption = SystemOption;
export const ConfigurationOption = DetailOption;
