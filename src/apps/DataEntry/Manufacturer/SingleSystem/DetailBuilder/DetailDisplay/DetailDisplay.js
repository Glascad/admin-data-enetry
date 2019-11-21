import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { getConfigurationTypeFromPath, getDetailTypeFromPath, getDefaultPath } from '../../../../../../app-logic/system-utils';
import { SVGPath, TransformBox } from '../../../../../../components';
import { parseSearch, svg, Matrix } from '../../../../../../utils';
import { StaticContext } from '../../../../../Statics/Statics';
import './DetailDisplay.scss';
import { TransformContext } from '../../../../../../components/contexts/transform/TransformContext';
import Part from './Part';
import Configuration from './Configuration';

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
}) {
    // console.log(arguments[0]);

    const { Viewport } = useContext(StaticContext);
    const { scale: { x: scaleX, y: scaleY } } = useContext(TransformContext);
    const { path } = parseSearch(search);
    const detailType = getDetailTypeFromPath(path);
    const configurationType = getConfigurationTypeFromPath(path);
    // const allPaths = children.reduce((allPaths, { _part: { paths = [] } = {} }) => allPaths.concat(paths), []);
    // const viewBox = svg.getViewBox(allPaths, padding);

    const childProps = {
        padding,
        selectItem,
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
                viewBox="-250 -250 500 500"
                transform="scale(1, -1)"
                strokeWidth={0.5 / scaleX}
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
                        <path d={`M-${padding * svg.multiplier},0L${padding * svg.multiplier},0Z`} />
                        <path d={`M0,-${padding * svg.multiplier}L0,${padding * svg.multiplier}Z`} />
                        <circle
                            cx={0}
                            cy={0}
                            r={padding * svg.multiplier / 4}
                        />
                    </g>
                ) : null}
            </svg>
        </TransformBox>
    );
});
