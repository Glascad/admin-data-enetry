import testMoveFrame from './test-move-frame';
import sample3 from "../../../../../__test__/sample-elevations/sample3.json";

//Sample3 Test2
testMoveFrame({
    elevation: sample3,
    distance: 100,
    detailId: 2044,
    expectedDetails: [
        {
            firstContainerId: 807,
            secondContainerId: 810,
        },
        {
            firstContainerId: 807,
            secondContainerId: 809,
        },
        {
            firstContainerId: 802,
            secondContainerId: 807,
        },

    ],
    deletedDetails: [
        {
            firstContainerId: 805,
            secondContainerId: 810,
        },
    ],
    daylightOpenings: [
        {
            id: 807,
            x: 86.6666666666667,
            y: 180,
        },
        {
            id: 805,
            x: 86.6666666666667,
            y: 150,
        },
    ],
});
