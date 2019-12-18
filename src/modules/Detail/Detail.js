import React from 'react';
import { getConfigurationTypeFromPath, getDefaultConfigurationPaths, getChildren } from '../../app-logic/system';
import Configuration from './Configuration';

export default function Detail({
    systemMap,
    detail,
    configurationPaths = {},
    className = "",
    onClick = () => { },
    getConfigurationProps = () => { },
    getPartProps = () => { },
}) {
    const configurations = getChildren(detail, systemMap);
    const childPaths = configurationPaths || getDefaultConfigurationPaths(detail, systemMap);
    const selectedConfigurationTypes = Object.keys(configurationPaths);
    return (
        <g className={`Detail ${className}`}>
            {configurations
                .filter(({ path }) => selectedConfigurationTypes.includes(getConfigurationTypeFromPath(path)))
                .map((configuration, i) => (
                    <Configuration
                        key={i}
                        {...getConfigurationProps(configuration)}
                        getPartProps={getPartProps}
                        systemMap={systemMap}
                        detailConfiguration={configuration}
                        configurationOptionValue={systemMap[childPaths[getConfigurationTypeFromPath(configuration.path)]]}
                        onClick={() => onClick(configuration)}
                        doNotTransform={false}
                    />
                ))}
        </g>
    );
};
