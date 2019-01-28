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

var PROTECTION = 30;

export default function Container({
    horizontalParent = true,
    parentDLO = 256,
    sightline = 16,
    parentOffset = 0,
    offset = 0,
    drawFrames = [],
    container: {
        nodeId,
        id,
        DLO = 96,
        infill,
        containers = [],
    } = {},
}) {

    console.log(arguments[0]);

    if (PROTECTION-- < 0) return null;

    const [
        width,
        height,
        xOffset,
        yOffset,
    ] = horizontalParent ?
            [
                DLO + sightline * 2,
                parentDLO + sightline * 2,
                offset,
                parentOffset,
            ]
            :
            [
                parentDLO + sightline * 2,
                DLO + sightline * 2,
                parentOffset,
                offset,
            ];

    const bottomFrame = createRectangle({
        width: width - sightline * 2,
        height: yOffset + sightline,
        xOffset: xOffset + sightline,
        yOffset,
    });
    const leftFrame = createRectangle({
        width: sightline,
        height,
        xOffset,
        yOffset,
    });
    const rightFrame = createRectangle({
        width: sightline,
        height,
        xOffset: xOffset + width - sightline,
        yOffset,
    });
    const topFrame = createRectangle({
        width: width - sightline * 2,
        height: sightline,
        xOffset: xOffset + sightline,
        yOffset: yOffset + height - sightline,
    });

    // const d = `
    //     M${xOffset},${yOffset}
    //     L${xOffset + width},${yOffset}
    //     L${xOffset + width},${yOffset + height}
    //     L${xOffset},${yOffset + height}
    //     Z
    // `.replace(/\s/g, "");

    // console.log(d);

    return (
        <g>
            <path
                d={`${
                    bottomFrame
                    }${
                    topFrame
                    }${
                    leftFrame
                    }${
                    rightFrame
                    }`}
                stroke={horizontalParent ? "red" : "green"}
                fill={horizontalParent ? "rgba(255, 0, 127, 0.25)" : "rgba(0, 255, 127, 0.25)"}
            />
            {/* {[bottomFrame, leftFrame, topFrame, rightFrame].map(d => (
                <path
                    key={d}
                    d={d}
                    stroke="red"
                    fill="rgba(255, 0, 127, 0.25)"
                />
            ))} */}
            {containers
                .reduce(({ all, offset }, container) => ({
                    all: all.concat({ container, offset }),
                    offset: offset + container.DLO + sightline,
                }), { all: [], offset: parentOffset })
                .all
                .map(({ container, offset }) => (
                    <Container
                        key={container.id}
                        container={container}
                        parentDLO={DLO}
                        horizontalParent={!horizontalParent}
                        parentOffset={offset}
                        sightline={sightline}
                        offset={offset}
                    // offset={arr
                    //     .slice(0, i)
                    //     .reduce((offset, { DLO }) => (
                    //         +(offset || 0)
                    //         +
                    //         +(DLO || 0)
                    //     ), parentOffset)}
                    />
                ))}
        </g>
    );
}
