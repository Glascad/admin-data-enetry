DROP FUNCTION IF EXISTS create_or_update_system_option;

CREATE OR REPLACE FUNCTION create_or_update_system_option (
    system_id INTEGER,
    system_option_id INTEGER,
    new_name TEXT,
    new_presentation_level INTEGER,
    new_override_level INTEGER,
    new_option_order INTEGER
) RETURNS SETOF system_options AS $$
BEGIN
    IF system_option_id IS NULL
    THEN RETURN QUERY
        INSERT INTO system_options(
            system_id,
            name,
            presentation_level,
            override_level,
            option_order
        )
        VALUES (
            system_id,
            new_name,
            new_presentation_level,
            new_override_level,
            new_option_order
        )
        RETURNING *;
    ELSE RETURN QUERY
        UPDATE system_options SET
            name = CASE
                WHEN new_name IS NOT NULL
                    THEN new_name
                ELSE system_options.name END,
            presentation_level = CASE
                WHEN new_presentation_level IS NOT NULL
                    THEN new_presentation_level
                ELSE system_options.presentation_level END,
            override_level = CASE
                WHEN new_override_level IS NOT NULL
                    THEN new_override_level
                ELSE system_options.override_level END,
            option_order = CASE
                WHEN new_option_order IS NOT NULL
                    THEN new_option_order
                ELSE system_options.option_order END
        WHERE system_options.id = system_option_id
        RETURNING *;
    END IF;
END;
$$ LANGUAGE plpgsql;
