import React from 'react';

const select = (handleSelect, nodeId) => e => {
    e.stopPropagation();
    handleSelect({ arguments: { nodeId } });
}

export default function Container({
    nestLevel = 1,
    horizontal,
    x,
    y,
    width,
    height,
    sightline,
    infill,
    childContainers = [],
    membersToRender: {
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
    leftMember: {
        nodeId: leftNID,
    } = {},
    rightMember: {
        nodeId: rightNID,
    } = {},
    topMember: {
        nodeId: topNID,
    } = {},
    bottomMember: {
        nodeId: bottomNID,
    } = {},
    nodeId,
    selectedNID,
    handleSelect,
}) {

    console.log(arguments[0]);

    const leftMember = {
        x,
        y,
        height,
        width: sightline,
    };

    const rightMember = {
        ...leftMember,
        x: x + width - sightline,
    };

    const topMember = {
        x: x + sightline,
        y: y + height - sightline,
        width: width - sightline * 2,
        height: sightline,
    };

    const bottomMember = {
        ...topMember,
        y,
    };

    const placedChildren = horizontal ?
        childContainers.map((container, i, arr) => ({
            x: arr
                .slice(0, i)
                .reduce((sum, { DLO }) => sum + DLO + sightline, x),
            y,
            height,
            width: container.DLO === undefined ?
                arr
                    .slice(0, i)
                    .reduce((total, { DLO }) => total - sightline - DLO, width)
                :
                container.DLO + sightline * 2,
            container,
        }))
        :
        childContainers.map((container, i, arr) => ({
            x,
            y: arr
                .slice(0, i)
                .reduce((sum, { DLO }) => sum + DLO + sightline, y),
            height: container.DLO === undefined ?
                arr
                    .slice(0, i)
                    .reduce((total, { DLO }) => total - sightline - DLO, height)
                :
                container.DLO + sightline * 2,
            container,
            width,
        }))

    return (
        <g
            className={`Container ${nodeId === selectedNID ? 'selected' : ''}`}
        >
            {!childContainers.length ? (
                <rect
                    className={`infill ${
                        selectedNID === nodeId ?
                            "selected"
                            :
                            ""
                        }`}
                    x={x + sightline}
                    y={y + sightline}
                    height={height - sightline * 2}
                    width={width - sightline * 2}
                    onClick={select(handleSelect, nodeId)}
                />
            ) : null}
            {leftNID ? (
                <rect
                    {...leftMember}
                    className={`member ${
                        selectedNID === leftNID ?
                            "selected"
                            :
                            ""
                        }`}
                    onClick={select(handleSelect, leftNID)}
                />
            ) : null}
            {rightNID ? (
                <rect
                    {...rightMember}
                    className={`member ${
                        selectedNID === rightNID ?
                            "selected"
                            :
                            ""
                        }`}
                    onClick={select(handleSelect, rightNID)}
                />
            ) : null}
            {topNID ? (
                <rect
                    {...topMember}
                    className={`member ${
                        selectedNID === topNID ?
                            "selected"
                            :
                            ""
                        }`}
                    onClick={select(handleSelect, topNID)}
                />
            ) : null}
            {bottomNID ? (
                <rect
                    {...bottomMember}
                    className={`member ${
                        selectedNID === bottomNID ?
                            "selected"
                            :
                            ""
                        }`}
                    onClick={select(handleSelect, bottomNID)}
                />
            ) : null}
            {/* ORIGIN */}
            <circle
                cx="0"
                cy="0"
                r="5"
                fill="rgba(0, 0, 0, 0.25)"
            />
            {/* OFFSET ORIGIN */}
            {/* <circle
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
            /> */}
            {placedChildren.map(({ container, container: { nodeId, containers }, ...coordinates }, i) => (
                <Container
                    {...container}
                    {...coordinates}
                    nodeId={nodeId}
                    key={nodeId || i}
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
                    membersToRender={{
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
