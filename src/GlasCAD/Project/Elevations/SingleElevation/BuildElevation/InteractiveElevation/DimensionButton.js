import React from 'react';

import { SelectionContext } from '../SelectionContext';
import { TransformContext } from '../TransformContext';

export default function DimensionButton({
    vertical,
    dimension: {
        refId,
        dimension,
        offset,
    },
}) {
    const dimensionKey = vertical ?
        'height'
        :
        'width';

    const offsetKey = vertical ?
        'bottom'
        :
        'left';

    const otherOffsetKey = vertical ?
        'left'
        :
        'bottom';

    return (
        <SelectionContext.Consumer>
            {({
                selection: {
                    items,
                    handleMouseDown,
                },
            }) => {
                const isSelected = items.includes(refId);

                return (
                    <button
                        id={refId}
                        className={`DimensionButton ${
                            vertical ?
                                'vertical'
                                :
                                'horizontal'
                            } ${
                            isSelected ?
                                'selected'
                                :
                                ''
                            }`}
                        style={{
                            [dimensionKey]: dimension,
                            [`max-${dimensionKey}`]: dimension,
                            [`min-${dimensionKey}`]: dimension,
                            [offsetKey]: offset,
                            [otherOffsetKey]: -50,
                            // transform: `translate(${
                            //     vertical ?
                            //         0
                            //         :
                            //         `${offset + x}px`
                            //     }, ${
                            //     vertical ?
                            //         `${offset + y}px`
                            //         :
                            //         0
                            //     })`,
                        }}
                        onClick={handleMouseDown}
                    >
                        <span id={refId} >
                            {dimension.toFixed(2).replace(/\.*0*$/, '')}
                        </span>
                    </button>
                    // <g
                    //     transform={vertical ?
                    //         `rotate(90) translate(0, ${x})`
                    //         :
                    //         `translate(0, ${y})`}
                    // >
                    //     <rect
                    //         id={refId}
                    //         x={placementX}
                    //         y={placementY}
                    //         height={placementHeight}
                    //         width={placementWidth}
                    //         rx={2.5}
                    //         ry={2.5}
                    //         fill={isSelected ?
                    //             "#4A90E2"
                    //             :
                    //             "rgba(255, 255, 255, 0.1)"}
                    //         stroke={isSelected ?
                    //             "none"
                    //             :
                    //             "#CCCCCC"}
                    //         onClick={handleMouseDown}
                    //     />
                    //     <text
                    //         x={placementX + 7}
                    //         y={-(placementY + 7)}
                    //         transform='scale(1, -1)'
                    //         fill={isSelected ? 'white' : 'black'}
                    //         onClick={handleMouseDown}
                    //         cursor="default"
                    //     >
                    //         {dimension.toFixed(2).replace(/\.*0*$/, '')}
                    //     </text>
                    // </g>
                );
            }}
        </SelectionContext.Consumer>
    );
}
