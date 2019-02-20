DROP FUNCTION IF EXISTS delete_configuration_override;

CREATE OR REPLACE FUNCTION delete_configuration_override(
    system_configuration_override entire_system_configuration_override,
    system_id INTEGER,
    system_type_id INTEGER
) RETURNS SETOF system_configuration_overrides AS $$
DECLARE
    sco ALIAS FOR system_configuration_override;
    sid INTEGER = CASE WHEN system_id IS NOT NULL
        THEN system_id
        ELSE sco.system_id END;
    stid INTEGER = CASE WHEN system_type_id IS NOT NULL
        THEN system_type_id
        ELSE sco.system_type_id END;
BEGIN
    RETURN QUERY DELETE FROM system_configuration_overrides
    WHERE system_configuration_overrides.system_id = sid
    AND system_configuration_overrides.system_type_id = stid
    AND system_configuration_overrides.detail_type_id = sco.detail_type_id
    AND system_configuration_overrides.configuration_type_id = sco.configuration_type_id
    RETURNING *;
END;
$$ LANGUAGE plpgsql;
