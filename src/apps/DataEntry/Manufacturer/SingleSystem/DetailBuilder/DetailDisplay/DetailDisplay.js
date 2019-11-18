import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { TransformBox, SVG, SVGPath } from '../../../../../../components';
import { StaticContext } from '../../../../../Statics/Statics';
import { parseSearch, svg } from '../../../../../../utils';
import { getConfigurationTypeFromPath, getChildren } from '../../../../../../app-logic/system-utils';
import './DetailDisplay.scss';

const padding = 0.5;

export default withRouter(function DetailDisplay({
    location: {
        search,
    },
    system,
}) {
    console.log(arguments[0]);
    const { Viewport } = useContext(StaticContext);
    const { path } = parseSearch(search);
    const configurationType = getConfigurationTypeFromPath(path);

    const children = getChildren({ path }, system);

    const allPaths = children.reduce((allPaths, { _part: { paths = [] } }) => allPaths.concat(paths), []);

    const viewBox = svg.getViewBox(allPaths, padding);

    const [selectedPart, setSelectedPart] = useState();
    const selectPart = newPart => setSelectedPart(part => newPart === part ? undefined : newPart);

    console.log({
        children,
        allPaths,
        viewBox,
        selectedPart,
    });

    return configurationType ? (
        <TransformBox
            id="DetailDisplay"
            viewportRef={Viewport}
        >
            <svg
                id="detail-display"
                viewBox={viewBox}
                transform="scale(1, -1)"
            >
                {children.map(part => {
                    const { id, _part: { paths = [] } } = part;
                    const selected = part === selectedPart;
                    return (
                        <g
                            key={id}
                            className={`part ${selected ? 'selected' : ''}`}
                            onClick={() => selectPart(part)}
                        >
                            {paths.map(({ commands }, i) => (
                                <SVGPath
                                    key={i}
                                    paths={paths}
                                    commands={commands}
                                />
                            ))}
                        </g>
                    );
                })}
                <g id="origin">
                    <path d={`M-${padding * svg.multiplier},0L${padding * svg.multiplier},0Z`} />
                    <path d={`M0,-${padding * svg.multiplier}L0,${padding * svg.multiplier}Z`} />
                    <circle
                        cx={0}
                        cy={0}
                        r={padding * svg.multiplier / 4}
                    />
                </g>
            </svg>
        </TransformBox>
    ) : null;
});
