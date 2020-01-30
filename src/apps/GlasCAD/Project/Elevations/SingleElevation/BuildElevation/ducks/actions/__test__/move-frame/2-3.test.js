import testMoveFrame from './test-move-frame';
import sample2 from "../../../../../utils/sample-elevations/sample2.json";

//Sample2 Test3
testMoveFrame({
    elevation: sample2,
    distance: -160,
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
    ],
    daylightOpenings: [
        {
            id: 732,
            dimensions: {
                width: 185,
                height: 160,
            }
        },
        {
            id: 729,
            dimensions: {
                width: 185,
                height: 260,
            }
        },
    ],
});
