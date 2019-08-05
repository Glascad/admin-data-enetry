DROP FUNCTION IF EXISTS create_or_update_option_value;

CREATE OR REPLACE FUNCTION gc_protected.create_or_update_option_value (
    option_value entire_option_value,
    system_option_id INTEGER
) RETURNS SETOF option_values AS $$
DECLARE
    ov ALIAS FOR option_value;
    soid INTEGER = CASE WHEN system_option_id IS NOT NULL
        THEN system_option_id
        ELSE ov.system_option_id END;
BEGIN
    RAISE NOTICE 'Creating Option Value: %', soid;
    IF ov.id IS NULL
    THEN RETURN QUERY
        INSERT INTO option_values (        
            system_option_id,
            name,
            value
            -- value_order,
            -- mirror_from_option_value_id
        )
        VALUES (
            soid,
            ov.name,
            ov.value
            -- ov.value_order,
            -- ov.mirror_from_option_value_id
        )
        RETURNING *;
    ELSE RETURN QUERY
        UPDATE option_values SET
            name = CASE
                WHEN ov.name IS NOT NULL
                    THEN ov.name
                ELSE option_values.name END,
            value = CASE
                WHEN ov.value IS NOT NULL
                    THEN ov.value
                ELSE option_values.value END
            -- value_order = CASE
            --     WHEN ov.value_order IS NOT NULL
            --         THEN ov.value_order
            --     ELSE option_values.value_order END,
            -- mirror_from_option_value_id = CASE
            --     WHEN ov.mirror_from_option_value_id IS NOT NULL
            --         THEN ov.mirror_from_option_value_id
            --     ELSE option_values.mirror_from_option_value_id END
        WHERE option_values.id = ov.id
        AND option_values.system_option_id = soid
        RETURNING *;
    END IF;
END;
$$ LANGUAGE plpgsql;
