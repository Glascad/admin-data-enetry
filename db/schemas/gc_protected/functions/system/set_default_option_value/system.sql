DROP FUNCTION IF EXISTS set_default_system_option_value;

CREATE OR REPLACE FUNCTION gc_protected.set_default_system_option_value(
    system_option ENTIRE_SYSTEM_OPTION,
    id_map ENTIRE_SYSTEM_ID_MAP
) RETURNS VOID AS $$
DECLARE
    so ALIAS FOR system_option;
BEGIN

    UPDATE system_options
        SET default_system_option_value_id = COALESCE(
            so.default_system_option_value_id,
            get_real_id(
                id_map.system_option_value_id_pairs,
                so.default_system_option_value_fake_id
            )
        )
        WHERE system_options.id = COALESCE(
            so.id,
            get_real_id(
                id_map.system_option_id_pairs,
                so.fake_id
            )
        );

END;
$$ LANGUAGE plpgsql;
