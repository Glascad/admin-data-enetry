DROP FUNCTION IF EXISTS create_or_update_configuration_override;

CREATE OR REPLACE FUNCTION create_or_update_configuration_override(
    system_configuration_override entire_system_configuration_override,
    _system_id INTEGER,
    _system_type_id INTEGER
) RETURNS SETOF system_configuration_overrides AS $$
DECLARE
    sco ALIAS FOR system_configuration_override;
    sid INTEGER = CASE WHEN _system_id IS NOT NULL
        THEN _system_id
        ELSE sco.system_id END;
    stid INTEGER = CASE WHEN _system_type_id IS NOT NULL
        THEN _system_type_id
        ELSE sco.system_type_id END;
    did INTEGER = sco.detail_type_id;
    cid INTEGER = sco.configuration_type_id;
BEGIN
    RETURN QUERY INSERT INTO system_configuration_overrides (
        system_id,
        system_type_id,
        detail_type_id,
        configuration_type_id,
        required_override,
        mirrorable_override,
        presentation_level_override,
        override_level_override
    )
    VALUES (
        sid,
        stid,
        sco.detail_type_id,
        sco.configuration_type_id,
        sco.required_override,
        sco.mirrorable_override,
        sco.presentation_level_override,
        sco.override_level_override
    )
    ON CONFLICT (system_id, detail_type_id, configuration_type_id)
        DO UPDATE SET
            required_override = CASE
                WHEN EXCLUDED.required_override IS NOT NULL
                    THEN EXCLUDED.required_override
                ELSE system_configuration_overrides.required_override END,
            mirrorable_override = CASE
                WHEN EXCLUDED.mirrorable_override IS NOT NULL
                    THEN EXCLUDED.mirrorable_override
                ELSE system_configuration_overrides.mirrorable_override END,
            presentation_level_override = CASE
                WHEN EXCLUDED.presentation_level_override IS NOT NULL
                    THEN EXCLUDED.presentation_level_override
                ELSE system_configuration_overrides.presentation_level_override END,
            override_level_override = CASE
                WHEN EXCLUDED.override_level_override IS NOT NULL
                    THEN EXCLUDED.override_level_override
                ELSE system_configuration_overrides.override_level_override END
        WHERE system_configuration_overrides.system_id = sid
        AND system_configuration_overrides.system_type_id = stid
        AND system_configuration_overrides.detail_type_id = did
        AND system_configuration_overrides.configuration_type_id = cid
    RETURNING *;
END;
$$ LANGUAGE plpgsql;
