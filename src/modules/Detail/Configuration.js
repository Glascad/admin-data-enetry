import React from 'react';
import { getChildren } from '../../app-logic/system';
import { Matrix } from '../../utils';
import Part from './Part';

export default function Configuration({
    detailConfiguration,
    detailConfiguration: {
        transform: matrix,
    } = {},
    configurationOptionValue,
    systemMap,
    onClick = () => { },
    className = '',
    getPartProps = () => { },
    doNotTransform = true,
}) {

    const parts = getChildren(configurationOptionValue || detailConfiguration, systemMap);
    const transform = doNotTransform ? undefined : new Matrix(matrix);

    return (
        <g
            className={`Configuration ${className}`}
            transform={transform}
        >
            {parts.map(part => (
                <Part
                    {...getPartProps(part)}
                    part={part}
                    onClick={onClick}
                />
            ))}
        </g>
    );
}