import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { getConfigurationTypeFromPath, getDetailTypeFromPath, getDefaultPath } from '../../../../../app-logic/system-utils';
import { SVGPath, TransformBox } from '../../../../../components';
import { parseSearch, svg, Matrix } from '../../../../../utils';
import { StaticContext } from '../../../../Statics/Statics';
import './DetailDisplay.scss';
import { TransformContext } from '../../../../../components/contexts/transform/TransformContext';
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

    const handleClick = () => {
        
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
                        <path d={`M-${padding },0L${padding },0Z`} />
                        <path d={`M0,-${padding }L0,${padding }Z`} />
                        <circle
                            cx={0}
                            cy={0}
                            r={padding  / 4}
                        />
                    </g>
                ) : null}
            </svg>
        </TransformBox>
    );
});
