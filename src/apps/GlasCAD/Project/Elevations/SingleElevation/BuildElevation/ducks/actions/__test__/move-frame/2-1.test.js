import testMoveFrame from './test-move-frame';
import sample2 from "../../../../../utils/sample-elevations/sample2.json";

// Sample2 Test1
testMoveFrame({
    elevation: sample2,
    // elevationArrays: {
    //     containerCount: 9,
    //     detailCount: 26,
    //     frameCount: 9,
    // },
    distance: -270,
    detailId: 1854,
    expectedDetails: [
        {
            firstContainerId: 729,
            secondContainerId: 738,
        },
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
            dimensions: {
                width: 185,
                height: 50,
            }
        },
        {
            id: 729,
            dimensions: {
                width: 185,
                height: 370,
            }
        },
    ],
});
