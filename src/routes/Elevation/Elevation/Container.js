import React from 'react';

import Frame from './Frame';

var PROTECTION = 30;


export default function Container({
    nestLevel = 1,
    horizontal,
    origin,
    origin: [ox, oy],
    corner,
    corner: [cx, cy],
    sightline,
    childContainers = [],
    framesToRender: {
        left = false,
        right = false,
        top = false,
        bottom = false,
    } = {
        left: true,
        right: true,
        top: true,
        bottom: true,
    },
}) {

    console.log(arguments[0]);

    if (PROTECTION-- < 0) return null;

    const leftFrame = {
        origin,
        corner: [ox + sightline, cy],
    };

    const rightFrame = {
        origin: [cx - sightline, oy],
        corner,
    };

    const topFrame = {
        origin: [ox + sightline, cy - sightline],
        corner: [cx - sightline, cy],
    };

    const bottomFrame = {
        origin: [ox + sightline, oy],
        corner: [cx - sightline, oy + sightline],
    };

    const placedChildren = horizontal ?
        childContainers.map((container, i, arr) => ({
            origin: [
                arr
                    .slice(0, i)
                    .reduce((sum, { DLO }) => sum + DLO + sightline,
                        ox),
                oy,
            ],
            corner: i === arr.length - 1 ?
                corner
                :
                [
                    arr
                        .slice(0, i)
                        .reduce((sum, { DLO }) => sum + DLO + sightline,
                            ox + container.DLO + sightline * 2),
                    cy,
                ],
            container,
        }))
        :
        childContainers.map((container, i, arr) => ({
            origin: [
                ox,
                arr
                    .slice(0, i)
                    .reduce((sum, { DLO }) => sum + DLO + sightline,
                        oy),
            ],
            corner: i === arr.length - 1 ?
                corner
                :
                [
                    cx,
                    arr
                        .slice(0, i)
                        .reduce((sum, { DLO }) => sum + DLO + sightline,
                            oy + container.DLO + sightline * 2),
                ],
            container,
        }));

    return (
        <g
            className="Container"
            // style={{
            //     opacity: 1 / nestLevel,
            // }}
        >
            {/* <Frame
                origin={origin}
                corner={corner}
                fill={fill}
            /> */}
            {/* {left ? ( */}
            <Frame
                {...leftFrame}
                className="left-frame"
            />
            {/* ) : null} */}
            {/* {right ? ( */}
            <Frame
                {...rightFrame}
                className="right-frame"
            />
            {/* ) : null} */}
            {/* {top ? ( */}
            <Frame
                {...topFrame}
                className="top-frame"
            />
            {/* ) : null} */}
            {/* {bottom ? ( */}
            <Frame
                {...bottomFrame}
                className="bottom-frame"
            />
            {/* ) : null} */}
            {/* ORIGIN */}
            <circle
                cx="0"
                cy="0"
                r="5"
                fill="rgba(0, 0, 0, 0.25)"
                stroke="black"
            />
            {/* OFFSET ORIGIN */}
            <circle
                cx={ox}
                cy={oy}
                r="5"
                fill="rgba(0, 0, 255, 0.25"
                stroke="blue"
            />
            <circle
                cx={cx}
                cy={cy}
                r="5"
                fill={`rgba(0, 255, 0, ${1 / nestLevel})`}
                stroke="green"
            />
            {placedChildren.map(({ container: { id, containers }, origin, corner }) => (
                <Container
                    key={id}
                    origin={origin}
                    corner={corner}
                    horizontal={!horizontal}
                    sightline={sightline}
                    childContainers={containers}
                    nestLevel={nestLevel + 1}
                />
            ))}
            {/* {offsetChildContainers.map(({ container, offset }, i, { length }) => (
                <Container
                    fill={container.fill}
                    offset={offset}
                    dimensions={{
                        x: horizontal ?
                            container.DLO
                            :
                            dimensions.x,
                        y: horizontal ?
                            dimensions.y
                            :
                            container.DLO,
                    }}
                    childContainers={container.containers}
                    sightline={sightline}
                    horizontal={!horizontal}
                    framesToRender={{
                        right: horizontal ?
                            i < length - 1
                            :
                            false,
                        top: horizontal ?
                            false
                            :
                            i < length - 1,
                        // left: false,
                        // right: false,
                        // bottom: true,
                        // top:true,
                    }}
                />
            ))} */}
        </g>
    );
}
