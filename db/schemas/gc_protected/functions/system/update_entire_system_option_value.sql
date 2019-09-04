DROP FUNCTION IF EXISTS update_entire_system_option_value;

CREATE OR REPLACE FUNCTION gc_protected.update_entire_system_option_value(
    system_option_value ENTIRE_SYSTEM_OPTION_VALUE,
    system_option ENTIRE_SYSTEM_OPTION,
    system SYSTEMS,
    id_map ENTIRE_SYSTEM_ID_MAP
) RETURNS ENTIRE_SYSTEM_ID_MAP AS $$
DECLARE
    sov ALIAS FOR system_option_value;
    so ALIAS FOR system_option;
    s ALIAS FOR system;
    usov system_option_values%ROWTYPE;
    real_id INTEGER;
    so_id_pairs ID_PAIR[];
    -- fake system option id
    fake_soid INTEGER;
    -- system option id
    soid INTEGER;
    -- system detail type
    dt ENTIRE_SYSTEM_DETAIL_TYPE;
BEGIN

    -- update option value
    id_map := create_or_update_system_option_value(sov, so, s, id_map);

    -- update detail types
    IF sov.system_detail_types IS NOT NULL THEN
        FOREACH dt IN ARRAY sov.system_detail_types LOOP
            id_map := create_or_update_system_detail_type(dt, sov, s, id_map);
        END LOOP;
    END IF;

    RETURN id_map;

END;
$$ LANGUAGE plpgsql;
