
import RecursiveElevation from "../elevation";

import '../../../../../../../../../public';

import sample6 from '../../../__test__/sample-elevations/sample6.json';

function testDimensions({
    elevation,
    verticalTrackCount,
    vertical = [],
    horizontalTrackCount,
    horizontal = [],
}) {
    describe(`Testing dimensions of elevation ${elevation.name}`, () => {
        const recursiveElevation = new RecursiveElevation(elevation);

        test(`Elevation has correct number of vertical dimension tracks`, () => {
            expect(recursiveElevation.verticalContainerDimensionTracks).toHaveProperty('length', verticalTrackCount);
        });

        test(`Elevation has correct number of horizontal dimension tracks`, () => {
            expect(recursiveElevation.horizontalContainerDimensionTracks).toHaveProperty('length', horizontalTrackCount);
        });

        function testTrack(vertical, track, i) {
            const actualTrack = recursiveElevation[`${vertical ? 'vertical' : 'horizontal'}ContainerDimensionTracks`][i];
            track.forEach(({ containerIds, dimension, offset }) => {
                test(`${vertical ? 'Vertical' : 'Horizontal'} container dimension track #${i} contains a dimension with all container ids ${containerIds.join(', ')}, dimension ${dimension}, and offset ${offset}`, () => {
                    expect(actualTrack).toEqual(
                        // array of dimensions
                        expect.arrayContaining([
                            // dimension object
                            expect.objectContaining({
                                // container array
                                containers: expect.arrayContaining(
                                    // expected container ids
                                    containerIds.map(id => (
                                        // actual container
                                        expect.objectContaining({ id })
                                    ))
                                ),
                                dimension,
                                offset,
                            }),
                        ]),
                    );
                });
            });
        }

        vertical.forEach((track, i) => {
            testTrack(true, track, i);
        });

        horizontal.forEach((track, i) => {
            testTrack(false, track, i);
        });
    });
}

testDimensions({
    elevation: sample6,
    // vertical tracks
    vertical: [
        // track #1 -- not sorted - no order
        [
            {
                containerIds: [],
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
