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
    preserveInitialViewBox = false,
}) {

    const item = systemMap[path];

    const selectedConfigurationPaths = configurationPaths || getDefaultConfigurationPaths(item, systemMap, false);

    const configurationPathString = Object.values(selectedConfigurationPaths).sort().join();

    console.log({ path, item, selectedConfigurationPaths });
    // console.log(configurationPathString);
    // console.log({ item, selectedConfigurationPaths });

    const viewBox = getViewBox(
        getDetailOrConfigurationOrPartExtremities(
            item,
            selectedConfigurationPaths,
            systemMap,
        ),
    );

    const [initialViewBox, setViewBox] = useInitialState(viewBox, [path, !!item, configurationPathString]);

    return (
        <svg
            id={id}
            className={`DetailOrConfigurationOrPart ${className}`}
            viewBox={preserveInitialViewBox ? initialViewBox : viewBox}
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
        </svg>
    );
}

export default nullIf(DetailOrConfigurationOrPart, ({ path = '' }) => !path.match(/\.__DT/));
