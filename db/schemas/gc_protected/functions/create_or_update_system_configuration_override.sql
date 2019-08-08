DROP FUNCTION IF EXISTS create_or_update_system_configuration_override;

CREATE FUNCTION gc_protected.create_or_update_system_configuration_override(
    system_configuration_override entire_system_configuration_override,
    system_id INTEGER,
    system_type SYSTEM_TYPE
) RETURNS SETOF system_configuration_overrides AS $$
DECLARE
    sco ALIAS FOR system_configuration_override;
    sid INTEGER = CASE WHEN system_id IS NOT NULL
        THEN system_id
        ELSE sco.system_id END;
    st ALIAS FOR system_type;
    dt DETAIL_TYPE = sco.detail_type;
    ct CONFIGURATION_TYPE = sco.configuration_type;
BEGIN
    RETURN QUERY INSERT INTO system_configuration_overrides (
        system_id,
        system_type,
        detail_type,
        configuration_type,
        required_override
        -- mirrorable_override,
        -- presentation_level_override,
        -- override_level_override
    )
    VALUES (
        sid,
        st,
        sco.detail_type,
        sco.configuration_type,
        sco.required_override
        -- sco.mirrorable_override,
        -- sco.presentation_level_override,
        -- sco.override_level_override
    )
    ON CONFLICT (system_id, detail_type, configuration_type)
        DO UPDATE SET
            required_override = CASE
                WHEN EXCLUDED.required_override IS NOT NULL
                    THEN EXCLUDED.required_override
                ELSE system_configuration_overrides.required_override END
            -- mirrorable_override = CASE
            --     WHEN EXCLUDED.mirrorable_override IS NOT NULL
            --         THEN EXCLUDED.mirrorable_override
            --     ELSE system_configuration_overrides.mirrorable_override END,
            -- presentation_level_override = CASE
            --     WHEN EXCLUDED.presentation_level_override IS NOT NULL
            --         THEN EXCLUDED.presentation_level_override
            --     ELSE system_configuration_overrides.presentation_level_override END,
            -- override_level_override = CASE
            --     WHEN EXCLUDED.override_level_override IS NOT NULL
            --         THEN EXCLUDED.override_level_override
            --     ELSE system_configuration_overrides.override_level_override END
        WHERE system_configuration_overrides.system_id = sid
        AND system_configuration_overrides.system_type = st
        AND system_configuration_overrides.detail_type = dt
        AND system_configuration_overrides.configuration_type = ct
    RETURNING *;
END;
$$ LANGUAGE plpgsql;
