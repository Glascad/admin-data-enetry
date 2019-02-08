DROP FUNCTION IF EXISTS update_entire_system_option;



CREATE OR REPLACE FUNCTION update_entire_system_option (
    system_option entire_system_option
) RETURNS SETOF system_options AS $$
DECLARE
    -- OPTION
    so ALIAS FOR system_option;
    -- LOOP
    ov entire_option_value;
    ___ INTEGER;
    -- OUT
    uso system_options%ROWTYPE;
BEGIN
    SELECT * FROM create_or_update_system_option(so) INTO uso;

    -- OPTION VALUES
    FOREACH ov IN ARRAY so.option_values
    LOOP
        SELECT id FROM create_or_update_option_value(ov) INTO ___;
    END LOOP;

    DELETE FROM option_values
        WHERE system_option_id = uso.id
        AND id IN (
            SELECT * FROM UNNEST (so.option_value_ids_to_delete)
        );
    
    -- CONFIGURATION TYPES
    INSERT INTO system_option_configuration_types (
        system_option_id,
        configuration_type_id
    )
    SELECT
        uso.id AS system_option_id,
        ct AS configuration_type_id
    FROM UNNEST (so.configuration_type_ids) ct;

    DELETE FROM system_option_configuration_types
        WHERE system_option_id = uso.id
        AND configuration_type_id IN (
            SELECT * FROM UNNEST (so.configuration_type_ids_to_delete)
        );
    
    RETURN QUERY SELECT * FROM (SELECT uso.*) uso;
END;
$$ LANGUAGE plpgsql;
