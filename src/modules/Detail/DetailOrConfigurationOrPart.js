import React from 'react';
import { getDefaultPath, getDetailOrConfigurationOrPartExtremities, getDefaultConfigurationPaths } from '../../app-logic/system';
import { match } from '../../utils';
import { getViewBox } from '../../utils/functions/svg-utils';
import Configuration from './Configuration';
import Detail from './Detail';
import Part from './Part';

export default function DetailOrConfigurationOrPart({
    systemMap,
    path,
    configurationPaths,
    className,
}) {

    if (!path.match(/\.__DT/)) return null;

    const item = systemMap[path];

    const selectedConfigurationPaths = configurationPaths || getDefaultConfigurationPaths(item, systemMap, false);

    return (
        <svg
            className={`DetailOrConfigurationOrPart ${className}`}
            viewBox={getViewBox(
                getDetailOrConfigurationOrPartExtremities(
                    item,
                    selectedConfigurationPaths,
                    systemMap,
                ),
            )}
            transform="scale(1, -1)"
        >
            {match(path)
                .regex(/__PT/i, () => (
                    <Part
                        part={item}
                    />
                ))
                .regex(/__CT/i, () => (
                    <Configuration
                        systemMap={systemMap}
                        detailConfiguration={item}
                        configurationOptionValue={systemMap[getDefaultPath(item, systemMap)]}
                    />
                ))
                .regex(/__DT/i, () => {
                    return (
                        <Detail
                            systemMap={systemMap}
                            detail={item}
                            configurationPaths={selectedConfigurationPaths}
                        />
                    );
                })
                .otherwise(null)}
        </svg>
    );
}
