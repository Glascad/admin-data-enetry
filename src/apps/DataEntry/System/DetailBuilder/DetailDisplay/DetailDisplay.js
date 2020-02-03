import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { getConfigurationTypeFromPath } from '../../../../../app-logic/system';
import { TransformBox, Ellipsis } from '../../../../../components';
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
    updating,
}) {

    const { Viewport } = useContext(StaticContext);
    const { scale: { x: scaleX, y: scaleY } } = useContext(TransformContext);
    const { path } = parseSearch(search);

    const onClick = item => {
        if (partialAction) dispatchPartialPayload(item);
        if (!partialPayload) selectItem(item);
    }

    return (
        <TransformBox
            id="DetailDisplay"
            viewportRef={Viewport}
        >
            {updating ? (
                <Ellipsis text="Updating" />
            ) : (
                    <DetailOrConfigurationOrPart
                        id="detail-display"
                        style={{
                            strokeWidth: 0.004 / scaleX,
                        }}
                        systemMap={systemMap}
                        path={path}
                        configurationPaths={selectedConfigurationPaths}
                        getConfigurationProps={configuration => ({
                            onClick,
                            className: configuration === selectedItem ? 'selected' : '',
                        })}
                        getPartProps={part => ({
                            onClick,
                            className: part === selectedItem ? 'selected' : '',
                        })}
                        getDetailProps={() => ({ onClick })}
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
                )}
        </TransformBox>
    );
}

export default withRouter(DetailDisplay);
