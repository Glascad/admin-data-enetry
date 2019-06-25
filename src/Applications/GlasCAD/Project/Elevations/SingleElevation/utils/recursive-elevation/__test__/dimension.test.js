
import RecursiveElevation from "../elevation";

import sample6 from '../../../__test__/sample-elevations/sample6.json';
import sample3 from '../../../__test__/sample-elevations/sample3.json';

function testDimensions({ elevation, vertical = [], horizontal = [] }) {
    describe(`Testing dimensions of elevation ${elevation.name}`, () => {
        const recursiveElevation = new RecursiveElevation(elevation);
        vertical.forEach((track, i) => {
            const actualTrack = recursiveElevation.verticalContainerDimensionTracks[i];
            track.forEach(({ containerIds, dimension, offset }) => {
                containerIds.forEach(id => {
                    test(`Vertical container dimension track #${i} contains a dimension with container id ${id}`, () => {
                        expect(actualTrack).toEqual(
                            // array of dimensions
                            expect.arrayContaining([
                                // dimension object
                                expect.objectContaining({
                                    // container array
                                    containers: expect.arrayContaining([
                                        // actual container
                                        expect.objectContaining({ id })
                                    ])
                                })
                            ])
                        )
                    });
                });
            });
        })
    });
}

//Sample 6
testDimensions({
    elevation: sample6,
    verticalTrackCount: 2,
    horizontalTrackCount: 1,
    // vertical tracks
    vertical: [
        // track #1 -- not sorted - no order
        [
            {
                containerIds: [1379],
                dimension: 27.5,
                offset: 90.5,
            },
            {
                containerIds: [1376],
                dimension: 27.5,
                offset: 61,
            },
            {
                containerIds: [1372, 1374],
                dimension: 57,
                offset: 2,
            },
        ],
        // track #2
        [
            {
                containerIds: [1377],
                dimension: 57,
                offset: 61,
            },
            {
                containerIds: [1380, 1381],
                dimension: 27.5,
                offset: 31.5,
            },
            {
                containerIds: [1373, 1375],
                dimension: 27.5,
                offset: 2,
            },
        ],
    ],
    horizontal: [
        // track #1 - H
        [
            {
                containerIds: [1372, 1376, 1379],
                dimension: 42.5,
                offset: 2,
            },
            {
                containerIds: [1373, 1380, 1377],
                dimension: 42.5,
                offset: 46.5,
            },
            {
                containerIds: [1374],
                dimension: 42.5,
                offset: 91,
            },
            {
                containerIds: [1375, 1381],
                dimension: 42.5,
                offset: 135.5,
            },
        ]
    ]
});

//Sample 3
testDimensions({
    elevation: sample3,
    verticalTrackCount: 3,
    horizontalTrackCount: 1,
    // vertical tracks
    vertical: [
        // track #1 -- not sorted - no order
        [
            {
                containerIds: [803, 807, 811],
                dimension: 80,
                offset: 310,
            },
            {
                containerIds: [802],
                dimension: 120,
                offset: 180,
            },
            {
                containerIds: [801],
                dimension: 57,
                offset: 2,
            },
        ],
        // track #2
        [
            {
                containerIds: [1377],
                dimension: 57,
                offset: 61,
            },
            {
                containerIds: [1380, 1381],
                dimension: 27.5,
                offset: 31.5,
            },
            {
                containerIds: [1373, 1375],
                dimension: 27.5,
                offset: 2,
            },
        ],
    ],
    horizontal: [
        // track #1 - H
        [
            {
                containerIds: [1372, 1376, 1379],
                dimension: 42.5,
                offset: 2,
            },
            {
                containerIds: [1373, 1380, 1377],
                dimension: 42.5,
                offset: 46.5,
            },
            {
                containerIds: [1374],
                dimension: 42.5,
                offset: 91,
            },
            {
                containerIds: [1375, 1381],
                dimension: 42.5,
                offset: 135.5,
            },
        ]
    ]
});
