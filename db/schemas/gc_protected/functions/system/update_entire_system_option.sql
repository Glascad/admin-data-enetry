DROP FUNCTION IF EXISTS update_entire_system_option;

CREATE OR REPLACE FUNCTION gc_protected.update_entire_system_option(
    system_option ENTIRE_SYSTEM_OPTION,
    system SYSTEMS,
    id_map ENTIRE_SYSTEM_ID_MAP
) RETURNS ENTIRE_SYSTEM_ID_MAP AS $$
DECLARE
    so ALIAS FOR system_option;
    s ALIAS FOR system;
    sov ENTIRE_SYSTEM_OPTION_VALUE;
BEGIN

    -- create or update system option
    id_map := create_or_update_system_option(so, s, id_map);

    -- create or update values
    IF so.system_option_values IS NOT NULL THEN
        FOREACH sov IN ARRAY so.system_option_values LOOP
            id_map := update_entire_system_option_value(sov, so, s, id_map);
        END LOOP;
    END IF;

    RETURN id_map;
END;
$$ LANGUAGE plpgsql;