import React from 'react';
import { getDefaultConfigurationPaths, getDefaultPath, getDetailOrConfigurationOrPartExtremities } from '../../app-logic/system';
import { nullIf, useInitialState } from '../../components';
import { match } from '../../utils';
import { getViewBox } from '../../utils/functions/svg-utils';
import Configuration from './Configuration';
import Detail from './Detail';
import './DetailOrConfigurationOrPart.scss';
import Part from './Part';

function DetailOrConfigurationOrPart({
    systemMap,
    path,
    configurationPaths,
    id,
    className,
    style,
    getDetailProps = () => { },
    getConfigurationProps = () => { },
    getPartProps = () => { },
    children,
}) {

    const item = systemMap[path];

    const selectedConfigurationPaths = configurationPaths || getDefaultConfigurationPaths(item, systemMap, false);

    const configurationPathString = Object.values(selectedConfigurationPaths).sort().join();

    const [viewBox, setViewBox] = useInitialState(
        getViewBox(
            getDetailOrConfigurationOrPartExtremities(
                item,
                selectedConfigurationPaths,
                systemMap,
            ),
        ),
        [path, !!item, configurationPathString],
    );

    const [x, y, width, height] = viewBox.split(/\s+/g);

    return (
        <svg
            id={id}
            className={`DetailOrConfigurationOrPart ${className}`}
            viewBox={viewBox}
            transform="scale(1, -1)"
            style={style}
        >
            {match(path)
                .regex(/__PT/i, () => (
                    <Part
                        {...getPartProps(item)}
                        part={item}
                    />
                ))
                .regex(/__CT/i, () => (
                    <Configuration
                        {...getConfigurationProps(item)}
                        getPartProps={getPartProps}
                        systemMap={systemMap}
                        detailConfiguration={item}
                        configurationOptionValue={systemMap[getDefaultPath(item, systemMap)]}
                    />
                ))
                .regex(/__DT/i, () => {
                    return (
                        <Detail
                            {...getDetailProps(item)}
                            getConfigurationProps={getConfigurationProps}
                            getPartProps={getPartProps}
                            systemMap={systemMap}
                            detail={item}
                            configurationPaths={selectedConfigurationPaths}
                        />
                    );
                })
                .otherwise(null)}
            {children}
            <rect
                className="view-box"
                x={x}
                y={y}
                height={height}
                width={width}
            />
        </svg>
    );
}

export default nullIf(DetailOrConfigurationOrPart, ({ path }) => !path.match(/\.__DT/));
