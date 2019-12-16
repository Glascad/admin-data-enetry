import React from 'react';
import { getChildren } from '../../app-logic/system';
import { Matrix } from '../../utils';
import Part from './Part';

export default function Configuration({
    detailConfiguration,
    detailConfiguration: {
        transform: matrix,
    },
    configurationOptionValue,
    systemMap,
    onClick = () => { },
    className = '',
    getPartProps = () => { },
}) {

    const parts = getChildren(configurationOptionValue || detailConfiguration, systemMap);
    const transform = new Matrix(matrix);

    console.log(arguments[0]);

    console.log({ parts, transform });

    return (
        <g
            className={`Configuration ${className}`}
            transform={transform}
        >
            {parts.map(part => (
                <Part
                    {...arguments[0]}
                    {...getPartProps(part)}
                    part={part}
                    onClick={onClick}
                />
            ))}
        </g>
    );
}