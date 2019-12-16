import React from 'react';
import { getChildren, getConfigurationTypeFromPath } from '../../../../../app-logic/system';
import { Matrix } from '../../../../../utils';
import Part from './Part';

export default function Configuration({
    configuration,
    configuration: {
        path,
        transform: matrix,
    },
    systemMap,
    handleClick,
    selectedItem,
    selectedConfigurationPaths,
    padding,
}) {
    // console.log(arguments[0]);
    const configurationType = getConfigurationTypeFromPath(path);
    const selected = configuration === selectedItem;
    const selectedPath = selectedConfigurationPaths[configurationType];
    const selectedNode = systemMap[selectedPath];
    const parts = getChildren(selectedNode, systemMap);
    const transform = new Matrix(matrix);
    // console.log({
    //     parts,
    //     selected,
    //     configurationType,
    // });
    return (
        <g
            data-cy={`configuration-${path}`}
            className={`Configuration ${selected ? 'selected' : ''}`}
            transform={transform}
        >
            {parts.map(part => (
                <Part
                    {...arguments[0]}
                    part={part}
                    handleClick={() => handleClick(configuration)}
                />
            ))}
            <g className="configuration-origin">
                <path d={`M-${padding / 2},0L${padding / 2},0Z`} />
                <path d={`M0,-${padding / 2}L0,${padding / 2}Z`} />
                <circle
                    cx={0}
                    cy={0}
                    r={padding / 8}
                />
            </g>
        </g>
    );
}