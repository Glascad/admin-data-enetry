DROP FUNCTION IF EXISTS set_default_configuration_option_value;

CREATE OR REPLACE FUNCTION gc_protected.set_default_configuration_option_value(
    configuration_option ENTIRE_CONFIGURATION_OPTION,
    id_map ENTIRE_SYSTEM_ID_MAP
) RETURNS VOID AS $$
DECLARE
    co ALIAS FOR configuration_option;
BEGIN

    UPDATE configuration_options
        SET default_configuration_option_value = COALESCE(
            co.default_configuration_option_value_id,
            get_real_id(
                id_map.configuration_option_value_id_pairs,
                co.default_configuration_option_value_fake_id
            )
        )
        WHERE configuration_options.id = COALESCE(
            co.id,
            get_real_id(
                id_map.configuration_option_id_pairs,
                co.fake_id
            )
        );

END;
$$ LANGUAGE plpgsql;
