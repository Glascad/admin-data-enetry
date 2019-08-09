DROP FUNCTION IF EXISTS create_or_update_system_option;

CREATE OR REPLACE FUNCTION gc_protected.create_or_update_system_option (
    system_option entire_system_option,
    system_id INTEGER
) RETURNS SYSTEM_OPTIONS AS $$
DECLARE
    so ALIAS FOR system_option;
    sid INTEGER = CASE WHEN so.system_id IS NOT NULL
        THEN so.system_id
        ELSE system_id END;
    uso system_options%ROWTYPE;
BEGIN

    IF so.name IS NULL THEN RAISE EXCEPTION 'System Option `name` cannot be NULL';
    END IF;

    -- IF so.id IS NULL THEN
        INSERT INTO system_options(
            system_id,
            name
            -- presentation_level,
            -- override_level,
            -- option_order
        )
        VALUES (
            sid,
            so.name
            -- so.presentation_level,
            -- so.override_level,
            -- so.option_order
        )
        ON CONFLICT DO NOTHING
        RETURNING * INTO uso;
    -- ELSE RETURN QUERY
    --     UPDATE system_options SET
    --         -- name = CASE
    --         --     WHEN so.name IS NOT NULL
    --         --         THEN so.name
    --         --     ELSE system_options.name END
    --         -- presentation_level = CASE
    --         --     WHEN so.presentation_level IS NOT NULL
    --         --         THEN so.presentation_level
    --         --     ELSE system_options.presentation_level END,
    --         -- override_level = CASE
    --         --     WHEN so.override_level IS NOT NULL
    --         --         THEN so.override_level
    --         --     ELSE system_options.override_level END,
    --         -- option_order = CASE
    --         --     WHEN so.option_order IS NOT NULL
    --         --         THEN so.option_order
    --         --     ELSE system_options.option_order END
    --     WHERE system_options.system_id = sid
    --     AND system_options.name = so.name
    --     RETURNING *;
    -- END IF;

    RETURN uso;

END;
$$ LANGUAGE plpgsql;
