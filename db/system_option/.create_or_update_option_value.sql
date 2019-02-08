DROP FUNCTION IF EXISTS create_or_update_option_value;

CREATE OR REPLACE FUNCTION create_or_update_option_value (
    option_value_id INTEGER,
    system_option_id INTEGER,
    new_name TEXT,
    new_value INTEGER,
    new_value_order INTEGER,
    new_mirror_from_option_value_id INTEGER
) RETURNS SETOF option_values AS $$
BEGIN
    RETURN QUERY
        INSERT INTO option_values(
            id,
            system_option_id,
            name,
            value,
            override_level,
            value_order,
            mirror_from_option_value_id
        )
        VALUES (
            option_value_id,
            system_option_id,
            new_name,
            new_value,
            new_value_order,
            new_mirror_from_option_value_id
        )
    ON CONFLICT (id) DO UPDATE
        SET
            name = CASE
                WHEN EXCLUDED.name IS NOT NULL
                    THEN EXCLUDED.name
                ELSE option_values.name END,
            value = CASE
                WHEN EXCLUDED.value IS NOT NULL
                    THEN EXCLUDED.value
                ELSE option_values.value END,
            value_order = CASE
                WHEN EXCLUDED.value_order IS NOT NULL
                    THEN EXCLUDED.value_order
                ELSE option_values.value_order END,
            mirror_from_option_value_id = CASE
                WHEN EXCLUDED.mirror_from_option_value_id IS NOT NULL
                    THEN EXCLUDED.mirror_from_option_value_id
                ELSE option_values.mirror_from_option_value_id END
        WHERE option_values.id = option_value_id
    RETURNING *;
END;
$$ LANGUAGE plpgsql;
