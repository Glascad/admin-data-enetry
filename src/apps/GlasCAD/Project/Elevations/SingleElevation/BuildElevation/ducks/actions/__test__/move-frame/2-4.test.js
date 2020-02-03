import testMoveFrame from './test-move-frame';
import sample2 from "../../../../../utils/sample-elevations/sample2.json";

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
            dimensions: {
                width: 185,
                height: 240,
            }
        },
        {
            id: 729,
            dimensions: {
                width: 185,
                height: 180,
            }
        },
    ],
});
