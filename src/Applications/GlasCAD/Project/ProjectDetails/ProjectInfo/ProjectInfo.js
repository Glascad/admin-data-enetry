import React from 'react';
import {
    TitleBar,
    Input,
} from '../../../../../components';

export default function ProjectInfo({
    queryStatus: {
        _project: {
            name = '',
        } = {},
    },
}) {
    // console.log(arguments[0]);
    return (
        <>
            <TitleBar
                title="Project Info"
            />
            <Input
                label="Project Name"
                value={name}
                onChange={() => console.log("Cannot change!")}
            />
        </>
    )
}