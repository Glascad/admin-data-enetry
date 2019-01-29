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
    dimensions: {
        x: width,
        y: height,
    },
    offset: {
        x: xOffset,
        y: yOffset,
    },
    ...props
}) {
    return (
        <path
            stroke="red"
            fill="rgba(255, 0, 0, 0.25)"
            {...props}
            d={createRectangle({
                width,
                height,
                xOffset,
                yOffset,
            })}
        />
    );
}
