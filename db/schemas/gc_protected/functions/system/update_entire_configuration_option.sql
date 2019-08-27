DROP FUNCTION IF EXISTS update_entire_configuration_option;

CREATE OR REPLACE FUNCTION gc_protected.update_entire_configuration_option(
    configuration_option ENTIRE_configuration_OPTION,
    system SYSTEMS,
    id_map ENTIRE_SYSTEM_ID_MAP
) RETURNS ENTIRE_SYSTEM_ID_MAP AS $$
DECLARE
    co ALIAS FOR configuration_option;
    s ALIAS FOR system;
    cov ENTIRE_configuration_OPTION_VALUE;
BEGIN

    -- create or update configuration option
    id_map := create_or_update_configuration_option(co, s, id_map);

    -- create or update values
    IF co.values IS NOT NULL THEN
        FOREACH cov IN ARRAY co.values LOOP
            id_map := create_or_update_configuration_option_value(cov, co, s, id_map);
        END LOOP;
    END IF;

    RETURN id_map;
END;
$$ LANGUAGE plpgsql;
