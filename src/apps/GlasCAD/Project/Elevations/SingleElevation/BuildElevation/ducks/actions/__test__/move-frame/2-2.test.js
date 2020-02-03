import testMoveFrame from './test-move-frame';
import sample2 from "../../../../../utils/sample-elevations/sample2.json";

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
            dimensions: {
                width: 185,
                height: 100,
            }
        },
        {
            id: 729,
            dimensions: {
                width: 185,
                height: 320,
            }
        },
    ],
});
