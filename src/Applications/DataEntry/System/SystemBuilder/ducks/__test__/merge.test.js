import merge from "../merge";
import { sample1 } from "../../../sample-systems";


//THIS TEST IS CURRENTLY NOT WORKING PROPERLY
function testMerge({
    systemInput,
    systemInput: {
        systemOptionIdsToDelete,
        detailOptionIdsToDelete,
        configurationOptionIdsToDelete,
        systemOptionValueIdsToDelete,
        detailOptionValueIdsToDelete,
        configurationOptionValueIdsToDelete,
        systemDetailTypeIdsToDelete,
        systemConfigurationTypeIdsToDelete,
    },
    _system,
    result: {
        systemOptionIdsToInclude,
        detailOptionIdsToInclude,
        configurationOptionIdsToInclude,
        systemOptionValueIdsToInclude,
        detailOptionValueIdsToInclude,
        configurationOptionValueIdsToInclude,
        systemDetailTypeIdsToInclude,
        systemConfigurationTypeIdsToInclude,
    },
}) {

    const mergedSystem = merge({ ...systemInput }, { _system });

    const {
        _systemOptions = [],
        _systemOptionValues = [],
        _systemDetailTypes = [],
        _detailOptions = [],
        _detailOptionValues = [],
        _systemConfigurationTypes = [],
        _configurationOptions = [],
        _configurationOptionValues = [],
    } = mergedSystem;

    describe(`Merging System on System Options.`, () => {
        test(`Testing merged System Options have the correct Id's`, () => {
            systemOptionIdsToInclude.forEach(id => {
                expect(_systemOptions).toContainEqual(expect.objectContaining({ id }));
            });
            // _systemOptions.forEach(({ id }) => {
            //     expect(systemOptionIdsToInclude).toContain(id);
            // });
            systemOptionIdsToDelete.forEach(id => {
                expect(_systemOptions).not.toContainEqual(expect.objectContaining({ id }));
            });
        });

        test(`Testing merged System Options Values have the correct Id's`, () => {
            systemOptionValueIdsToInclude.forEach(id => {
                expect(_systemOptionValues).toContainEqual(expect.objectContaining({ id }));
            });
            systemOptionValueIdsToDelete.forEach(id => {
                expect(_systemOptionValues).not.toContainEqual(expect.objectContaining({ id }));
            });
        });
    });

    describe(`Merging System on Detail Options.`, () => {
        test(`Testing merged System Detail Types to have the correct Id's`, () => {
            systemDetailTypeIdsToInclude.forEach(id => {
                expect(_systemDetailTypes).toContainEqual(expect.objectContaining({ id }));
            });
            systemDetailTypeIdsToDelete.forEach(id => {
                expect(_systemDetailTypes).not.toContainEqual(expect.objectContaining({ id }));
            });
        });

        test(`Testing merged Detail Options have the correct Id's`, () => {
            detailOptionIdsToInclude.forEach(id => {
                expect(_detailOptions).toContainEqual(expect.objectContaining({ id }));
            });
            detailOptionIdsToDelete.forEach(id => {
                expect(_detailOptions).not.toContainEqual(expect.objectContaining({ id }));
            });
        });

        test(`Testing merged Detail Option Values have the correct Id's`, () => {
            detailOptionValueIdsToInclude.forEach(id => {
                expect(_detailOptionValues).toContainEqual(expect.objectContaining({ id }));
            });
            detailOptionValueIdsToDelete.forEach(id => {
                expect(_detailOptionValues).not.toContainEqual(expect.objectContaining({ id }));
            });
        });
    });

    describe(`Merging System on Configuration Options.`, () => {
        test(`Testing merged System Configuration Types to have the correct Id's`, () => {
            systemConfigurationTypeIdsToInclude.forEach(id => {
                expect(_systemConfigurationTypes).toContainEqual(expect.objectContaining({ id }));
            });
            systemConfigurationTypeIdsToDelete.forEach(id => {
                expect(_systemConfigurationTypes).not.toContainEqual(expect.objectContaining({ id }));
            });
        });

        test(`Testing merged Configuration Options have the correct Id's`, () => {
            configurationOptionIdsToInclude.forEach(id => {
                expect(_configurationOptions).toContainEqual(expect.objectContaining({ id }));
            });
            configurationOptionIdsToDelete.forEach(id => {
                expect(_configurationOptions).not.toContainEqual(expect.objectContaining({ id }));
            });
        });

        test(`Testing merged Configuration Option Values have the correct Id's`, () => {
            configurationOptionValueIdsToInclude.forEach(id => {
                expect(_configurationOptionValues).toContainEqual(expect.objectContaining({ id }));
            });
            configurationOptionValueIdsToDelete.forEach(id => {
                expect(_configurationOptionValues).not.toContainEqual(expect.objectContaining({ id }));
            });
        });
    });
};



testMerge({
    systemInput: {
        systemOptions: [
            {
                __typename: "SystemOption",
                fakeId: 2000,
                name: "HOPPERY",
                parentSystemOptionValueId: 3,
            },
            {
                __typename: "SystemOption",
                fakeId: 3000,
                name: "HOPPERY",
            },
        ],
        systemOptionIdsToDelete: [1], // Set
        systemOptionValueIdsToDelete: [7], // STICK
        systemDetailTypeIdsToDelete: [2], // HORIZONTAL
        detailOptions: [],
        detailOptionIdsToDelete: [2], // Glazing
        detailOptionValueIdsToDelete: [1], // UP
        configurationOptions: [],
        configurationOptionIdsToDelete: [1], // RECEPTOR_TYPE
        configurationOptionValueIdsToDelete: [3], // STANDARD
        systemConfigurationTypeIdsToDelete: [3], // HEAD
    },
    _system: sample1,
    result: {
        systemOptionIdsToInclude: [2],
<<<<<<< HEAD
        detailOptionIdsToInclude: [1],
        configurationOptionIdsToInclude: [2, 3, 4],
        systemOptionValueIdsToInclude: [5, 6],
        detailOptionValueIdsToInclude: [2, 3, 4],
        configurationOptionValueIdsToInclude: [4, 5, 6, 7, 8],
        systemDetailTypeIdsToInclude: [1, 3, 4, 5],
        systemConfigurationTypeIdsToInclude: [4, 5, 6, 7, 8],
    }
=======
        systemOptionValueIdsToInclude: [5, 6],
        systemDetailTypeIdsToInclude: [1, 3, 4, 5],
        detailOptionIdsToInclude: [1],
        detailOptionValueIdsToInclude: [2],
        systemConfigurationTypeIdsToInclude: [],
        configurationOptionValueIdsToInclude: [],
        configurationOptionIdsToInclude: [],
    },
>>>>>>> dc068484bbd5ad8b372b743707b6fec96d713436
});