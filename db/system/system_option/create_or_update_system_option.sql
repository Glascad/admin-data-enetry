DROP FUNCTION IF EXISTS create_or_update_system_option;

CREATE OR REPLACE FUNCTION create_or_update_system_option (
    entire_system_option entire_system_option,
    system_id INTEGER
) RETURNS SETOF system_options AS $$
DECLARE
    eso ALIAS FOR entire_system_option;
    sid INTEGER = CASE WHEN eso.system_id IS NOT NULL
        THEN eso.system_id
        ELSE system_id END;
BEGIN
    IF eso.id IS NULL
    THEN RETURN QUERY
        INSERT INTO system_options(
            system_id,
            name,
            presentation_level,
            override_level,
            option_order
        )
        VALUES (
            sid,
            eso.name,
            eso.presentation_level,
            eso.override_level,
            eso.option_order
        )
        RETURNING *;
    ELSE RETURN QUERY
        UPDATE system_options SET
            name = CASE
                WHEN eso.name IS NOT NULL
                    THEN eso.name
                ELSE system_options.name END,
            presentation_level = CASE
                WHEN eso.presentation_level IS NOT NULL
                    THEN eso.presentation_level
                ELSE system_options.presentation_level END,
            override_level = CASE
                WHEN eso.override_level IS NOT NULL
                    THEN eso.override_level
                ELSE system_options.override_level END,
            option_order = CASE
                WHEN eso.option_order IS NOT NULL
                    THEN eso.option_order
                ELSE system_options.option_order END
        WHERE system_options.system_id = sid
        AND system_options.id = system_option_id
        RETURNING *;
    END IF;
END;
$$ LANGUAGE plpgsql;
