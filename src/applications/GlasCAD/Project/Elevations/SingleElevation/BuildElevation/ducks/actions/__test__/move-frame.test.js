import applyActionToElevation from "./apply-action";
import MOVE_FRAME from "../move-frame";
import sample1 from "../../../../__test__/sample-elevations/sample1.json";
import sample2 from "../../../../__test__/sample-elevations/sample2.json";
import { DIRECTIONS } from "../../../../utils/recursive-elevation/directions";


const testMoveFrame = ({ name, elevation, detailId, distance, expectedDetails, deletedDetails, daylightOpenings }) => {
    const sampleResult = applyActionToElevation(elevation, MOVE_FRAME, ({
        details: {
            [detailId]: {
                _frame
            },
        },
    }) => ({
        _frame,
        distance,
    }));

    describe(`${name} frame moving a distance of ${distance}`, () => {
        test(`daylight openings are correct for all containers`, () => {

            daylightOpenings.forEach(({ id, ...daylightOpening }) => {
                expect(sampleResult).toMatchObject({
                    containers: {
                        [id]: {
                            daylightOpening
                        }
                    }
                })

            })

        });
        test(`all details are correctly added or have changed their reference`, () => {


            // expectedDetails.forEach(detail => {
            //     expect(sampleResult.allDetails.some(({ firstContaierId, secondContainerId }) => (
            //         (detail.firstContaierId === firstContaierId)
            //         &&
            //         (detail.secondContainerId === secondContainerId)
            //     ))).toBeTruthy()
            // });

            // expectedDetails.some( detail => {
            //     sampleResult.detailIds.map( id => {
            //         sampleResult.details[id]
            //     })
            // })

            // sampleResult.detailIds.map( (id) => {

            // })

            // expectedDetails.forEach( detail => {
            //     expect(sampleResult.allDetails).toContainEqual(expect.objectContaining(detail));
            // });



            // expect(sampleResult.allDetails).toMatchObject(
            //     expect.arrayContaining(
            //         expectedDetails.map(
            //             detail => expect.objectContaining(detail)
            //             )
            //     )
            // );



        });



        test("all details are correctly deleted or have changed their reference", () => {

        });
    });

    return sampleResult;

}

testMoveFrame({
    name: "sample2",
    elevation: sample2,
    distance: -270,
    detailId: 1854,
    expectedDetails: [
        {
            firstContaierId: 729,
            secondContainerId: 738,
        },
        // {
        //     firstContaierId: 729,
        //     secondContainerId: 737,
        // },
        // {
        //     firstContaierId: 1,
        //     secondContainerId: 2,
        // },
    ],
    deletedDetails: [
        {
            firstContaierId: 732,
            secondContainerId: 736,
        },
        {
            firstContaierId: 732,
            secondContainerId: 737,
        },
    ],
    daylightOpenings: [
        {
            id: 732,
            x: 185,
            y: 50
        },
        {
            id: 729,
            x: 185,
            y: 370
        },
    ],
});