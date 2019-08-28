DROP FUNCTION IF EXISTS update_entire_detail_option_value;

CREATE OR REPLACE FUNCTION gc_protected.update_entire_detail_option_value(
    detail_option_value ENTIRE_DETAIL_OPTION_VALUE,
    detail_option ENTIRE_DETAIL_OPTION,
    system SYSTEMS,
    id_map ENTIRE_SYSTEM_ID_MAP
) RETURNS ENTIRE_SYSTEM_ID_MAP AS $$
DECLARE
    dov ALIAS FOR detail_option_value;
    _do ALIAS FOR detail_option;
    s ALIAS FOR system;
    usov detail_option_values%ROWTYPE;
    real_id INTEGER;
    so_id_pairs ID_PAIR[];
    -- fake system option id
    fake_soid INTEGER;
    -- system option id
    soid INTEGER;
    -- system detail type
    ct ENTIRE_SYSTEM_CONFIGURATION_TYPE;
BEGIN

    -- update option value
    id_map := create_or_update_detail_option_value(dov, _do, s, id_map);

    -- update detail types
    IF dov.configuration_types IS NOT NULL THEN
        FOREACH ct IN ARRAY dov.configuration_types LOOP
            id_map := create_or_update_system_configuration_type(ct, dov, s, id_map);
        END LOOP;
    END IF;

    RETURN id_map;

END;
$$ LANGUAGE plpgsql;
