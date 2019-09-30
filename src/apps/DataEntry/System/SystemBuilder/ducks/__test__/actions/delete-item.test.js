import { DELETE_ITEM } from "../../actions";
import { systemUpdate } from "../../schemas";

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

testDeleteItem({
    systemInput: {
        systemOptionPathsToDelete: ["1.SET.CENTER"]
    },
    payload: {
        path: "1.SET",
        __typename: "SystemOption",
    },
    systemOutput: {
        systemOptions: [],
        systemOptionPathsToDelete: ["1.SET.CENTER", "1.SET"]
    },
});

testDeleteItem({
    systemInput: {
        systemOptionPathsToDelete: [],
        systemOptions: [{
            path: "1.SET",
            __typename: "SystemOption",
        }]
    },
    payload: {
        path: "1.SET",
        __typename: "SystemOption",
    },
    systemOutput: {
        systemOptions: [],
        systemOptionPathsToDelete: [],
    },
});

testDeleteItem({
    systemInput: {
        systemOptionValuePathsToDelete: [],
        systemOptionValues: [
            {
                path: "1.SET.CENTER",
                __typename: "SystemOptionValue",
            },
        ],
    },
    payload: {
        path: "1.SET.CENTER",
        __typename: "SystemOptionValue",
    },
    systemOutput: {
        systemOptionValues: [],
        systemOptionValuePathsToDelete: [],
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
        systemDetailPathsToDelete: ["1.SET.CENTER.SILL"]
    },
});