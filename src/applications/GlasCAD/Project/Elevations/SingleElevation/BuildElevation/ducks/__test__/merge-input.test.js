import mergeElevationInput from '../merge-input';
import sample1 from '../../../__test__/sample-elevations/sample1.json';
import sample2 from '../../../__test__/sample-elevations/sample2.json';
import sample3 from '../../../__test__/sample-elevations/sample3.json';
import sample3Special from '../../../__test__/sample-elevations/sample3-special.json';
import { defaultElevationInput } from '../../../CreateElevation/elevation-input';

function testMergeInput({
    containers,
    details,
    detailIdsToDelete,
    containerIdsToDelete,
    elevation,
}) {
    describe(`Merge elevation input tests - ${elevation.name}`, () => {

        test("Returns unchanged elevation on empty input", () => {
            const { mergedElevation } = mergeElevationInput({ elevationInput: defaultElevationInput }, { _elevation: elevation });

            expect(mergedElevation).toEqual(elevation);
        });

        const elevationInput = {
            containers,
            details,
            detailIdsToDelete,
            containerIdsToDelete,
        };

        const { mergedElevation } = mergeElevationInput({ elevationInput }, { _elevation: elevation });

        test('Deleted details do not exist in the _containerDetails array', () => {
            detailIdsToDelete.forEach(id => (
                expect(mergedElevation._containerDetails).toEqual(
                    expect.not.arrayContaining([
                        expect.objectContaining({ id })
                    ])
                ))
            );
        });

        test('Only deleted details are removed', () => {
            expect(mergedElevation._containerDetails).toHaveProperty('length', elevation._containerDetails.length - detailIdsToDelete.length);
        });

        test('Deleted containers do not exist in the _elevationContainers array', () => {
            containerIdsToDelete.forEach(id => (
                expect(mergeElevationInput._elevationContainers).toEqual(
                    expect.not.arrayContaining([
                        expect.objectContaining({ id })
                    ])
                ))
            );
        });

        test('Only deleted containers are removed', () => {
            expect(mergedElevation._elevationContainers).toHaveProperty('length', elevation._elevationContainers.length - containerIdsToDelete.length);
        });

        test('Updated containers are updated correctly', () => {
            containers.forEach(container => (
                expect(mergedElevation._elevationContainers).toEqual(
                    expect.not.arrayContaining([
                        expect.objectContaining(container)
                    ])
                ))
            );
        });
    });
}

testMergeInput({
    elevation: sample1,
    containers: [{
        id: 709,
        original: true,
        daylightOpening: {
            x: 480,
            y: 240,
        },
    }],
    details: [{
        id: 1791,
        vertical: true,
        secondContainerId: 709,
    }, {
        id: 1793,
        vertical: false,
        firstContainerId: 709,
        secondContainerId: 708,
    }],
    containerIdsToDelete: [707],
    detailIdsToDelete: [1792, 1794],
});

testMergeInput({
    elevation: sample2,
    containers: [{
        id: 732,
        original: false,
        daylightOpening: {
            x: 185,
            y: 540
        }
    }],
    details: [{
        id: 1866,
        vertical: true,
        firstContainerId: 732,
        secondContainerId: 739,
    }, {
        id: 1870,
        vertical: false,
        firstContainerId: 732,
    }, {
        id: 1869,
        vertical: true,
        firstContainerId: 732,
        secondContainerId: 740,
    }],
    containerIdsToDelete: [733, 734],
    detailIdsToDelete: [1864, 1865, 1867, 1868]
});

// testMergeInput({
//     elevation: sample3,
//     containers: [{
//         id: 807,
//         original: false,
//         daylightOpening: {
//             x: 86.6666666666667,
//             y: 380,
//         },
//     }, {
//         id: 809,
//         original: false,
//         daylightOpening: {
//             x: 86.6666666666667,
//             y: 60,
//         },
//     }, {
//         id: 810,
//         original: false,
//         daylightOpening: {
//             x: 86.6666666666667,
//             y: 120,
//         },
//     }],
//     details: [{
//         id: 2058,
//         vertical: true,
//         firstContainerId: 807,
//         secondContainerId: 808,
//     }, {
//         id: 2041,
//         vertical: true,
//         firstContainerId: 807,
//         secondContainerId: 809,
//     }, {
//         id: 2043,
//         vertical: true,
//         firstContainerId: 807,
//         secondContainerId: 810,
//     }, {
//         id: 2057,
//         vertical: true,
//         firstContainerId: 800,
//         secondContainerId: 807,
//     }, {
//         id: 2030,
//         vertical: true,
//         firstContainerId: 801,
//         secondContainerId: 807,
//     }, {
//         id: 2033,
//         vertical: true,
//         firstContainerId: 802,
//         secondContainerId: 807,
//     }, {
//         id: 2040,
//         vertical: false,
//         secondContainerId: 807,
//     }],
//     containerIdsToDelete: [805, 804],
//     detailIdsToDelete: [2044, 2039, 2038, 2026],
// });

testMergeInput({
    elevation: sample3Special,
    containers: [],
    details: [],
    containerIdsToDelete: [],
    detailIdsToDelete: [],
});
