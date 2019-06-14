import testMoveFrame from './test-move-frame';
import sample2 from "../../../../../__test__/sample-elevations/sample2.json";

testMoveFrame({
    elevation: sample2,
    distance: -80,
    detailId: 1854,
    expectedDetails: [

    ],
    deletedDetails: [

    ],
    daylightOpenings: [
        {
            id: 732,
            x: 185,
            y: 240,
        },
        {
            id: 729,
            x: 185,
            y: 180,
        },
    ],
});
