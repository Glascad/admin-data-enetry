import React from 'react';
import { getConfigurationTypeFromPath, getDefaultConfigurationPaths, getChildren } from '../../app-logic/system';
import Configuration from './Configuration';

export default function Detail({
    systemMap,
    detail,
    configurationPaths,
    onClick = () => { },
    getConfigurationProps = () => { },
    getPartProps = () => { },
}) {
    const configurations = getChildren(detail, systemMap);
    const childPaths = configurationPaths || getDefaultConfigurationPaths(detail, systemMap);
    return (
        <g>
            {configurations.map((configuration, i) => (
                <Configuration
                    key={i}
                    {...getConfigurationProps(configuration)}
                    getPartProps={getPartProps}
                    systemMap={systemMap}
                    detailConfiguration={configuration}
                    configurationOptionValue={systemMap[childPaths[getConfigurationTypeFromPath(configuration.path)]]}
                    onClick={() => onClick(configuration)}
                />
            ))}
        </g>
    );
};
