DROP FUNCTION IF EXISTS update_entire_system_option;

CREATE OR REPLACE FUNCTION gc_protected.update_entire_system_option (
    system_option entire_system_option,
    system_id INTEGER
) RETURNS SETOF system_options AS $$
DECLARE
    -- OPTION
    so ALIAS FOR system_option;
    sid INTEGER = CASE WHEN system_id IS NOT NULL
        THEN system_id
        ELSE so.system_id END;
    -- LOOP
    ov entire_option_value;
    ___ INTEGER;
    -- OUT
    uso system_options%ROWTYPE;
BEGIN
    SELECT * FROM create_or_update_system_option(so, sid) INTO uso;

    -- OPTION VALUES
    FOREACH ov IN ARRAY so.option_values
    LOOP
        SELECT id FROM create_or_update_option_value(ov, uso.name, sid) INTO ___;
    END LOOP;

    DELETE FROM option_values ov
        WHERE ov.option_name = uso.name
        AND ov.system_id = sid
        AND id IN (
            SELECT * FROM UNNEST (so.option_values_to_delete)
        );
    
    -- -- CONFIGURATION TYPES
    -- INSERT INTO system_option_configuration_types (
    --     system_option,
    --     configuration_type_id
    -- )
    -- SELECT
    --     uso.name AS system_option,
    --     ct AS configuration_type_id
    -- FROM UNNEST (so.configuration_type_ids) ct;

    -- DELETE FROM system_option_configuration_types
    --     WHERE system_option = uso.name
    --     AND configuration_type_id IN (
    --         SELECT * FROM UNNEST (so.configuration_type_ids_to_delete)
    --     );
    
    RETURN QUERY SELECT * FROM (SELECT uso.*) uso;
END;
$$ LANGUAGE plpgsql;
