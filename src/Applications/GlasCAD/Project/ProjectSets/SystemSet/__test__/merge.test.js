import sampleData from "../ducks/switch-system"
import mergeSystemSet from "../ducks/merge"

function testSystemSetMerge({
    systemSet,
    systemId,
    systemSetName,
    optionValues,
    detailConfigurations,
    detailConfiguration: {
        selected,
        unselected,
    },
}) {
    const update = {
        name: systemSetName,
        systemId,
        selectedOptionValues: Object.entries().map(({optionName, name}) => ({
            optionName,
            name,
        })),
        detailTypeConfigurationTypes: Object.entries().map(({detailType, name}) => ({
            detailType,
            name,
        })),,
    };
    describe(`Merge systemSet - ${systemSetName}`, () => {

        const mergedSystemSet = mergeSystemSet(update, systemSet);
        const {
            systemSetName: mergedSystemSetName,
            optionValues: mergedOptionValues,
            detailConfigurations: {
                selected: mergedSelected,
                unselected: mergedUnselected,
            },
        } = mergedSystemSet;

        test(`${systemSetName} updated system set name and Id correctly`, () => {
            expect(mergedSystemId).toEqual(systemId);
            expect(mergedSystemSetName).toEqual(systemSetName);
        });
        test(`testing option value pairs on ${systemSetName} updated correctly`, () => {
            expect(mergedOptionValues).toMatchObject(optionValues);
        });
        test(`testing selected detail configurations on ${systemSetName} updated correctly`, () => {
            expect(mergedSelected).toMatchObject(selected);
        });
        test(`testing unselected detail configurations on ${systemSetName} updated correctly`, () => {
            expect(mergedUnselected).toMatchObject(unselected);
        });
    });
}

testSystemSetMerge({
    systemId: 1,
    systemSetName: "Tommy's Extravaganza",
    optionValues: {
        stops: "DOWN",
    },
    detailConfigurations: {
        selected: {
            sill: "SILL_FLASHING",
        },
        unselected: {
            head: "COMPENSATING_RECEPTOR"
        },
    },
})