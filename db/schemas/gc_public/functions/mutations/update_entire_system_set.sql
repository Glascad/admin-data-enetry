DROP FUNCTION IF EXISTS update_entire_system_set;

CREATE OR REPLACE FUNCTION gc_public.update_entire_system_set(
    system_set ENTIRE_SYSTEM_SET
) RETURNS SYSTEM_SETS AS $$
DECLARE
    ss ALIAS FOR system_set;
    uss system_sets%ROWTYPE;
    sov SELECTED_OPTION_VALUE;
    sdtct SELECTED_DETAIL_TYPE_CONFIGURATION_TYPE;
BEGIN
    SELECT * FROM create_or_update_system_set(ss) INTO uss;
    
    -- SELECTED OPTION VALUES
    IF ss.selected_option_values IS NOT NULL THEN
        FOREACH sov IN ARRAY ss.selected_option_values
        LOOP
            IF sov.system_option IS NOT NULL
            AND sov.option_value IS NOT NULL
            THEN DELETE FROM system_set_option_values
                WHERE system_set_option_values.system_set_id = uss.id
                AND system_set_option_values.system_option = sov.system_option;

                INSERT INTO system_set_option_values (
                    system_set_id,
                    system_id,
                    system_type,
                    system_option,
                    option_value
                ) VALUES (
                    uss.id,
                    uss.system_id,
                    uss.system_type,
                    sov.system_option,
                    sov.option_value
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
            system_type,
            detail_type,
            configuration_type
        )
        SELECT
            uss.id AS system_id,
            uss.system_id AS system_id,
            uss.system_type AS system_type,
            dtct.detail_type AS detail_type,
            dtct.configuration_type AS configuration_type
        FROM UNNEST (ss.detail_type_configuration_types) dtct
        ON CONFLICT DO NOTHING;
    END IF;

    -- UNSELECTED CONFIGURATION TYPES
    IF ss.detail_type_configuration_types_to_unselect IS NOT NULL
    THEN
        FOREACH sdtct IN ARRAY ss.detail_type_configuration_types_to_unselect
        LOOP
            DELETE FROM system_set_detail_type_configuration_types _ssdtct
            WHERE _ssdtct.system_set_id = uss.id
            AND _ssdtct.detail_type = sdtct.detail_type
            AND _ssdtct.configuration_type = sdtct.configuration_type;
        END LOOP;
    END IF;

    RETURN uss;
END;
$$ LANGUAGE plpgsql;