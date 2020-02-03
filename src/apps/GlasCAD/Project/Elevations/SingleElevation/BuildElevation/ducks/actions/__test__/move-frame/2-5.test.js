import testMoveFrame from './test-move-frame';
import sample2 from "../../../../../utils/sample-elevations/sample2.json";

testMoveFrame({
    elevation: sample2,
    distance: -105,
    detailId: 1854,
    elevationArrays: {

    },
    expectedDetails: [

    ],
    deletedDetails: [

    ],
    daylightOpenings: [
        {
            id: 732,
            dimensions: {
                width: 185,
                height: 215,
            }
        },
        {
            id: 729,
            dimensions: {
                width: 185,
                height: 205,
            }
        },
    ],
});
