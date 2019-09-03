import merge from "../merge";

function testMerge({
    // system: {
        //id,
        //fake_id,
        //name,
        //manufacturer_id,
        //system_type,
    //     system_options,
    //     detail_options,
    //     configuration_options,
    //     system_option_ids_to_delete,
    //     detail_option_ids_to_delete,
    //     configuration_option_ids_to_delete,
    //     system_option_value_ids_to_delete,
    //     detail_option_value_ids_to_delete,
    //     configuration_option_value_ids_to_delete,
    //     system_detail_type_ids_to_delete,
    //     system_configuration_type_ids_to_delete,
    systemInput,
    _system,
    result,
}) {

    const mergedSystem = merge({systemInput, _system});

    describe(`Merging System.`, () => {
        test(`Testing mergedSystem with result`, () => {
            expect(mergedSystem).toMatchObject(result);
        });
    });
}

testMerge({
    systemInput,
    _system,
    result,
});