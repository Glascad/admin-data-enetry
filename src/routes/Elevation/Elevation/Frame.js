import React from 'react';

const createRectangle = ({
    width = 0,
    height = 0,
    xOffset = 0,
    yOffset = 0,
}) => `
    M${xOffset},${yOffset}
    L${xOffset + width},${yOffset}
    L${xOffset + width},${yOffset + height}
    L${xOffset},${yOffset + height}
    L${xOffset},${yOffset}
`.replace(/\s/g, "");

export default function Frame({
    origin,
    origin: [ox, oy] = [],
    corner,
    corner: [dx, dy] = [],
    dimensions,
    dimensions: {
        x: width,
        y: height,
    } = {},
    offset,
    offset: {
        x: xOffset,
        y: yOffset,
    } = {},
    className = '',
    nodeId,
    selectedNID,
    handleSelect,
    ...props
}) {
    console.log({ nodeId });
    return (
        <path
            className={`Frame ${
                className
                } ${
                nodeId === selectedNID ?
                    'selected'
                    :
                    ''
                }`}
            onClick={e => {
                e.stopPropagation();
                console.log(e.target);
                console.log({ nodeId });
                handleSelect({ arguments: { nodeId } });
            }}
            // stroke="red"
            // fill="rgba(255, 0, 0, 0.5)"
            {...props}
            d={createRectangle(offset && dimensions ? {
                width,
                height,
                xOffset,
                yOffset,
            } : {
                    width: dx - ox,
                    height: dy - oy,
                    xOffset: ox,
                    yOffset: oy,
                })}
        />
    );
}
