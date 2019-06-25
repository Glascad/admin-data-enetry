
import RecursiveElevation from "../elevation";

import sample6 from '../../../__test__/sample-elevations/sample6.json';

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

testDimensions({
    elevation: sample6,
    // vertical tracks
    vertical: [
        // track #1 -- not sorted - no order
        [
            {
                // containerIds: [],
                // dimension: 120,
                // offset: 120,
            },
            {

            },
        ],
        // track #2
        [
            {

            },
            {

            },
        ],
    ],
});
