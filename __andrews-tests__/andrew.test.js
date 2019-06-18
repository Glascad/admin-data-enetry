describe("Basic tests for understanding...", () => {
    test("Object should be...", () => {

        const newObject = {
            x: 100,
            y: 300
        }

        expect(newObject).toEqual({
            x: 100,
            y: 300
        });
    })
    test("container doesn't have an 8 in it", () => {
        const newContainer = {
            id: 8,
            leftId: 8,
            rightId: 8    
        }

        const newContainer2 = {
            id: 10,
            leftId: 10,
            rightId: 10
        }



        // expect(newContainer).toEqual(expect.not.objectContaining({id:8, leftId: 8, rightId: 8})); //This one will fail
        expect(newContainer2).toEqual(expect.not.objectContaining({id:8, leftId: 8, rightId: 8})); // If any of the objects are in the test
    })

//     //This one doesn't work properly
// test("test the id to make sure its not notWantedNumber", () => {
    
//     const getContainer = (x) => {id: x};
//     const number = 5;
//     const notWantedNumber = 5;

//     const container1 = getContainer(number);

//     expect(container1).toEqual(expect.not.objectContaining({id: notWantedNumber}));
// })

})