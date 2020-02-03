import generateElevation from '../generate-elevation';
import testElevation from '../../utils/recursive-elevation/__test__/validation-tests/index.test';
import calculateDetailCount from './calculate-detail-count';
import calculateFrameCount from './calculate-frame-count';
import testElevationArrays from '../../utils/recursive-elevation/__test__/validation-tests/test-elevation-arrays.test';
import { ImperialValue } from '../../../../../../../utils';
import { defaultElevationInput } from '../elevation-input';

const testGeneration = ({ description, elevationInput }) => {

    const {
        height,
        width,
        startingBayQuantity: bayCount,
        horizontals: {
            length: horizontalCount,
        },
    } = elevationInput;

    const elevation = {
        ...generateElevation(elevationInput),
        name: description,
    };

    testElevation({
        description: `${description} - Testing validity elevation generation`,
        elevation,
    });

    testElevationArrays({
        elevation,
        containerCount: bayCount * (horizontalCount + 1),
        detailCount: calculateDetailCount({
            bayCount,
            horizontalCount,
        }),
        frameCount: calculateFrameCount({
            bayCount,
            horizontalCount,
        }),
        roughOpening: {
            width,
            height,
        },
    });

    return elevation;
}

testGeneration({
    description: "Default Input",
    elevationInput: defaultElevationInput,
});

testGeneration({
    description: "Sample Input 1",
    elevationInput: {
        height: 300,
        width: 500,
        startingBayQuantity: 3,
        finishedFloorHeight: 0,
        sightline: 10,
        horizontals: [],
    },
});
