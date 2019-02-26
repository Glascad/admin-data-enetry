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
}) {

    console.log(arguments[0]);

    const leftFrame = {
        x,
        y,
        height,
        width: sightline,
    };

    const rightFrame = {
        ...leftFrame,
        x: x + width - sightline,
    };

    const topFrame = {
        x: x + sightline,
        y: y + height - sightline,
        width: width - sightline * 2,
        height: sightline,
    };

    const bottomFrame = {
        ...topFrame,
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
            {left && leftNID ? (
                <rect
                    {...leftFrame}
                    className={`frame ${
                        selectedNID === leftNID ?
                            "selected"
                            :
                            ""
                        }`}
                    onClick={select(handleSelect, leftNID)}
                />
            ) : null}
            {right && rightNID ? (
                <rect
                    {...rightFrame}
                    className={`frame ${
                        selectedNID === rightNID ?
                            "selected"
                            :
                            ""
                        }`}
                    onClick={select(handleSelect, rightNID)}
                />
            ) : null}
            {top && topNID ? (
                <rect
                    {...topFrame}
                    className={`frame ${
                        selectedNID === topNID ?
                            "selected"
                            :
                            ""
                        }`}
                    onClick={select(handleSelect, topNID)}
                />
            ) : null}
            {bottom && bottomNID ? (
                <rect
                    {...bottomFrame}
                    className={`frame ${
                        selectedNID === bottomNID ?
                            "selected"
                            :
                            ""
                        }`}
                    onClick={select(handleSelect, bottomNID)}
                />
            ) : null}
            {placedChildren.map(({ container, container: { nodeId, containers }, ...coordinates }, i, { length }) => (
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
                    framesToRender={{
                        right: (!right || !rightNID) || (horizontal && i < length - 1),
                        left: (!left || !leftNID),
                        top: (!top || !topNID) || (!horizontal && i < length - 1),
                        bottom: (!bottom || !bottomNID),
                    }}
                />
            ))}
        </g>
    );
}
