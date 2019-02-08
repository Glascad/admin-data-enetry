DROP FUNCTION IF EXISTS create_or_update_configuration_override;

CREATE OR REPLACE FUNCTION create_or_update_configuration_override(
    system_configuration_override entire_system_configuration_override
) RETURNS SETOF system_configuration_overrides AS $$
DECLARE
    sco ALIAS FOR system_configuration_override;
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
        sco.system_id,
        sco.system_type_id,
        sco.detail_type_id,
        sco.configuration_type_id,
        sco.required_override,
        sco.mirrorable_override,
        sco.presentation_level_override,
        sco.override_level_override
    )
    ON CONFLICT (system_id, system_type_id, detail_type_id, configuration_type_id)
        DO UPDATE SET
            system_id = CASE
                WHEN sco.system_id IS NOT NULL
                    THEN sco.system_id
                ELSE system_configuration_overrides.system_id END,
            system_type_id = CASE
                WHEN sco.system_type_id IS NOT NULL
                    THEN sco.system_type_id
                ELSE system_configuration_overrides.system_type_id END,
            detail_type_id = CASE
                WHEN sco.detail_type_id IS NOT NULL
                    THEN sco.detail_type_id
                ELSE system_configuration_overrides.detail_type_id END,
            configuration_type_id = CASE
                WHEN sco.configuration_type_id IS NOT NULL
                    THEN sco.configuration_type_id
                ELSE system_configuration_overrides.configuration_type_id END,
            required_override = CASE
                WHEN sco.required_override IS NOT NULL
                    THEN sco.required_override
                ELSE system_configuration_overrides.required_override END,
            mirrorable_override = CASE
                WHEN sco.mirrorable_override IS NOT NULL
                    THEN sco.mirrorable_override
                ELSE system_configuration_overrides.mirrorable_override END,
            presentation_level_override = CASE
                WHEN sco.presentation_level_override IS NOT NULL
                    THEN sco.presentation_level_override
                ELSE system_configuration_overrides.presentation_level_override END,
            override_level_override = CASE
                WHEN sco.override_level_override IS NOT NULL
                    THEN sco.override_level_override
                ELSE system_configuration_overrides.override_level_override END
    RETURNING *;
END;
$$ LANGUAGE plpgsql;
