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
        test(`Testing merged System Configuration Types to have the correct Id's`, () => {
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
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.OUTSIDE.__CT__.COMPENSATING_RECEPTOR",
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
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING",
        ],
        // must be a definitive list of items to include, so that we know all deletions were cascaded
        detailOptionValuePathsToInclude: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.OUTSIDE",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.UP",
        ],
        // must be a definitive list of items to include, so that we know all deletions were cascaded
        detailConfigurationPathsToInclude: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.COMPENSATING_RECEPTOR",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.HEAD",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.OUTSIDE.__CT__.HEAD",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.UP.__CT__.COMPENSATING_RECEPTOR",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.UP.__CT__.HEAD",
        ],
        // must be a definitive list of items to include, so that we know all deletions were cascaded
        configurationOptionValuePathsToInclude: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.UP.__CT__.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.UP.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
        ],
        // must be a definitive list of items to include, so that we know all deletions were cascaded
        configurationOptionPathsToInclude: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.UP.__CT__.COMPENSATING_RECEPTOR.DURABILITY",
        ],
    },
});