import React from 'react';
import { TitleBar, Input } from "../../../../../../../components";


function SystemOption({
    
}) {
    return (
        <>
            <TitleBar
                title = 'Edit Option'
            />
            <div className='input-group'>
                <Input
                    label='Option Name'
                    data-cy='edit-option-name'
                />
            </div>
        </>
    )
}

export default {
    title: "Edit Option",
    component: SystemOption,
};