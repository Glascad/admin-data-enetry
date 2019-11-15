import merge from "../merge";
import { sample1 } from "../../../../../../../app-logic/__test__/sample-systems";

// Must delete items and children
// Must update items and children
// Must create new items

function testMerge({
    systemInput,
    systemInput: {
        pathsToDelete
    },
    _system,
    result: {
        // must be a definitive list of items to include, so that we know all deletions were cascaded
        systemOptionPathsToInclude,
        // must be a definitive list of items to include, so that we know all deletions were cascaded
        detailOptionPathsToInclude,
        // must be a definitive list of items to include, so that we know all deletions were cascaded
        configurationOptionPathsToInclude,
        // must be a definitive list of items to include, so that we know all deletions were cascaded
        systemOptionValuePathsToInclude,
        // must be a definitive list of items to include, so that we know all deletions were cascaded
        detailOptionValuePathsToInclude,
        // must be a definitive list of items to include, so that we know all deletions were cascaded
        configurationOptionValuePathsToInclude,
        // must be a definitive list of items to include, so that we know all deletions were cascaded
        systemDetailPathsToInclude,
        // must be a definitive list of items to include, so that we know all deletions were cascaded
        detailConfigurationPathsToInclude,
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

    describe(`Merging System on System Options.`, () => {
        test(`Testing merged System Options have the correct Id's`, () => {
            // must be a definitive list of items to include, so that we know all deletions were cascaded
            systemOptionPathsToInclude.forEach(path => {
                expect(_systemOptions).toEqual(expect.arrayContaining([expect.objectContaining({ path })]));
            });
            // _systemOptions.forEach(({ path }) => {
            // must be a definitive list of items to include, so that we know all deletions were cascaded
            //     expect(systemOptionPathsToInclude).toContain(path);
            // });
            pathsToDelete.forEach(path => {
                expect(_systemOptions).not.toEqual(expect.arrayContaining([expect.objectContaining({ path })]));
            });
        });

        test(`Testing merged System Options Values have the correct Id's`, () => {
            // must be a definitive list of items to include, so that we know all deletions were cascaded
            systemOptionValuePathsToInclude.forEach(path => {
                expect(_systemOptionValues).toEqual(expect.arrayContaining([expect.objectContaining({ path })]));
            });
            pathsToDelete.forEach(path => {
                expect(_systemOptionValues).not.toEqual(expect.arrayContaining([expect.objectContaining({ path })]));
            });
        });
    });

    describe(`Merging System on Detail Options.`, () => {
        test(`Testing merged System Detail Types to have the correct Id's`, () => {
            // must be a definitive list of items to include, so that we know all deletions were cascaded
            systemDetailPathsToInclude.forEach(path => {
                expect(_systemDetails).toEqual(expect.arrayContaining([expect.objectContaining({ path })]));
            });
            pathsToDelete.forEach(path => {
                expect(_systemDetails).not.toEqual(expect.arrayContaining([expect.objectContaining({ path })]));
            });
        });

        test(`Testing merged Detail Options have the correct Id's`, () => {
            // must be a definitive list of items to include, so that we know all deletions were cascaded
            detailOptionPathsToInclude.forEach(path => {
                expect(_detailOptions).toEqual(expect.arrayContaining([expect.objectContaining({ path })]));
            });
            pathsToDelete.forEach(path => {
                expect(_detailOptions).not.toEqual(expect.arrayContaining([expect.objectContaining({ path })]));
            });
        });

        test(`Testing merged Detail Option Values have the correct Id's`, () => {
            // must be a definitive list of items to include, so that we know all deletions were cascaded
            detailOptionValuePathsToInclude.forEach(path => {
                expect(_detailOptionValues).toEqual(expect.arrayContaining([expect.objectContaining({ path })]));
            });
            pathsToDelete.forEach(path => {
                expect(_detailOptionValues).not.toEqual(expect.arrayContaining([expect.objectContaining({ path })]));
            });
        });
    });

    describe(`Merging System on Configuration Options.`, () => {
        test(`Testing merged Detail Configuration Types to have the correct Id's`, () => {
            // must be a definitive list of items to include, so that we know all deletions were cascaded
            detailConfigurationPathsToInclude.forEach(path => {
                expect(_detailConfigurations).toEqual(expect.arrayContaining([expect.objectContaining({ path })]));
            });
            pathsToDelete.forEach(path => {
                expect(_detailConfigurations).not.toEqual(expect.arrayContaining([expect.objectContaining({ path })]));
            });
        });

        test(`Testing merged Configuration Options have the correct Id's`, () => {
            // must be a definitive list of items to include, so that we know all deletions were cascaded
            configurationOptionPathsToInclude.forEach(path => {
                expect(_configurationOptions).toEqual(expect.arrayContaining([expect.objectContaining({ path })]));
            });
            pathsToDelete.forEach(path => {
                expect(_configurationOptions).not.toEqual(expect.arrayContaining([expect.objectContaining({ path })]));
            });
        });

        test(`Testing merged Configuration Option Values have the correct Id's`, () => {
            // must be a definitive list of items to include, so that we know all deletions were cascaded
            configurationOptionValuePathsToInclude.forEach(path => {
                expect(_configurationOptionValues).toEqual(expect.arrayContaining([expect.objectContaining({ path })]));
            });
            pathsToDelete.forEach(path => {
                expect(_configurationOptionValues).not.toEqual(expect.arrayContaining([expect.objectContaining({ path })]));
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
                path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS",
                update: {
                    parentSystemDetailPath: '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.NEWDETAIL'
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
        optionGroupPathsToInclude: [
            "GLAZING",
            "STOPS",
        ],
        systemDetailPathsToInclude: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL",
            "1.SET.FRONT.__DT__.HEAD",
        ],
        detailOptionPathsToInclude: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.NEWDETAIL.STOPS",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.NEWDETAIL.STOPS.DOWN.GLAZING",
        ],
        detailOptionValuePathsToInclude: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.NEWDETAIL.STOPS.DOWN",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.NEWDETAIL.STOPS.DOWN.GLAZING.INSIDE",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.NEWDETAIL.STOPS.DOWN.GLAZING.OUTSIDE",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.NEWDETAIL.STOPS.UP",
        ],
        detailConfigurationPathsToInclude: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.NEWDETAIL.STOPS.DOWN.GLAZING.INSIDE.__CT__.COMPENSATING_RECEPTOR",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.NEWDETAIL.STOPS.DOWN.GLAZING.INSIDE.__CT__.HEAD",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.NEWDETAIL.STOPS.DOWN.GLAZING.OUTSIDE.__CT__.COMPENSATING_RECEPTOR",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.NEWDETAIL.STOPS.DOWN.GLAZING.OUTSIDE.__CT__.HEAD",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.NEWDETAIL.STOPS.UP.__CT__.COMPENSATING_RECEPTOR",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.NEWDETAIL.STOPS.UP.__CT__.HEAD",
        ],
        configurationOptionPathsToInclude: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.NEWDETAIL.STOPS.DOWN.GLAZING.INSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.NEWDETAIL.STOPS.DOWN.GLAZING.OUTSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.NEWDETAIL.STOPS.UP.__CT__.COMPENSATING_RECEPTOR.DURABILITY",
        ],
        configurationOptionValuePathsToInclude: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.NEWDETAIL.STOPS.DOWN.GLAZING.INSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.NEWDETAIL.STOPS.DOWN.GLAZING.INSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.NEWDETAIL.STOPS.DOWN.GLAZING.OUTSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.NEWDETAIL.STOPS.DOWN.GLAZING.OUTSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.NEWDETAIL.STOPS.UP.__CT__.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.NEWDETAIL.STOPS.UP.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
        ]
    }
});