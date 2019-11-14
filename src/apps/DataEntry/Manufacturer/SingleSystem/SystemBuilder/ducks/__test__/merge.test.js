import merge from "../merge";
import { sample1 } from "../../../../../../../app-logic/__test__/sample-systems";

// Must delete items and children
// Must update items and children
// Must create new items

function testMerge({
    description = '',
    systemInput,
    systemInput: {
        pathsToDelete = [],
    },
    _system,
    result: {
        // each must be a definitive list of items to include, so that we know all deletions were cascaded
        systemOptionPathsToInclude = [],
        detailOptionPathsToInclude = [],
        configurationOptionPathsToInclude = [],
        systemOptionValuePathsToInclude = [],
        detailOptionValuePathsToInclude = [],
        configurationOptionValuePathsToInclude = [],
        systemDetailPathsToInclude = [],
        detailConfigurationPathsToInclude = [],
        configurationPartPathsToInclude = [],
    },
}) {

    const mergedSystem = merge({ ...systemInput }, { _system });

    const {
        _systemOptions = [],
        _systemOptionValues = [],
        _systemDetails = [],
        _detailOptions = [],
        _detailOptionValues = [],
        _detailConfigurations = [],
        _configurationOptions = [],
        _configurationOptionValues = [],
    } = mergedSystem;

    describe(`Merging System on System Options: ${description}`, () => {
        test(`Testing merged System Options have the correct Id's`, () => {
            // must be a definitive list of items to include, so that we know all deletions were cascaded
            systemOptionPathsToInclude.forEach(path => {
                expect(_systemOptions).toContainEqual(expect.objectContaining({ path }));
            });
            // _systemOptions.forEach(({ path }) => {
            // must be a definitive list of items to include, so that we know all deletions were cascaded
            //     expect(systemOptionPathsToInclude).toContain(path);
            // });
            pathsToDelete.forEach(path => {
                expect(_systemOptions).not.toContainEqual(expect.objectContaining({ path }));
            });
        });

        test(`Testing merged System Options Values have the correct Id's`, () => {
            // must be a definitive list of items to include, so that we know all deletions were cascaded
            systemOptionValuePathsToInclude.forEach(path => {
                expect(_systemOptionValues).toContainEqual(expect.objectContaining({ path }));
            });
            pathsToDelete.forEach(path => {
                expect(_systemOptionValues).not.toContainEqual(expect.objectContaining({ path }));
            });
        });
    });

    describe(`Merging System on Detail Options.`, () => {
        test(`Testing merged System Detail Types to have the correct Id's`, () => {
            // must be a definitive list of items to include, so that we know all deletions were cascaded
            systemDetailPathsToInclude.forEach(path => {
                expect(_systemDetails).toContainEqual(expect.objectContaining({ path }));
            });
            pathsToDelete.forEach(path => {
                expect(_systemDetails).not.toContainEqual(expect.objectContaining({ path }));
            });
        });

        test(`Testing merged Detail Options have the correct Id's`, () => {
            // must be a definitive list of items to include, so that we know all deletions were cascaded
            detailOptionPathsToInclude.forEach(path => {
                expect(_detailOptions).toContainEqual(expect.objectContaining({ path }));
            });
            pathsToDelete.forEach(path => {
                expect(_detailOptions).not.toContainEqual(expect.objectContaining({ path }));
            });
        });

        test(`Testing merged Detail Option Values have the correct Id's`, () => {
            // must be a definitive list of items to include, so that we know all deletions were cascaded
            detailOptionValuePathsToInclude.forEach(path => {
                expect(_detailOptionValues).toContainEqual(expect.objectContaining({ path }));
            });
            pathsToDelete.forEach(path => {
                expect(_detailOptionValues).not.toContainEqual(expect.objectContaining({ path }));
            });
        });
    });

    describe(`Merging System on Configuration Options.`, () => {
        test(`Testing merged Detail Configuration Types to have the correct Id's`, () => {
            // must be a definitive list of items to include, so that we know all deletions were cascaded
            detailConfigurationPathsToInclude.forEach(path => {
                expect(_detailConfigurations).toContainEqual(expect.objectContaining({ path }));
            });
            pathsToDelete.forEach(path => {
                expect(_detailConfigurations).not.toContainEqual(expect.objectContaining({ path }));
            });
        });

        test(`Testing merged Configuration Options have the correct Id's`, () => {
            // must be a definitive list of items to include, so that we know all deletions were cascaded
            configurationOptionPathsToInclude.forEach(path => {
                expect(_configurationOptions).toContainEqual(expect.objectContaining({ path }));
            });
            pathsToDelete.forEach(path => {
                expect(_configurationOptions).not.toContainEqual(expect.objectContaining({ path }));
            });
        });

        test(`Testing merged Configuration Option Values have the correct Id's`, () => {
            // must be a definitive list of items to include, so that we know all deletions were cascaded
            configurationOptionValuePathsToInclude.forEach(path => {
                expect(_configurationOptionValues).toContainEqual(expect.objectContaining({ path }));
            });
            pathsToDelete.forEach(path => {
                expect(_configurationOptionValues).not.toContainEqual(expect.objectContaining({ path }));
            });
        });
    });
};



testMerge({
    systemInput: {
        // systemOptions: [
        //     {
        //         __typename: "SystemOption",
        //         path: "1.SET",
        //         update: {
        //             name: "SET",
        //         },
        //     },
        //     {
        //         __typename: "SystemOption",
        //         path: "1.SET.CENTER.JOINERY",
        //         update: {
        //             name: "JOINERY",
        //         }
        //     },
        // ],
        pathsToDelete: [
            "1.SET.BACK",
            "1.SET.CENTER.JOINERY.STICK",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.DOWN.GLAZING.OUTSIDE.__CT__.COMPENSATING_RECEPTOR",
        ],
        newOptionGroups: ['JOINERY'],
        optionGroupsToDelete: ['GLAZING'],
    },
    _system: sample1,
    result: {
        optionGroups: [
            {
                __typename: "OptionGroup",
                name: 'STOPS'
            },
            {
                __typename: "OptionGroup",
                name: 'JOINERY'
            },
        ],
        // must be a definitive list of items to include, so that we know all deletions were cascaded
        systemOptionPathsToInclude: [
            "1.SET.CENTER.JOINERY",
            "1.SET"
        ],
        // must be a definitive list of items to include, so that we know all deletions were cascaded
        systemOptionValuePathsToInclude: [
            "1.SET.CENTER",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE",
            "1.SET.CENTER.JOINERY.SHEAR_BLOCK",
            "1.SET.FRONT",
        ],
        // must be a definitive list of items to include, so that we know all deletions were cascaded
        systemDetailPathsToInclude: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL",
        ],
        // must be a definitive list of items to include, so that we know all deletions were cascaded
        detailOptionPathsToInclude: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.DOWN.GLAZING",
        ],
        // must be a definitive list of items to include, so that we know all deletions were cascaded
        detailOptionValuePathsToInclude: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.DOWN",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.DOWN.GLAZING.INSIDE",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.DOWN.GLAZING.OUTSIDE",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.UP",
        ],
        // must be a definitive list of items to include, so that we know all deletions were cascaded
        detailConfigurationPathsToInclude: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.DOWN.GLAZING.INSIDE.__CT__.COMPENSATING_RECEPTOR",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.DOWN.GLAZING.INSIDE.__CT__.HEAD",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.DOWN.GLAZING.OUTSIDE.__CT__.HEAD",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.UP.__CT__.COMPENSATING_RECEPTOR",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.UP.__CT__.HEAD",
        ],
        // must be a definitive list of items to include, so that we know all deletions were cascaded
        configurationOptionValuePathsToInclude: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.DOWN.GLAZING.INSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.UP.__CT__.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.UP.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
        ],
        // must be a definitive list of items to include, so that we know all deletions were cascaded
        configurationOptionPathsToInclude: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.DOWN.GLAZING.INSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.UP.__CT__.COMPENSATING_RECEPTOR.DURABILITY",
        ],
    },
});


testMerge({
    systemInput: {
        detailOptions: [
            {
                path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS",
                defaultDetailOptionValue: "UP",
                update: {
                    parentSystemDetailPath: '"1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL'
                },
            },
        ],
        pathsToDelete: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD",
        ],
    },
    _system: sample1,
    result: {
        systemOptionPathsToInclude: [
            "1.SET",
            "1.SET.CENTER.JOINERY",
        ],
        systemOptionValuePathsToInclude: [
            "1.SET.BACK",
            "1.SET.CENTER",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE",
            "1.SET.CENTER.JOINERY.SHEAR_BLOCK",
            "1.SET.CENTER.JOINERY.STICK",
            "1.SET.FRONT",
        ],
        optionGroups: [
            "GLAZING",
            "STOPS",
        ],
        systemDetailPathsToInclude: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL",
            "1.SET.FRONT.__DT__.HEAD",
        ],
        detailOptionPathsToInclude: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.DOWN.GLAZING",
        ],
        detailOptionValuePathsToInclude: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.DOWN",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.DOWN.GLAZING.INSIDE",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.DOWN.GLAZING.OUTSIDE",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.UP",
        ],
        detailConfigurationPathsToInclude: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.DOWN.GLAZING.INSIDE.__CT__.COMPENSATING_RECEPTOR",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.DOWN.GLAZING.INSIDE.__CT__.HEAD",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.DOWN.GLAZING.OUTSIDE.__CT__.COMPENSATING_RECEPTOR",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.DOWN.GLAZING.OUTSIDE.__CT__.HEAD",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.UP.__CT__.COMPENSATING_RECEPTOR",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.UP.__CT__.HEAD",
        ],
        configurationOptionPathsToInclude: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.DOWN.GLAZING.INSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.DOWN.GLAZING.OUTSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.UP.__CT__.COMPENSATING_RECEPTOR.DURABILITY",
        ],
        configurationOptionValuePathsToInclude: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.DOWN.GLAZING.INSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.DOWN.GLAZING.INSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.DOWN.GLAZING.OUTSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.DOWN.GLAZING.OUTSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.UP.__CT__.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.STOPS.UP.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
        ],
    },
});

testMerge({
    description:"Add Part",
    systemInput: {
        newConfigurationParts: [
            {
                parentDetailConfigurationPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.HEAD",
                name: "dxf4",
            },
        ],
    },
    _system: sample1,
    result: {
        configurationPartPathsToInclude: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.HEAD.__PT-1__.dxf4",
        ],
    },
});
