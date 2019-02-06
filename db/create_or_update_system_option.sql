DROP FUNCTION IF EXISTS create_or_update_system_option_option;

CREATE OR REPLACE FUNCTION create_or_update_system_option_option (
    system_option_id INTEGER,
    new_name TEXT,
    new_presentation_level INTEGER,
    new_override_level INTEGER,
    new_order INTEGER,
    new_option_value_ids INTEGER[],
    old_option_value_ids INTEGER[],
    option_value_names VARCHAR(50)[],
    option_value_values FLOAT[],
    option_value_orders INTEGER[],
    option_value_mirror_from_ids INTEGER[],
    new_configuration_types INTEGER[],
    old_configuration_types INTEGER[]
) RETURNS SETOF system_options AS $$
BEGIN
    RETURN QUERY
        INSERT INTO system_options(
            id,
            name,
            presentation_level,
            override_level,
            option_order
        )
        VALUES (
            system_option_id,
            new_name,
            new_presentation_level,
            new_override_level,
            new_order
        )
    ON CONFLICT (id) DO UPDATE
        SET
            name = CASE
                WHEN new_name IS NOT NULL
                    THEN new_name
                ELSE system_options.name END,
        WHERE system_options.id = system_option_id
    RETURNING *;
END;
$$ LANGUAGE plpgsql;
