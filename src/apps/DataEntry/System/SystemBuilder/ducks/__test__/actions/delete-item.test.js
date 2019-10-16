import { DELETE_ITEM } from "../../actions";
import { systemUpdate } from "../../schemas";

// Must remove all items from update and create and delete arrays that contain the path to be deleted
// delete because we don't need to redundantly delete the items children
// update because we need to remove any updates referencing something that should be deleted
// create because we don't want it to be created anymore
// ONLY add item to delete array if it is not already in the create array
function testDeleteItem({
    systemInput,
    payload,
    systemOutput,
}) {
    describe(`Testing update options`, () => {
        const result = DELETE_ITEM({ ...systemUpdate, ...systemInput }, payload);

        test(`Result should be correct for ${payload.name}`, () => {
            expect(result).toMatchObject(systemOutput);
        });
    });
}

// should delete all items created or moved under deleted item
testDeleteItem({
    systemInput: {
        systemConfigurations: [{
            path: "1.SET.FRONT.CONFIG",
            update: {
                parentDetailOptionValuePath: "1.SET.CENTER.DETAIL"
            }
        }],
        systemOptionValues: [{
            path: "1.SET.CENTER.JOINERY.B",
            update: {
                parentSystemOptionPath: "1.SET.BACK.JOINERY"
            }
        }],
        newDetailOptionValues: [{
            parentDetailOptionPath: "1.SET.CENTER.BLAH.BLAH"
        }],
        pathsToDelete: ["1.SET.CENTER.JOINERY.SOMETHING"]
    },
    payload: {
        path: "1.SET.CENTER",
        __typename: "SystemOptionValue",
    },
    systemOutput: {
        systemOptionValues: [{
            path: "1.SET.CENTER.JOINERY.B",
            update: {
                parentSystemOptionPath: "1.SET.BACK.JOINERY"
            }
        }],
        newDetailOptionValues: [],
        systemOptions: [],
        pathsToDelete: ["1.SET.CENTER", "1.SET.FRONT.CONFIG"] //Should delete paths with the same beginning
    },
});

testDeleteItem({
    systemInput: {
        pathsToDelete: [],
        systemOptions: [{
            path: "1.SET",
            update: {
                defaultSystemOptionValue: "CENTER",
            },
            __typename: "SystemOption",
        }]
    },
    payload: {
        path: "1.SET",
        __typename: "SystemOption",
    },
    systemOutput: {
        systemOptions: [],
        pathsToDelete: ["1.SET"],
    },
});

// Deleting an item whose location has been updated.
testDeleteItem({
    systemInput: {
        pathsToDelete: ["1.SET.CENTER"],
        systemOptions: [{
            path: "1.SET",
            update: {
                name: "JOINERY",
            },
            __typename: "SystemOption",
        }]
    },
    payload: {
        path: "1.JOINERY",
        __typename: "SystemOption",
    },
    systemOutput: {
        systemOptions: [],
        pathsToDelete: ["1.SET"],
    },
});

// Deleting an item whose parent location has been updated.
testDeleteItem({
    systemInput: {
        pathsToDelete: [],
        systemOptions: [{
            path: "1.SET.CENTER.JOINERY",
            update: {
                parentSystemOptionValuePath: "1.SET.FRONT",
            },
            __typename: "SystemOption",
        }]
    },
    payload: {
        path: "1.SET.FRONT.JOINERY",
        __typename: "SystemOption",
    },
    systemOutput: {
        systemOptions: [],
        pathsToDelete: ["1.SET.CENTER.JOINERY"],
    },
});

testDeleteItem({
    systemInput: {
        pathsToDelete: [],
        newSystemOptionValues: [
            {
                parentSystemOptionPath: "1.SET",
                name: "CENTER",
                __typename: "SystemOptionValue",
            },
        ],
    },
    payload: {
        path: "1.SET.CENTER",
        __typename: "SystemOptionValue",
    },
    systemOutput: {
        newSystemOptionValues: [],
        pathsToDelete: [],
    },
});

testDeleteItem({
    systemInput: {
        systemDetails: [
            {
                path: "1.SET.CENTER.HEAD",
                __typename: "SystemDetail",
            },
        ],
    },
    payload: {
        path: "1.SET.CENTER.SILL",
        __typename: "SystemDetail",
    },
    systemOutput: {
        systemDetails: expect.arrayContaining([
            expect.objectContaining({
                path: "1.SET.CENTER.HEAD",
                __typename: "SystemDetail",
            }),
        ]),
        pathsToDelete: ["1.SET.CENTER.SILL"]
    },
});