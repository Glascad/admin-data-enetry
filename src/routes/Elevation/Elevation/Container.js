import React from 'react';

import Frame from './Frame';

var PROTECTION = 30;

const colors = [...10].map(n => `rgb(0, ${255 * n / 10}, ${255 * n / 10})`).reverse();

var i = 0;

export default function Container({
    fill,
    horizontal,
    offset,
    dimensions,
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

    const color = colors[i++] || colors[i = 0];

    const leftFrame = {
        offset: {
            x: offset.x - sightline,
            y: offset.y - sightline,
        },
        dimensions: {
            x: sightline,
            y: dimensions.y + sightline * 2,
        },
    };

    const rightFrame = {
        offset: {
            x: offset.x + dimensions.x,
            y: leftFrame.offset.y,
        },
        dimensions: leftFrame.dimensions,
    };

    const topFrame = {
        offset: {
            x: offset.x,
            y: offset.y + dimensions.y, // + sightline,
        },
        dimensions: {
            x: dimensions.x,
            y: sightline,
        },
    };

    const bottomFrame = {
        offset: {
            x: topFrame.offset.x,
            y: offset.y - sightline,
        },
        dimensions: topFrame.dimensions,
    };

    const offsetChildContainers = childContainers
        .reduce(({ all, offset }, container) => ({
            all: all.concat({
                container,
                offset,
            }),
            offset: horizontal ? {
                x: offset.x + (container.DLO || 0) + sightline,
                y: offset.y,
            } : {
                    x: offset.x,
                    y: offset.y + (container.DLO || 0) + sightline,
                },
        }), {
                all: [],
                offset
            })
        .all;

    return (
        <g>
            <Frame
                offset={offset}
                dimensions={dimensions}
                fill={fill}
            />
            {left ? (
                <Frame
                    {...leftFrame}
                    stroke="green"
                />
            ) : null}
            {right ? (
                <Frame
                    {...rightFrame}
                    stroke="yellow"
                />
            ) : null}
            {top ? (
                <Frame
                    {...topFrame}
                    stroke="cyan"
                />
            ) : null}
            {bottom ? (
                <Frame
                    {...bottomFrame}
                    stroke="blue"
                />
            ) : null}
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
                cx={offset.x}
                cy={offset.y}
                r="5"
                fill="rgba(0, 0, 255, 0.25"
                stroke="blue"
            />
            {offsetChildContainers.map(({ container, offset }, i, { length }) => (
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
                    }}
                />
            ))}
        </g>
    );
}
