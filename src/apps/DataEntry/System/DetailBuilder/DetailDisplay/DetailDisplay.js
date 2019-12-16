import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { getConfigurationTypeFromPath } from '../../../../../app-logic/system';
import { TransformBox } from '../../../../../components';
import { TransformContext } from '../../../../../components/contexts/transform/TransformContext';
import Configuration from '../../../../../modules/Detail/Configuration';
import Detail from '../../../../../modules/Detail/Detail';
import { parseSearch } from '../../../../../utils';
import { StaticContext } from '../../../../Statics/Statics';
import './DetailDisplay.scss';

export default withRouter(function DetailDisplay({
    location: {
        search,
    },
    system,
    item,
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
        console.log({ item });
        if (partialAction) dispatchPartialPayload(item);
        if (!partialPayload) selectItem(item);
    }

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
                {item ?
                    configurationType ? (
                        <Configuration
                            systemMap={systemMap}
                            detailConfiguration={item}
                            configurationOptionValue={systemMap[selectedConfigurationPaths[configurationType]]}
                            onClick={handleClick}
                            getPartProps={part => ({
                                className: part === selectedItem ? 'selected' : '',
                            })}
                        />
                    ) : (
                            <Detail
                                systemMap={systemMap}
                                detail={item}
                                configurationPaths={selectedConfigurationPaths}
                                onClick={handleClick}
                                getConfigurationProps={configuration => ({
                                    className: configuration === selectedItem ? 'selected' : '',
                                })}
                            />
                        ) : null}
                {children.length ? (
                    <g id="origin">
                        <path d={`M-0.5,0L0.5,0Z`} />
                        <path d={`M0,-0.5L0,0.5Z`} />
                        <circle
                            cx={0}
                            cy={0}
                            r={0.125}
                        />
                    </g>
                ) : null}
            </svg>
        </TransformBox>
    );
});
