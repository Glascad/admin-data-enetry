
function renderPreview({
    allContainers = [],
    // placedDetails = [],
    allFrames = [],
    roughOpening: {
        width: roWidth = 0,
        height: roHeight = 0,
    } = {},
    finishedFloorHeight = 0,
}, {
    renderText = false,
    renderCustomRoughOpenings = false,
    } = {}) {
    
    // take all containers and add half a sightline to it.
    
    return `
        <svg
            viewBox="${`0 0 ${roWidth} ${roHeight + finishedFloorHeight}`}"
            transform="scale(1, -1)"
        >
            ${
        ''
        // `<!-- ROUGH OPENING -->
        //     <!-- <rect
        //         width=${roWidth}
        //         height=${roHeight}
        //         x=${0}
        //         y=${finishedFloorHeight}
        //         // fill="rgba(127, 191, 255, 0.25)"
        //         fill="rgba(0, 0, 0, 0)"
        //         stroke="black"
        //     /> -->
        //     <!-- FINISHED FLOOR -- now in CSS -->
        //     <!-- CONTAINERS -->`
        }
        ${finishedFloorHeight === 0 ?
            ''
            :
            `<path
                class="finished-floor"
                d="M-6, 0L${roWidth + 6}, 0"
            />`
        }
        ${allContainers
            .filter(({ customRoughOpening }) => renderCustomRoughOpenings || !customRoughOpening)
            .map(({ customRoughOpening, placement: { x, y, height, width } }) => `
                <rect
                    class="container ${customRoughOpening ? "custom-rough-opening" : ""}"
                    x="${x}"
                    y="${y + finishedFloorHeight}"
                    height="${height}"
                    width="${width}"
                />
            `)
            .join('')}
        ${renderText ?
            allContainers
                .filter(({ customRoughOpening }) => renderCustomRoughOpenings || !customRoughOpening)
                .map(({ id, placement: { x, y } }) => `
                        <text
                            x="${x + 5}"
                            y="${-y - 5}"
                            transform="scale(1, -1)"
                        >
                            ${id}
                        </text>
                `)
            :
            ""}
            ${
        ''
        // `<!-- FRAMES -->`
        }
            ${allFrames
            .map(({ vertical, placement: { x, y, height, width } }) => `
                <rect
                    class="frame ${vertical ? "vertical" : "horizontal"}"
                    x="${x}"
                    y="${y + finishedFloorHeight}"
                    height="${height}"
                    width="${width}"
                />
            `)
            .join('')}
        </svg>
    `;
}

export default (elevation, options) => renderPreview(elevation, options).replace(/\s+/g, ' ').replace(/>\x+</g, '><');
