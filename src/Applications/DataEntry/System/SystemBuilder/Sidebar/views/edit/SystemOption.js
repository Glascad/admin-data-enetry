import React from 'react';
import { TitleBar, Input, GroupingBox, CircleButton, useInitialState } from "../../../../../../../components";
import { UPDATE_SYSTEM_OPTION } from '../../../ducks/actions';


function SystemOption({
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
                    actionType: "add",
                    className: "action",
                    onClick: () => { },
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
                                    options: [],
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

export default {
    title: "Edit Option",
    component: SystemOption,
};