import React, { useState } from 'react';
import { TitleBar, Input, GroupingBox, CircleButton, useInitialState } from "../../../../../../components";
import { UPDATE_SYSTEM_OPTION, ADD_SYSTEM_OPTION_VALUE } from '../../ducks/actions';
import { systemOptionUpdate } from '../../ducks/schemas';


function EditOption({
    selectedItem,
    selectedItem: {
        id: oId,
        fakeId: oFId,
        name: oName,
        _systemOptionValues = [],
    } = {},
    queryStatus: {
        validOptions = [],
    } = {},
    dispatch,
}) {
    console.log(arguments[0]);
    const [newValue, setNewValue] = useState();
    const handleAddClick = () => setNewValue(systemOptionUpdate);
    const handleBlur = () => dispatch(ADD_SYSTEM_OPTION_VALUE)
    return (
        <>
            <TitleBar
                title='Edit Option'
            />
            <div className='sidebar-group'>
                <Input
                    label='Option Name'
                    data-cy='edit-option-name'
                    select={{
                        value: {
                            value: oName,
                            label: oName,
                        },
                        options: validOptions
                            .filter(({ name }) => name !== oName)
                            .map(({ name }) => ({
                                value: name,
                                label: name,
                            })),
                        onChange: ({ label }) => dispatch(UPDATE_SYSTEM_OPTION, {
                            id: oId,
                            fakeId: oFId,
                            name: label,
                        }),
                    }}
                />
            </div>
            <GroupingBox
                data-cy="edit-option-values"
                title="Option Values"
                circleButton={{
                    "data-cy": "add-option-value",
                    actionType: "add",
                    className: "action",
                    onClick: () => dispatch(ADD_SYSTEM_OPTION_VALUE, {
                        id: oId,
                        fakeId: oFId,
                        // systemOptionValues: 
                    }),
                }}
            >
                {_systemOptionValues.length ?
                    _systemOptionValues.map(({ name, id, fakeId }) => (
                        <div className="input-group">
                            <Input
                                key={id || fakeId}
                                select={{
                                    value: {
                                        label: name,
                                        value: id,
                                    },
                                    options: validOptions
                                        .reduce((values, { name: vName, _validOptionValues }) => (
                                            vName === name ?
                                                _validOptionValues
                                                :
                                                values
                                        ), [])
                                        .filter(({ name }) => !_systemOptionValues.some(v => v.name === name))
                                        .map(({ name }) => ({
                                            value: name,
                                            label: name,
                                        })),
                                    onChange: () => { },
                                }}
                            />
                            <CircleButton
                                className="danger"
                                type="small"
                                actionType="delete"
                                onClick={() => { }}
                            />
                        </div>
                    )) : (
                        <div>
                            No Values
                        </div>
                    )}
            </GroupingBox>
        </>
    )
}

export const SystemOption = {
    title: "Edit Option",
    component: EditOption,
};

export const DetailOption = SystemOption;
export const ConfigurationOption = DetailOption;
