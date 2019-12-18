import { SELECT_OPTION_GROUP_VALUE } from "../../actions";
import { SystemMap } from "../../../../../../../../app-logic/system";
import SAMPLE_SYSTEM_SETS from "../sample-query-results";
import { defaultSystemSetUpdate } from "../../schemas";

const {
    sample1: {
        systemSet: sample1SystemSet,
        system: sample1System,
    }
} = SAMPLE_SYSTEM_SETS;

function testSelectOptionGroupValue({
    description = '',
    systemSetUpdate,
    _systemSet = {
        id: 0,
        name: "Test System Set",
        systemId: 0,
        projectId: 1,
        systemOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE",
        _systemSetOptionGroupValues: [],
        _systemSetDetails: [],
        _systemSetConfigurations: [],
    },
    payload: {
        optionName,
        name,
    },
    optionGroupValues = [],
    details = [],
    configurations = [],
    nonExistingOptionGroupValues = [],
    nonExistingDetails = [],
    nonExistingConfigurations = [],
}) {
    describe(`Testing select option group value: ${description}`, () => {
        const result = SELECT_OPTION_GROUP_VALUE(
            {
                _systemSet,
            },
            {
                ...defaultSystemSetUpdate,
                ...systemSetUpdate,
            },
            [
                optionName,
                name,
                new SystemMap(sample1System),
            ],
        );
        if (!optionGroupValues.length && !nonExistingOptionGroupValues.length) throw new Error(`Must provide either optionGroupValues or nonExistingOptionGroupValues to testSelectOptionGroupValue()`);
        if (optionGroupValues.length)
            test('must contain correct option group option values', () => {
                expect(result.optionGroupValues).toEqual(
                    expect.arrayContaining(
                        optionGroupValues.map(ogv => (
                            expect.objectContaining(ogv)
                        ))
                    )
                );
            });
        if (details.length)
            test('must contain correct detail option values', () => {
                expect(result.details).toEqual(
                    expect.arrayContaining(
                        details.map(dov => (
                            expect.objectContaining(dov)
                        ))
                    )
                );
            });
        if (configurations.length)
            test('must contain correct configuration option values', () => {
                expect(result.configurations).toEqual(
                    expect.arrayContaining(
                        configurations.map(cov => (
                            expect.objectContaining(cov)
                        ))
                    )
                );
            });
        if (nonExistingOptionGroupValues.length)
            test('most not contain incorrect option group values', () => {
                expect(result.optionGroupValues).toEqual(
                    expect.not.arrayContaining(
                        nonExistingOptionGroupValues.map(ogv => (
                            expect.objectContaining(ogv)
                        ))
                    )
                );
            });
        if (nonExistingDetails.length)
            test('most not contain incorrect detail option values', () => {
                expect(result.details).toEqual(
                    expect.not.arrayContaining(
                        nonExistingDetails.map(dov => (
                            expect.objectContaining(dov)
                        ))
                    )
                );
            });
        if (nonExistingConfigurations.length)
            test('most not contain incorrect configuration option values', () => {
                expect(result.configurations).toEqual(
                    expect.not.arrayContaining(
                        nonExistingConfigurations.map(cov => (
                            expect.objectContaining(cov)
                        ))
                    )
                );
            });
    });
}

testSelectOptionGroupValue({
    description: "Can update option group value with empty state and new systemSet, and select defaults for configurations",
    _systemSet: sample1SystemSet,
    payload: {
        optionName: "GLAZING",
        name: "OUTSIDE",
    },
    optionGroupValues: [
        {
            optionName: "GLAZING",
            name: "OUTSIDE",
        },
    ],
    details: [],
    configurations: [
        {
            configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.DOWN.GLAZING.OUTSIDE"
        },
        {
            configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN.GLAZING.OUTSIDE"
        }
    ],
});

testSelectOptionGroupValue({
    description: "Can update option group value with no State, and no pre-set systemSet",
    payload: {
        optionName: "GLAZING",
        name: "INSIDE",
    },
    optionGroupValues: [
        {
            optionName: "GLAZING",
            name: "INSIDE",
        },
    ],
});

testSelectOptionGroupValue({
    description: "Can update option group value with some State, and no pre-set systemSet",
    payload: {
        optionName: "GLAZING",
        name: "OUTSIDE",
    },
    systemSetUpdate: {
        details: [
            {
                systemDetailPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD",
            },
            {
                detailOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN"
            },
            {
                systemDetailPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL",
            }
        ],
        configurations: [
            {
                configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.DOWN.GLAZING.INSIDE"
            },
            {
                configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY"
            },
            {
                detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL",
            },
            {
                detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SHIM_SUPPORT",
            },
            {
                configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN.GLAZING.INSIDE"
            }
        ]
    },
    optionGroupValues: [
        {
            optionName: "GLAZING",
            name: "OUTSIDE",
        },
    ],
    details: [
        {
            systemDetailPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD",
        },
        {
            detailOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN"
        },
        {
            systemDetailPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL",
        }
    ],
    configurations: [
        {
            configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.DOWN.GLAZING.OUTSIDE"
        },
        {
            configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY"
        },
        {
            detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL",
        },
        {
            detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SHIM_SUPPORT",
        },
        {
            configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN.GLAZING.OUTSIDE"
        }
    ]
});

testSelectOptionGroupValue({
    description: "Can update option group value back to original",
    _systemSet: sample1SystemSet,
    systemSetUpdate: {
        optionGroupValues: [
            {
                optionName: "GLAZING",
                name: "OUTSIDE",
            },
        ],
    },
    payload: {
        optionName: "GLAZING",
        name: "INSIDE",
    },
    nonExistingOptionGroupValues: [
        {
            optionName: "GLAZING",
        },
    ],
    nonExistingConfigurations: [
        {
            configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.DOWN.GLAZING.OUTSIDE"
        },
        {
            configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN.GLAZING.OUTSIDE"
        }
    ],
});

testSelectOptionGroupValue({
    description: "Can update option group value back to original",
    _systemSet: sample1SystemSet,
    systemSetUpdate: {
        optionGroupValues: [
            {
                optionName: "GLAZING",
                name: "OUTSIDE",
            },
        ],
    },
    payload: {
        optionName: "GLAZING",
        name: "INSIDE",
    },
    nonExistingOptionGroupValues: [
        {
            optionName: "GLAZING",
        },
    ],
    configurations: [],
    nonExistingConfigurations: [
        {
            configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.DOWN.GLAZING.OUTSIDE"
        },
        {
            configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN.GLAZING.OUTSIDE"
        }
    ],
});

// updating details keeps selected configurations
testSelectOptionGroupValue({
    description: "Selecting the same Item in state",
    // _systemSet: sample1SystemSet,
    payload: {
        optionName: "GLAZING",
        name: "OUTSIDE"
    },
    systemSetUpdate: {
        systemOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE",
        optionGroupValues: [{
            optionName: "GLAZING",
            name: "OUTSIDE"
        }],
        details: [
            {
                systemDetailPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD"
            },
            {
                systemDetailPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL"
            },
            {
                detailOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.OUTSIDE"
            }
        ],
        configurations: [
            {
                detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.OUTSIDE.__CT__.SILL"
            }
        ],
    },
    optionGroupValues: [{
        optionName: "GLAZING",
        name: "OUTSIDE"
    }],
    details: [
        {
            systemDetailPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD"
        },
        {
            systemDetailPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL"
        },
        {
            detailOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.OUTSIDE"
        }
    ],
    configurations: [
        {
            detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.OUTSIDE.__CT__.SILL"
        }
    ],
});

testSelectOptionGroupValue({
    description: "Selecting the same Item in state",
    _systemSet: {
        id: 3,
         name: "Test System Set",
         systemId: 0,
         projectId: 3,
         systemOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE",
        _systemSetOptionGroupValues: [
            {
         optionName: "GLAZING",
             name: "INSIDE"
         },
            {
         optionName: "STOPS",
                name: "DOWN"
            }
        ],
        _systemSetDetails: [
            {
                systemDetailPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD"
            },
            {
                detailOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN"
            },
            {
                systemDetailPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL"
            }
        ],
        _systemSetConfigurations: [
            {
                configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.DOWN.GLAZING.INSIDE"
            },
            {
                configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY"
            },
            {
                detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL"
            },
            {
                configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN.GLAZING.INSIDE"
            }
        ]
    },
    // _systemSet: sample1SystemSet,
    payload: {
        optionName: "GLAZING",
        name: "OUTSIDE"
    },
    systemSetUpdate: {
        systemOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE",
        optionGroupValues: [{
            optionName: "STOPS",
            name: "UP"
        }],
        details: [
            {
                detailOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.INSIDE"
            },
        ],
        configurations: [
            {
                configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.UP"
            },
            {
                detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.INSIDE.__CT__.SILL"
            },
            {
                configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.UP.GLAZING.INSIDE"
            }
        ]
    }, optionGroupValues: [
        {
        optionName: "STOPS",
        name: "UP"
        },
        {
            optionName: "GLAZING",
            name: "OUTSIDE",
        }
    ],
    details: [
        {
            detailOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.OUTSIDE"
        },
    ],
    configurations: [
        {
            configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.UP"
        },
        {
            detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.OUTSIDE.__CT__.SILL"
        },
        {
            configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.UP.GLAZING.OUTSIDE"
        }
    ]
});