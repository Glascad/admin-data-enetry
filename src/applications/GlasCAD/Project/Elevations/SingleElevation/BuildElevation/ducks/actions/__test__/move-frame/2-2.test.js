import testMoveFrame from './test-move-frame';
import sample2 from "../../../../../__test__/sample-elevations/sample2.json";

//Sample2 Test2
testMoveFrame({
    elevation: sample2,
    distance: -220,
    detailId: 1854,
    expectedDetails: [
        {
            firstContainerId: 729,
            secondContainerId: 737,
        },
    ],
    deletedDetails: [
        {
            firstContainerId: 732,
            secondContainerId: 736,
        },
        {
            firstContainerId: 732,
            secondContainerId: 737,
        },
    ],
    daylightOpenings: [
        {
            id: 732,
            x: 185,
            y: 100,
        },
        {
            id: 729,
            x: 185,
            y: 320,
        },
    ],
});
