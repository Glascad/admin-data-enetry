DROP FUNCTION IF EXISTS set_default_configuration_option_value;

CREATE OR REPLACE FUNCTION set_default_configuration_option_value(
    configuration_option ENTIRE_CONFIGURATION_OPTION,
    id_map ENTIRE_SYSTEM_ID_MAP
) RETURNS VOID AS $$
DECLARE
    co ALIAS FOR configuration_option;
BEGIN

    UPDATE configuration_options SET default_configuration_option_value = COALESCE(
        co.default_configuration_option_value_id,
        get_real_id(
            id_map.configuration_option_value_id_pairs,
            co.default_configuration_option_value_fake_id
        )
    );

END;
$$ LANGUAGE plpgsql;
