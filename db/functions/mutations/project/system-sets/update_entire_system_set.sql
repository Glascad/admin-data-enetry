DROP FUNCTION IF EXISTS update_entire_system_set;

CREATE OR REPLACE FUNCTION update_entire_system_set(
    system_set ENTIRE_SYSTEM_SET
) RETURNS SYSTEM_SET_OUTPUT AS $$
DECLARE
    ss ALIAS FOR system_set;
    uss system_sets%ROWTYPE;
    sov SELECTED_OPTION_VALUE;
    sdtct SELECTED_DETAIL_TYPE_CONFIGURATION_TYPE;
BEGIN
    SELECT * FROM create_or_update_system_set(ss) INTO uss;
    
    -- SELECTED OPTION VALUES
    IF ss.system_options IS NOT NULL
    THEN
        FOREACH sov IN ARRAY ss.system_options
        LOOP
            IF sov.system_option_id IS NOT NULL
            AND sov.option_value_id IS NOT NULL
            THEN
                DELETE FROM system_set_option_values
                WHERE system_set_option_values.system_set_id = uss.id
                AND system_set_option_values.system_option_id = sov.system_option_id;

                INSERT INTO system_set_option_values (
                    system_set_id,
                    system_id,
                    system_type_id,
                    system_option_id,
                    option_value_id
                ) VALUES (
                    uss.id,
                    uss.system_id,
                    uss.system_type_id,
                    sov.system_option_id,
                    sov.option_value_id
                );
            END IF;
        END LOOP;
    END IF;

    -- SELECTED CONFIGURATION TYPES
    IF ss.detail_type_configuration_types IS NOT NULL
    THEN
        INSERT INTO system_set_detail_type_configuration_types (
            system_set_id,
            system_id,
            system_type_id,
            detail_type_id,
            configuration_type_id
        )
        SELECT
            uss.id AS system_id,
            uss.system_id AS system_id,
            uss.system_type_id AS system_type_id,
            dtct.detail_type_id AS detail_type_id,
            dtct.configuration_type_id AS configuration_type_id
        FROM UNNEST (ss.detail_type_configuration_types) dtct
        ON CONFLICT DO NOTHING;
    END IF;

    -- UNSELECTED CONFIGURATION TYPES
    IF ss.detail_type_configuration_types_to_unselect IS NOT NULL
    THEN
        FOREACH sdtct IN ARRAY ss.detail_type_configuration_types_to_unselect
        LOOP
            DELETE FROM system_set_detail_type_configuration_types
            WHERE system_set_detail_type_configuration_types.system_set_id = uss.id
            AND system_set_detail_type_configuration_types.detail_type_id = sdtct.detail_type_id
            AND system_set_detail_type_configuration_types.configuration_type_id = sdtct.configuration_type_id;
        END LOOP;
    END IF;

    RETURN select_entire_system_set(uss.id);
END;
$$ LANGUAGE plpgsql;