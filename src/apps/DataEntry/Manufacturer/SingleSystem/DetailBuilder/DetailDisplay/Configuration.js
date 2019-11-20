import React from 'react';
import { getChildren, getLastItemFromPath, getConfigurationTypeFromPath, getDefaultPath } from '../../../../../../app-logic/system-utils';
import Part from './Part';

export default function Configuration({
    configuration,
    configuration: {
        path,
    },
    systemMap,
    selectItem,
    selectedItem,
}) {
    console.log(arguments[0]);
    const configurationType = getConfigurationTypeFromPath(path);
    const selected = configuration === selectedItem;
    const fullPath = getDefaultPath(configuration, systemMap);
    const defaultNode = systemMap[fullPath];
    const parts = getChildren(defaultNode, systemMap);
    console.log({
        parts,
        selected,
        configurationType,
    });
    return (
        <g
            data-cy={`configuration-${path}`}
            className={`Configuration ${selected ? 'selected' : ''}`}
        >
            {parts.map(part => (
                <Part
                    {...arguments[0]}
                    part={part}
                    selectItem={() => selectItem(configuration)}
                />
            ))}
        </g>
    );
}