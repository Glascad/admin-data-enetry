import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { getConfigurationTypeFromPath } from '../../../../../../app-logic/system-utils';
import { SVGPath, TransformBox } from '../../../../../../components';
import { parseSearch, svg, matrix } from '../../../../../../utils';
import { StaticContext } from '../../../../../Statics/Statics';
import './DetailDisplay.scss';

const padding = 0.5;

export default withRouter(function DetailDisplay({
    location: {
        search,
    },
    system,
    children,
    selectPart,
    selectedPart,
}) {
    // console.log(arguments[0]);

    const { Viewport } = useContext(StaticContext);
    const { path } = parseSearch(search);
    const configurationType = getConfigurationTypeFromPath(path);
    const allPaths = children.reduce((allPaths, { _part: { paths = [] } = {} }) => allPaths.concat(paths), []);
    const viewBox = svg.getViewBox(allPaths, padding);

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
                    const {
                        id,
                        transform: {
                            a = matrix.IDENTITY_MATRIX[0][0],
                            b = matrix.IDENTITY_MATRIX[0][1],
                            c = matrix.IDENTITY_MATRIX[0][2],
                            d = matrix.IDENTITY_MATRIX[1][0],
                            e = matrix.IDENTITY_MATRIX[1][1],
                            f = matrix.IDENTITY_MATRIX[1][2],
                        } = {},
                        _part: {
                            paths = [],
                        },
                    } = part;
                    const selected = part === selectedPart;
                    const transformProp = `matrix(${a} ${d} ${b} ${e} ${c} ${f})`;
                    return (
                        <g
                            data-cy={`part-${id}`}
                            key={id}
                            className={`part ${selected ? 'selected' : ''}`}
                            onClick={() => selectPart(part)}
                            transform={transformProp}
                        >
                            {paths.map(({ commands }, i) => (
                                <SVGPath
                                    key={i}
                                    commands={commands}
                                />
                            ))}
                            <g className="part-origin">
                                <path d={`M-${padding * svg.multiplier / 2},0L${padding * svg.multiplier / 2},0Z`} />
                                <path d={`M0,-${padding * svg.multiplier / 2}L0,${padding * svg.multiplier / 2}Z`} />
                                <circle
                                    cx={0}
                                    cy={0}
                                    r={padding * svg.multiplier / 8}
                                />
                            </g>
                        </g>
                    );
                })}
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
    ) : null;
});
