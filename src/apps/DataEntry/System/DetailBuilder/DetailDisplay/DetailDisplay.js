import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { getConfigurationTypeFromPath, getDetailTypeFromPath } from '../../../../../app-logic/system-utils';
import { TransformBox } from '../../../../../components';
import { TransformContext } from '../../../../../components/contexts/transform/TransformContext';
import { parseSearch } from '../../../../../utils';
import { StaticContext } from '../../../../Statics/Statics';
import Configuration from './Configuration';
import './DetailDisplay.scss';
import Part from './Part';

const padding = 0.5;

export default withRouter(function DetailDisplay({
    location: {
        search,
    },
    system,
    children,
    selectItem,
    selectedItem,
    systemMap,
    selectedConfigurationPaths,
    partialAction,
    partialAction: {
        payload: partialPayload,
    } = {},
    dispatchPartialPayload,
}) {

    const { Viewport } = useContext(StaticContext);
    const { scale: { x: scaleX, y: scaleY } } = useContext(TransformContext);
    const { path } = parseSearch(search);
    const configurationType = getConfigurationTypeFromPath(path);

    const handleClick = item => {
        if (partialAction) dispatchPartialPayload(item);
        if (!partialPayload) selectItem(item);
    }

    const childProps = {
        padding,
        handleClick,
        selectedItem,
        systemMap,
    };

    return (
        <TransformBox
            id="DetailDisplay"
            viewportRef={Viewport}
        >
            <svg
                id="detail-display"
                viewBox="-1 -1 2 2"
                transform="scale(1, -1)"
                strokeWidth={0.002 / scaleX}
            >
                {children.map((child, i) => configurationType ? (
                    <Part
                        key={i}
                        {...childProps}
                        part={child}
                    />
                ) : (
                        <Configuration
                            key={i}
                            {...childProps}
                            configuration={child}
                            selectedConfigurationPaths={selectedConfigurationPaths}
                        />
                    ))}
                {children.length ? (
                    <g id="origin">
                        <path d={`M-${padding},0L${padding},0Z`} />
                        <path d={`M0,-${padding}L0,${padding}Z`} />
                        <circle
                            cx={0}
                            cy={0}
                            r={padding / 4}
                        />
                    </g>
                ) : null}
            </svg>
        </TransformBox>
    );
});
