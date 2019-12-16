import React from 'react';
import { getConfigurationTypeFromPath } from '../../app-logic/system';
import Configuration from './Configuration';

export default function Detail({
    systemMap,
    configurations,
    configurationPaths,
    onClick = () => { },
    getConfigurationProps = () => { },
    getPartProps = () => { },
}) {
    return (
        <g>
            {configurations.map((configuration, i) => (
                <Configuration
                    key={i}
                    {...getConfigurationProps(configuration)}
                    getPartProps={getPartProps}
                    systemMap={systemMap}
                    detailConfiguration={configuration}
                    configurationOptionValue={systemMap[configurationPaths[getConfigurationTypeFromPath(configuration.path)]]}
                    onClick={() => onClick(configuration)}
                />
            ))}
        </g>
    );
};
