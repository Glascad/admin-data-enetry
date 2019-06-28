
function renderPreview({
    allContainers = [],
    // placedDetails = [],
    allFrames = [],
    roughOpening: {
        x = 0,
        y = 0,
    } = {},
    finishedFloorHeight,
}) {
    return `
        <svg
            viewBox="${`0 0 ${x} ${y
        // + finishedFloorHeight
        }`}"
            transform="scale(1, -1)"
        >
            ${
        ''
        // `<!-- ROUGH OPENING -->
        //     <!-- <rect
        //         width=${x}
        //         height=${y}
        //         x=${0}
        //         y=${finishedFloorHeight}
        //         // fill="rgba(127, 191, 255, 0.25)"
        //         fill="rgba(0, 0, 0, 0)"
        //         stroke="black"
        //     /> -->
        //     <!-- FINISHED FLOOR -- now in CSS -->
        //     <!-- <path
        //         id="finished-floor"
        //         strokeWidth=${5}
        //         d=${`M0, -5L${x}, -5`}
        //     /> -->
        //     <!-- CONTAINERS -->`
        }
            ${allContainers
            .filter(({ customRoughOpening }) => !customRoughOpening)
            .map(({ placement: { x, y, height, width } }) => `
                <rect
                    class="container"
                    x="${x}"
                    y="${y
                // + finishedFloorHeight
                }"
                    height="${height}"
                    width="${width}"
                />
            `)
            .join('')}
            ${
        ''
        // `<!-- FRAMES -->`
        }
            ${allFrames
            .map(({ placement: { x, y, height, width } }) => `
                <rect
                    class="frame"
                    x="${x}"
                    y="${y
                // + finishedFloorHeight
                }"
                    height="${height}"
                    width="${width}"
                />
            `)
            .join('')}
        </svg>
    `;
}

export default elevation => renderPreview(elevation).replace(/\s+/g, ' ').replace(/>\x+</g, '><');
