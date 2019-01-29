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
    leftFrame: {
        nodeId: leftNID,
    } = {},
    rightFrame: {
        nodeId: rightNID,
    } = {},
    topFrame: {
        nodeId: topNID,
    } = {},
    bottomFrame: {
        nodeId: bottomNID,
    } = {},
    nodeId,
    selectedNID,
    handleSelect,
    ...props
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
            className={`Container ${nodeId === selectedNID ? 'selected' : ''}`}
            onClick={e => {
                e.stopPropagation();
                console.log(e.target);
                console.log({ nodeId });
                handleSelect({ arguments: { nodeId } });
            }}
        // style={{
        //     opacity: 1 / nestLevel,
        // }}
        >
            {/* <Frame
                origin={origin}
                corner={corner}
                fill={fill}
            /> */}
            {leftNID ? (
            <Frame
                {...leftFrame}
                nodeId={leftNID}
                className="left-frame"
                handleSelect={handleSelect}
            />
            ) : null}
            {rightNID ? (
            <Frame
                {...rightFrame}
                nodeId={rightNID}
                className="right-frame"
                handleSelect={handleSelect}
            />
            ) : null}
            {topNID ? (
            <Frame
                {...topFrame}
                nodeId={topNID}
                className="top-frame"
                handleSelect={handleSelect}
            />
            ) : null}
            {bottomNID ? (
            <Frame
                {...bottomFrame}
                nodeId={bottomNID}
                className="bottom-frame"
                handleSelect={handleSelect}
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
            {placedChildren.map(({ container, container: { nodeId, containers }, origin, corner }, i) => (
                <Container
                    {...container}
                    nodeId={nodeId}
                    key={nodeId || i}
                    origin={origin}
                    corner={corner}
                    horizontal={!horizontal}
                    sightline={sightline}
                    childContainers={containers}
                    nestLevel={nestLevel + 1}
                    handleSelect={handleSelect}
                    selectedNID={selectedNID}
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
