import generateElevation from '../generate-elevation';
import testElevation from '../../utils/recursive-elevation/__test__/validation-tests/index.test';
import RecursiveElevation from '../../utils/recursive-elevation/elevation';
import '../../../../../../../../public';
import calculateDetailCount from './calculate-detail-count';

const testGeneration = ({ description, elevationInput }) => {

    const elevation = {
        ...generateElevation(elevationInput),
        name: description,
    };

    testElevation({
        description: `${description} - Testing validity elevation generation`,
        elevation,
    });

    // confirmElevationSpecs({
    //     elevation,
    //     containersLength: startingBayQuantity * (elevationInput.horizontals.length + 1),
    //     detailsLength: calculateDetailCount({
    //         bayCount: elevationInput.startingBayQuantity,
    //         horizontalCount: elevationInput.horizontals.length,
    //     }),
    //     framesLength: calculateFrameCount({
    //         bayCount: elevationInput.startingBayQuantity,
    //         horizontalCount: elevationInput.horizontals.length,
    //     }),
    // });

    describe(`${description} - Testing elevation generation`, () => {
        test("Has correct rough opening", () => { })
    });

    return elevation;
}

testGeneration({
    description: "Sample Input 1",
    elevationInput: {
        verticalRoughOpening: 300,
        horizontalRoughOpening: 500,
        startingBayQuantity: 3,
        finishedFloorHeight: 0,
        sightline: 10,
        horizontals: [],
    },
});
