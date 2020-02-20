import { systemUpdate } from "../../schemas";
import UPDATE_ITEM from "../../actions/update-item";

/** Must update the item in state if already there (in either update or create array), otherwise add item update to state
* Must also update children that already existed under a different parent but were moved to be under the moved item (in the update array, with a new parentPath that matches the updated item's path)
* Must also update all created children (in create array) in state
 need to account for things moved under the item, moved out from under the item, and created under.*/
function testUpdateItem({
    systemInput,
    payload,
    systemOutput,
}) {
    describe(`Testing update options`, () => {
        const result = UPDATE_ITEM({ ...systemUpdate, ...systemInput }, payload);
        test(`Result should be correct for ${payload.path}`, () => {
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


// 1.SET.CENTER was changed to 1.SET.FRONT
// 1.SET.CENTER.JOINERY had 2 changes:
//      name changed to GLAZING
//      location changed to 1.SET.FRONT (cascaded from CENTER to FRONT)
// 1.SET.FRONT.GLAZING.INSIDE was added
testUpdateItem({
    systemInput: {
        systemOptions: [
            {
                path: "1.SET.CENTER.JOINERY",
                __typename: "SystemOption",
                update: {
                    parentSystemOptionValuePath: "1.SET.FRONT",
                    name: "GLAZING",
                }
            }
        ],
        systemOptionValues: [
            {
                path: "1.SET.CENTER",
                __typename: "SystemOptionValue",
                update: {
                    name: "FRONT"
                }
            }
        ],
        newSystemOptionValues: [
            {
                parentSystemOptionValuePath: "1.SET.FRONT.GLAZING",
                name: "INSIDE",
                __typename: "SystemOptionValue",
            }
        ]
    },
    payload: {
        path: "1.SET.FRONT",
        __typename: "SystemOptionValue",
        update: {
            name: "BACK",
        }
    },
    systemOutput: {
        systemOptions: expect.arrayContaining([
            expect.objectContaining({
                path: "1.SET.CENTER.JOINERY",
                __typename: "SystemOption",
                update: {
                    parentSystemOptionValuePath: "1.SET.BACK",
                    name: "GLAZING",
                }
            }),
        ]),
        systemOptionValues: expect.arrayContaining([
            expect.objectContaining({
                path: "1.SET.CENTER",
                __typename: "SystemOptionValue",
                update: {
                    name: "BACK"
                }
            }),
        ]),
        newSystemOptionValues: expect.arrayContaining([
            expect.objectContaining({
                parentSystemOptionValuePath: "1.SET.BACK.GLAZING",
                name: "INSIDE",
                __typename: "SystemOptionValue",
            }),
        ])
    },
});

testUpdateItem({
    systemInput: {
        systemDetails: [{
            path: "1.SET.CENTER.__DT__.HEAD",
            __typename: "SystemDetail",
            update: {
                name: "HORIZONTAL"
            }
        }]
    },
    payload: {
        path: "1.SET.CENTER.__DT__.HORIZONTAL",
        __typename: "SystemDetail",
        update: {
            name: "SILL"
        }
    },
    systemOutput: {
        systemDetails: expect.arrayContaining([
            expect.objectContaining({
                path: "1.SET.CENTER.__DT__.HEAD",
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
                parentDetailOptionPath: "1.SET.CENTER.__DT__.HEAD.GLAZING",
                name: "OUTSIDE",
                __typename: "DetailOptionValue",
            },
        ],
    },
    payload: {
        path: "1.SET.CENTER.__DT__.HEAD.GLAZING.OUTSIDE",
        __typename: "DetailOptionValue",
        update: {
            name: "INSIDE",
        }
    },
    systemOutput: {
        newDetailOptionValues: expect.arrayContaining([
            expect.objectContaining({
                parentDetailOptionPath: "1.SET.CENTER.__DT__.HEAD.GLAZING",
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
                parentDetailConfigurationPath: "1.SET.CENTER.__DT__.HEAD.GLAZING.INSIDE.__CT__.CONFIGURATION",
                name: "CONFIGURATION_OPTION",
                __typename: "ConfigurationOption",
            }
        ]
    },
    payload: {
        path: "1.SET.CENTER.__DT__.HEAD.GLAZING.INSIDE.__CT__.CONFIGURATION.CONFIGURATION_OPTION",
        __typename: "ConfigurationOption",
        update: {
            parentDetailConfigurationOptionValuePath: "1.SET.CENTER.__DT__.HEAD.GLAZING.OUTSIDE.__CT__.CONFIGURATION.C_O,C_O_V"
        }
    },
    systemOutput: {
        newConfigurationOptions: expect.arrayContaining([
            expect.objectContaining({
                parentDetailConfigurationOptionValuePath: "1.SET.CENTER.__DT__.HEAD.GLAZING.OUTSIDE.__CT__.CONFIGURATION.C_O,C_O_V",
                name: "CONFIGURATION_OPTION",
                __typename: "ConfigurationOption",
            }),
        ])
    },
});
testUpdateItem({
    systemInput: {
        newSystemOptions: [
            {
                fakeId: -1,
                parentSystemPath: "2",
                name: "ADD_OPTION",
                __typename: "SystemOption",
            }
        ]
    },
    payload: {
        path: "2.ADD_OPTION",
        fakeId: -1,
        __typename: "SystemOption",
        update: {
            name: "SET"
        }
    },
    systemOutput: {
        newSystemOptions: expect.arrayContaining([
            expect.objectContaining({
                fakeId: -1,
                parentSystemPath: "2",
                name: "SET",
                __typename: "SystemOption",
            }),
        ])
    },
});
// Updating a non-movement under a moved Item has correct

// testUpdateItem({
//     systemInput: {
//         systemOptions: [{
//             path: "1.SET.CENTER.JOINERY",
//             defaultSystemOptionValue: "SCREW_SPLINE",
//             update: {
//                 parentSystemOptionValuePath: "1.SET.FRONT"
//             },
//         }]
//     },
//     payload: {
//         path: "1.SET.CENTER.JOINERY.SCREW_SPLINE",
//         __typename: "SystemOptionValue",
//         update: {
//             somethingElse: "COOL"
//         }
//     },
//     systemOutput: {
//         systemOptions: [{
//             path: "1.SET.CENTER.JOINERY",
//             defaultSystemOptionValue: "SCREW_SPLINE",
//             update: {
//                 parentSystemOptionValuePath: "FRONT"
//             }
//         }],
//         systemOptionValues: [{
//             path: "1.SET.CENTER.JOINERY.SCREW_SPLINE",
//             __typename: "SystemOptionValue",
//             update: {
//                 somethingElse: "COOL",
//                 parentSystemOptionPath: "1.SET.FRONT.JOINERY",
//             }
//         }],
//     }
// });
