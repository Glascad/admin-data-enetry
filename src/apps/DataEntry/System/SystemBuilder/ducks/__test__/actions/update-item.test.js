import { systemUpdate } from "../../schemas";
import UPDATE_ITEM from "../../actions/update-item";

// Must update the item in state if already there (in either update or create array), otherwise add item update to state
// Must also update children that already existed under a different parent but were moved to be under the moved item (in the update array, with a new parentPath that matches the updated item's path)
// Must also update all created children (in create array) in state
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
                path: "1.SET",
                __typename: "SystemOption",
                update: {
                    defaultSystemOptionValue: "FRONT"
                }
            },
        ],
    },
    payload: {
        path: "1.SET.CENTER.JOINERY",
        __typename: "SystemOption",
        update: {
            name: "GLAZING",
        }
    },
    systemOutput: {
        systemOptions: expect.arrayContaining([
            expect.objectContaining({
                path: "1.SET",
                __typename: "SystemOption",
                update: {
                    defaultSystemOptionValue: "FRONT"
                }
            }),
            expect.objectContaining({
                path: "1.SET.CENTER.JOINERY",
                __typename: "SystemOption",
                update: {
                    name: "GLAZING"
                }
            }),
        ])
    },
});

testUpdateItem({
    systemInput: {},
    payload: {
        path: "1.SET.CENTER.HEAD",
        __typename: "SystemDetail",
        update: {
            name: "SILL"
        }
    },
    systemOutput: {
        systemDetails: expect.arrayContaining([
            expect.objectContaining({
                path: "1.SET.CENTER.HEAD",
                __typename: "SystemDetail",
                update: {
                    name: "SILL"
                }
            }),
        ])
    },
});


testUpdateItem({
    systemInput: {
        newDetailOptionValues: [
            {
                parentDetailOptionPath: "1.SET.CENTER.HEAD.GLAZING",
                name: "OUTSIDE",
                __typename: "DetailOptionValue",
            },
        ],
    },
    payload: {
        path: "1.SET.CENTER.HEAD.GLAZING.OUTSIDE",
        __typename: "DetailOptionValue",
        update: {
            name: "INSIDE",
        }
    },
    systemOutput: {
        newDetailOptionValues: expect.arrayContaining([
            expect.objectContaining({
                parentDetailOptionPath: "1.SET.CENTER.HEAD.GLAZING",
                name: "INSIDE",
                __typename: "DetailOptionValue",
            }),
        ])
    },
});

testUpdateItem({
    systemInput: {
        newSystemOptions: [
            {
                name: "SET",
                __typename: "SystemOption",
            },
            {
                parentSystemOptionValuePath: "1.SET.CENTER",
                name: "SELECT_OPTION",
                __typename: "SystemOption",
            },
        ],
    },
    payload: {
        path: "1.SET.CENTER.SELECT_OPTION",
        __typename: "SystemOption",
        update: {
            name: "JOINERY",
        }
    },
    systemOutput: {
        newSystemOptions: expect.arrayContaining([
            expect.objectContaining({
                name: "SET",
                __typename: "SystemOption",
            }),
            expect.objectContaining({
                parentSystemOptionValuePath: "1.SET.CENTER",
                name: "JOINERY",
                __typename: "SystemOption",
            }),
        ])
    },
});

testUpdateItem({
    systemInput: {
        newConfigurationOptions: [
            {
                parentSystemConfigurationPath: "1.SET.CENTER.HEAD.GLAZING.INSIDE.CONFIGURATION",
                name: "CONFIGURATION_OPTION",
                __typename: "ConfigurationOption",
            }
        ]
    },
    payload: {
        path: "1.SET.CENTER.HEAD.GLAZING.INSIDE.CONFIGURATION.CONFIGURATION_OPTION",
        __typename: "ConfigurationOption",
        update: {
            parentSystemConfigurationOptionValuePath: "1.SET.CENTER.HEAD.GLAZING.OUTSIDE.CONFIGURATION.C_O,C_O_V"
        }
    },
    systemOutput: {
        newConfigurationOptions: expect.arrayContaining([
            expect.objectContaining({
                parentSystemConfigurationOptionValuePath: "1.SET.CENTER.HEAD.GLAZING.OUTSIDE.CONFIGURATION.C_O,C_O_V",
                name: "CONFIGURATION_OPTION",
                __typename: "ConfigurationOption",
            }),
        ])
    },
});