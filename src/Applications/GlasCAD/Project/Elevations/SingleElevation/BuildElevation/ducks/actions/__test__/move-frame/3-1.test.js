import testMoveFrame from './test-move-frame';
import sample3 from "../../../../../__test__/sample-elevations/sample3.json";

// Testing Sample3
// Sample3 Test1
testMoveFrame({
    elevation: sample3,
    distance: 65,
    detailId: 2044,
    expectedDetails: [
        {
            firstContainerId: 807,
            secondContainerId: 810,
        },
        {
            firstContainerId: 802,
            secondContainerId: 807,
        },
    ],
    deletedDetails: [
        //This one will fail (Not on purpose)
        {
            firstContainerId: 805,
            secondContainerId: 810,
        },
    ],
    daylightOpenings: [
        {
            id: 807,
            x: 86.6666666666667,
            y: 145,
        },
        {
            id: 805,
            x: 86.6666666666667,
            y: 185,
        },
    ],
});
