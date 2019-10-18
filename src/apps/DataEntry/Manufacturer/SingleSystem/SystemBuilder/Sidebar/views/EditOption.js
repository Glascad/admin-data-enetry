import React, { useState } from 'react';
import { TitleBar, Input, GroupingBox, CircleButton, useInitialState, confirmWithModal, Select } from "../../../../../../../components";
import { UPDATE_ITEM, DELETE_ITEM, ADD_ITEM } from '../../ducks/actions';
import { getChildren, filterOptionsAbove, getLastItemFromPath } from '../../../../../../../app-logic/system-utils';

function EditOption({
    selectedItem: option = {},
    system,
    systemMap,
    queryResult: {
        validOptions = [],
    } = {},
    dispatch,
}) {
    console.log(arguments[0])

    const {
        path: oPath,
        newPath: oNewPath,
        __typename,
        [defaultKey]: defaultValue,
    } = option;

    const defaultKey = Object.keys(option).find(k => k.match(/default/i));
    const optionName = getLastItemFromPath(oNewPath || oPath);

    const optionValues = getChildren(option, systemMap);

    const validOptionValues = validOptions
        .reduce((values, { name, _validOptionValues }) => (
            optionName.toLowerCase() === name.toLowerCase() ?
                _validOptionValues
                :
                values
        ), []);

    const selectValidOptionValues = validOptionValues
        .filter(({ name }) => !optionValues.some(v => getLastItemFromPath(v.newPath || v.path) === name))
        .map(({ name }) => name);

    console.log({ optionValues, validOptionValues, selectValidOptionValues });

    return (
        <>
            <TitleBar
                title='Edit Option'
            />
            <Select
                className={optionValues.length ? 'warning' : ''}
                data-cy="edit-option-name"
                label="Option Name"
                value={optionName}
                options={filterOptionsAbove(option, validOptions)
                    .map(({ name }) => name)}
                onChange={name => dispatch(UPDATE_ITEM, {
                    path: oPath,
                    newPath: oNewPath,
                    __typename,
                    update: {
                        name,
                    }
                })}
            />
            <GroupingBox
                data-cy="edit-option-values"
                title="Option Values"
                circleButton={selectValidOptionValues.length > 0 ? {
                    "data-cy": "add-option-value",
                    actionType: "add",
                    className: "action",
                    onClick: () => dispatch(ADD_ITEM, {
                        [`parent${__typename}Path`]: oNewPath || oPath,
                        name: (validOptionValues.find(({ name }) => !optionValues.some(ov => name === getLastItemFromPath(ov.newPath || ov.path))).name) || 'New Value',
                        __typename: `${__typename}Value`,
                    }),
                } : undefined}
            >
                {optionValues.length ?
                    optionValues.map(({ path: ovPath, newPath: ovNewPath, __typename: valueTypename }, i, { length }) => {
                        const vName = (ovNewPath || ovPath).replace(/^.*\.(\w+)$/, '$1');
                        return (<div
                            className="input-group"
                        >
                            <Select
                                data-cy='edit-option-values'
                                key={'Option Name'}
                                value={vName}
                                options={selectValidOptionValues}
                                autoFocus={i === length - 1}
                                onChange={name => {
                                    if (name !== vName) {
                                        const valueChildren = getChildren({ __typename: valueTypename, path: ovPath, newPath: ovNewPath }, systemMap);
                                        const updateOptionValue = () => dispatch(UPDATE_ITEM, {
                                            path: ovPath,
                                            newPath: ovNewPath,
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
                                data-cy={`delete-option-value-${vName.toLowerCase()}`}
                                className="danger"
                                type="small"
                                actionType="delete"
                                onClick={() => {
                                    const valueChildren = getChildren({ __typename: valueTypename, path: ovPath }, systemMap);

                                    const deleteOptionValue = () => dispatch(DELETE_ITEM, {
                                        path: ovNewPath || ovPath,
                                        __typename: valueTypename,
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
                        )
                    }) : (
                        <div>
                            No Values
                        </div>
                    )}
            </GroupingBox>
            {(
                __typename !== 'SystemOption'
            ) ? (
                    <button
                        className="sidebar-button danger"
                        data-cy="edit-option-delete-button"
                        onClick={() => {
                            const deleteOption = () => dispatch(DELETE_ITEM, {
                                path: oNewPath || oPath,
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
    component: EditOption,
};

export const DetailOption = SystemOption;
export const ConfigurationOption = DetailOption;
