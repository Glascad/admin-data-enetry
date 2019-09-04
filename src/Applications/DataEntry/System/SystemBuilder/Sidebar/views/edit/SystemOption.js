import React from 'react';
import { TitleBar, Input, GroupingBox } from "../../../../../../../components";


function SystemOption({
    selectedItem,
    selectedItem: {
        _systemOptionValues = [],
    } = {},
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
                />
            </div>
            <GroupingBox
                data-cy="edit-option-values"
                title="Option Values"
                circleButton={{
                    actionType: "add",
                    className: "action",
                }}
            >
                {_systemOptionValues.map(({ name }) => (
                    <Input
                        value={name}
                    />
                ))}
            </GroupingBox>
        </>
    )
}

export default {
    title: "Edit Option",
    component: SystemOption,
};