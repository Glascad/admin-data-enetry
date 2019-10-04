import merge from "../merge";
import { sample1 } from "../../../../../../app-logic/__test__/sample-systems";


//THIS TEST IS CURRENTLY NOT WORKING PROPERLY
function testMerge({
    systemInput,
    systemInput: {
        pathsToDelete
    },
    _system,
    result: {
        systemOptionPathsToInclude,
        detailOptionPathsToInclude,
        configurationOptionPathsToInclude,
        systemOptionValuePathsToInclude,
        detailOptionValuePathsToInclude,
        configurationOptionValuePathsToInclude,
        systemDetailPathsToInclude,
        systemConfigurationPathsToInclude,
    },
}) {

    const mergedSystem = merge({ ...systemInput }, { _system });

    const {
        _systemOptions = [],
        _systemOptionValues = [],
        _systemDetails = [],
        _detailOptions = [],
        _detailOptionValues = [],
        _systemConfigurations = [],
        _configurationOptions = [],
        _configurationOptionValues = [],
    } = mergedSystem;

    describe(`Merging System on System Options.`, () => {
        test(`Testing merged System Options have the correct Id's`, () => {
            systemOptionPathsToInclude.forEach(path => {
                expect(_systemOptions).toContainEqual(expect.objectContaining({ path }));
            });
            // _systemOptions.forEach(({ path }) => {
            //     expect(systemOptionPathsToInclude).toContain(path);
            // });
            pathsToDelete.forEach(path => {
                expect(_systemOptions).not.toContainEqual(expect.objectContaining({ path }));
            });
        });

        test(`Testing merged System Options Values have the correct Id's`, () => {
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
            systemDetailPathsToInclude.forEach(path => {
                expect(_systemDetails).toContainEqual(expect.objectContaining({ path }));
            });
            pathsToDelete.forEach(path => {
                expect(_systemDetails).not.toContainEqual(expect.objectContaining({ path }));
            });
        });

        test(`Testing merged Detail Options have the correct Id's`, () => {
            detailOptionPathsToInclude.forEach(path => {
                expect(_detailOptions).toContainEqual(expect.objectContaining({ path }));
            });
            pathsToDelete.forEach(path => {
                expect(_detailOptions).not.toContainEqual(expect.objectContaining({ path }));
            });
        });

        test(`Testing merged Detail Option Values have the correct Id's`, () => {
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
            systemConfigurationPathsToInclude.forEach(path => {
                expect(_systemConfigurations).toContainEqual(expect.objectContaining({ path }));
            });
            pathsToDelete.forEach(path => {
                expect(_systemConfigurations).not.toContainEqual(expect.objectContaining({ path }));
            });
        });

        test(`Testing merged Configuration Options have the correct Id's`, () => {
            configurationOptionPathsToInclude.forEach(path => {
                expect(_configurationOptions).toContainEqual(expect.objectContaining({ path }));
            });
            pathsToDelete.forEach(path => {
                expect(_configurationOptions).not.toContainEqual(expect.objectContaining({ path }));
            });
        });

        test(`Testing merged Configuration Option Values have the correct Id's`, () => {
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
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.SILL",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING.OUTSIDE.COMPENSATING_RECEPTOR",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING.INSIDE.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING.OUTSIDE.COMPENSATING_RECEPTOR.DURABILITY",
        ]
    },
    _system: sample1,
    result: {
        systemOptionPathsToInclude: [
            "1.SET.CENTER.JOINERY",
            "1.SET"
        ],
        systemOptionValuePathsToInclude: [
            "1.SET.CENTER",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE",
            "1.SET.CENTER.JOINERY.SHEAR_BLOCK",
            "1.SET.FRONT",
            "1.SET.MULTI_PLANE"
        ],
        systemDetailPathsToInclude: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.HORIZONTAL",
        ],
        detailOptionPathsToInclude: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING",
        ],
        detailOptionValuePathsToInclude: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING.INSIDE",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING.OUTSIDE",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.UP",
        ],
        systemConfigurationPathsToInclude: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING.INSIDE.COMPENSATING_RECEPTOR",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING.INSIDE.HEAD",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING.OUTSIDE.HEAD",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.UP.COMPENSATING_RECEPTOR",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.UP.HEAD",
        ],
        configurationOptionValuePathsToInclude: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING.INSIDE.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING.OUTSIDE.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING.OUTSIDE.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.UP.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.UP.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
        ],
        configurationOptionPathsToInclude: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING.INSIDE.COMPENSATING_RECEPTOR.DURABILITY",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.UP.COMPENSATING_RECEPTOR.DURABILITY",
        ],
    },
});