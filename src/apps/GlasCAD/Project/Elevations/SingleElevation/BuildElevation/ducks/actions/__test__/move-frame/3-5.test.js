import testMoveFrame from './test-move-frame';
import sample3 from "../../../../../utils/sample-elevations/sample3.json";

//Sample3 Test5
testMoveFrame({
    elevation: sample3,
    distance: 220,
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
            firstContainerId: 807,
            secondContainerId: 808,
        },
        {
            firstContainerId: 802,
            secondContainerId: 807,
        },
        {
            firstContainerId: 801,
            secondContainerId: 807,
        },
        {
            firstContainerId: 800,
            secondContainerId: 807,
        },

    ],
    deletedDetails: [
        {
            firstContainerId: 805,
            secondContainerId: 810,
        },
        {
            firstContainerId: 802,
            secondContainerId: 805,
        },
        {
            firstContainerId: 805,
            secondContainerId: 809,
        },
        {
            firstContainerId: 801,
            secondContainerId: 805,
        },
    ],
    daylightOpenings: [
        {
            id: 807,
            x: 86.6666666666667,
            y: 300,
        },
        {
            id: 805,
            x: 86.6666666666667,
            y: 30,
        },
    ],
});
