import { detailOptionValueUpdate, systemOptionUpdate, systemUpdate } from "../../schemas";
import UPDATE_ITEM from "../../actions/update-item";

function testUpdateItem({
    systemInput,
    payload,
    systemOutput,
}) {
    describe(`Testing update options`, () => {
        const result = UPDATE_ITEM({ ...systemUpdate, ...systemInput }, payload);
        test(`Result should be correct for ${payload.name}`, () => {
            expect(result).toMatchObject(systemOutput);
        });
    });
}

testUpdateItem({
    systemInput: {
        systemOptions: [
            {
                ...systemOptionUpdate,
                path: "1.SET",
                __typename: "SystemOption",
            },
        ],
    },
    payload: {
        path: "1.SET.CENTER.JOINERY",
        name: "JOINERY",
        __typename: "SystemOption",
    },
    systemOutput: {
        systemOptions: expect.arrayContaining([
            expect.objectContaining({
                path: "1.SET",
                __typename: "SystemOption",
            }),
            expect.objectContaining({
                path: "1.SET.CENTER.JOINERY",
                __typename: "SystemOption",
            }),
        ])
    },
});

testUpdateItem({
    systemInput: {},
    payload: {
        path: "1.SET.CENTER.HEAD",
        __typename: "SystemDetail",
        name: "HEAD"
    },
    systemOutput: {
        systemDetails: expect.arrayContaining([
            expect.objectContaining({
                path: "1.SET.CENTER.HEAD",
                __typename: "SystemDetail",
            }),
        ])
    },
});


testUpdateItem({
    systemInput: {
        detailOptionValues: [
            {
                ...detailOptionValueUpdate,
                path: "1.SET.CENTER.HEAD.GLAZING.OUTSIDE",
                __typename: "DetailOptionValue",
            },
        ],
    },
    payload: {
        path: "1.SET.CENTER.HEAD.GLAZING.OUTSIDE",
        name: "INSIDE",
        __typename: "DetailOptionValue",
    },
    systemOutput: {
        detailOptionValues: expect.arrayContaining([
            expect.objectContaining({
                path: "1.SET.CENTER.HEAD.GLAZING.INSIDE",
                __typename: "DetailOptionValue",
            }),
        ])
    },
});

testUpdateItem({
    systemInput: {
        configurationOptionValues: [
            {
                path: "1.SET.CENTER.HEAD.GLAZING.INSIDE.DURABILITY.HIGH_PERFORMANCE",
                __typename: "ConfigurationOptionValue",
            }
        ]
    },
    payload: {
        path: "1.SET.CENTER.HEAD.GLAZING.INSIDE.DURABILITY.STANDARD",
        name: "STANDARD",
        __typename: "ConfigurationOptionValue",
    },
    systemOutput: {
        configurationOptionValues: expect.arrayContaining([
            expect.objectContaining({
                path: "1.SET.CENTER.HEAD.GLAZING.INSIDE.DURABILITY.STANDARD",
                __typename: "ConfigurationOptionValue",
            }),
            expect.objectContaining({
                path: "1.SET.CENTER.HEAD.GLAZING.INSIDE.DURABILITY.HIGH_PERFORMANCE",
                __typename: "ConfigurationOptionValue",
            }),
        ])
    },
});