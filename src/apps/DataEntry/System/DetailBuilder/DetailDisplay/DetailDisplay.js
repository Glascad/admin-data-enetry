import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { getConfigurationTypeFromPath } from '../../../../../app-logic/system';
import { TransformBox } from '../../../../../components';
import { TransformContext } from '../../../../../components/contexts/transform/TransformContext';
import DetailOrConfigurationOrPart from '../../../../../modules/Detail/DetailOrConfigurationOrPart';
import { parseSearch } from '../../../../../utils';
import { StaticContext } from '../../../../Statics/Statics';
import './DetailDisplay.scss';

function DetailDisplay({
    location: {
        search,
    },
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

    const handleClick = item => {
        if (partialAction) dispatchPartialPayload(item);
        if (!partialPayload) selectItem(item);
    }

    return (
        <TransformBox
            id="DetailDisplay"
            viewportRef={Viewport}
        >
            <DetailOrConfigurationOrPart
                id="detail-display"
                style={{
                    strokeWidth: 0.004 / scaleX,
                }}
                systemMap={systemMap}
                path={path}
                configurationPaths={selectedConfigurationPaths}
                getConfigurationProps={configuration => ({
                    onClick: handleClick,
                    className: configuration === selectedItem ? 'selected' : '',
                })}
                getPartProps={part => ({
                    onClick: handleClick,
                    className: part === selectedItem ? 'selected' : '',
                })}
                getDetailProps={detail => ({
                    onClick: handleClick,
                    className: detail === selectItem ? 'selected' : '',
                })}
                preserveInitialViewBox={true}
            >
                {children.length ? (
                    <g id="origin">
                        <path d="M-0.5,0L0.5,0Z" />
                        <path d="M0,-0.5L0,0.5Z" />
                        <circle
                            cx={0}
                            cy={0}
                            r={0.125}
                        />
                    </g>
                ) : null}
            </DetailOrConfigurationOrPart>
        </TransformBox>
    );
}

export default withRouter(DetailDisplay);
