import merge from "../merge";
import { sample1 } from "../../../sample-systems";

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
        _systemOptions: mergedSystemOptions = [],
        _detailOptions: mergedDetailOptions = [],
        _configurationOptions: mergedConfigurationOptions = [],
    } = mergedSystem;

    describe(`Merging System on System Options.`, () => {
        test(`Testing merged System Options have the correct ID's`, () => {
            mergedSystemOptions.forEach(({ id }) => {
                expect(systemOptionIdsToInclude).toContain(id);
            })
            systemOptionIdsToDelete.forEach(id => {
                expect(mergedSystemOptions).toEqual(
                    expect.not.arrayContaining([
                        expect.objectContaining({ id })
                    ])
                );
            })
        });

        test(`Testing merged System Options Values have the correct ID's`, () => {
            mergedSystemOptions.forEach(({ _systemOptionValues }) => {
                _systemOptionValues.forEach(({ id }) => {
                    expect(systemOptionValueIdsToInclude).toContain(id);
                })
            })
            systemOptionValueIdsToDelete.forEach(id => {
                mergedSystemOptions.forEach(value => {
                    expect(value.id).toEqual(
                        expect.not.arrayContaining([
                            expect.objectContaining({ id })
                        ])
                    );
                })
            });
        });

        test(`Testing merged System Detail Types to have the correct ID's`, () => {
            mergedSystemOptions.forEach(({ _systemOptionValues = [] }) => {
                _systemOptionValues.forEach(({ _systemDetailType = [] }) => {
                    _systemDetailType.forEach(({ id = 0 }) => {
                        expect(systemDetailTypeIdsToInclude).toContain(id);
                    })
                })
            })
            systemDetailTypeIdsToDelete.forEach(id => {
                mergedSystemOptions.forEach(value => {
                    expect(value.id).toEqual(
                        expect.not.arrayContaining([
                            expect.objectContaining({ id })
                        ])
                    );
                })
            });
        });
    });

    describe(`Merging System on Detail Options.`, () => {
        test(`Testing merged Detail Options have the correct ID's`, () => {
            mergedDetailOptions.forEach(({ id }) => {
                expect(detailOptionIdsToInclude).toContain(id);
            })
            detailOptionIdsToDelete.forEach(id => {
                expect(mergedDetailOptions).toEqual(
                    expect.not.arrayContaining([
                        expect.objectContaining({ id })
                    ])
                );
            })
        });

        test(`Testing merged Detail Options Values have the correct ID's`, () => {
            mergedDetailOptions.forEach(({ _detailOptionValues }) => {
                _detailOptionValues.forEach(({ id }) => {
                    expect(detailOptionValueIdsToInclude).toContain(id);
                })
            })
            detailOptionValueIdsToDelete.forEach(id => {
                mergedDetailOptions.forEach(value => {
                    expect(value.id).toEqual(
                        expect.not.arrayContaining([
                            expect.objectContaining({ id })
                        ])
                    );
                })
            });
        });

        test(`Testing merged System Configuration Types to have the correct ID's`, () => {
            mergedDetailOptions.forEach(({ _detailOptionValues = [] }) => {
                _detailOptionValues.forEach(({ _systemConfigurationType = [] }) => {
                    _systemConfigurationType.forEach(({ id = 0 }) => {
                        expect(systemConfigurationTypeIdsToInclude).toContain(id);
                    })
                })
            })
            systemConfigurationTypeIdsToDelete.forEach(id => {
                mergedDetailOptions.forEach(value => {
                    expect(value.id).toEqual(
                        expect.not.arrayContaining([
                            expect.objectContaining({ id })
                        ])
                    );
                })
            });
        });
    });

    describe(`Merging System on Configuration Options.`, () => {
        test(`Testing merged Configuration Options have the correct ID's`, () => {
            mergedConfigurationOptions.forEach(({ id }) => {
                expect(configurationOptionIdsToInclude).toContain(id);
            })
            configurationOptionIdsToDelete.forEach(id => {
                expect(mergedConfigurationOptions).toEqual(
                    expect.not.arrayContaining([
                        expect.objectContaining({ id })
                    ])
                );
            })
        });

        test(`Testing merged Configuration Options Values have the correct ID's`, () => {
            mergedConfigurationOptions.forEach(({ _configurationOptionValues }) => {
                _configurationOptionValues.forEach(({ id }) => {
                    expect(configurationOptionValueIdsToInclude).toContain(id);
                })
            })
            configurationOptionValueIdsToDelete.forEach(id => {
                mergedConfigurationOptions.forEach(value => {
                    expect(value.id).toEqual(
                        expect.not.arrayContaining([
                            expect.objectContaining({ id })
                        ])
                    );
                })
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
                _systemOptionValues: [],
            },
            {
                __typename: "SystemOption",
                fakeId: 3000,
                name: "HOPPERY",
                _systemOptionValues: [],
            },
        ],
        detailOptions: [],
        configurationOptions: [],
        systemOptionIdsToDelete: [1], //Set
        detailOptionIdsToDelete: [2], //Glazing
        configurationOptionIdsToDelete: [1], //RECEPTOR_TYPE
        systemOptionValueIdsToDelete: [7], //STICK
        detailOptionValueIdsToDelete: [1], //UP
        configurationOptionValueIdsToDelete: [3], //STANDARD
        systemDetailTypeIdsToDelete: [2], //HORIZONTAL
        systemConfigurationTypeIdsToDelete: [3], //HEAD
    },
    _system: sample1,
    result: {
        systemOptionIdsToInclude: [2, 999], //this should fail because of the 999
        detailOptionIdsToInclude: [1, 999], //this should fail because of the 999
        configurationOptionIdsToInclude: [2, 3, 4, 999], //this should fail because of the 999
        systemOptionValueIdsToInclude: [5, 6, 999], //this should fail because of the 999
        detailOptionValueIdsToInclude: [2, 3, 4, 999], //this should fail because of the 999
        configurationOptionValueIdsToInclude: [4, 5, 6, 7, 8, 999], //this should fail because of the 999
        systemDetailTypeIdsToInclude: [1, 3, 4, 5, 999], //this should fail because of the 999
        systemConfigurationTypeIdsToInclude: [4, 5, 6, 7, 8, 999], //this should fail because of the 999
    }
});