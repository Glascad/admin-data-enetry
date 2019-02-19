DROP FUNCTION IF EXISTS delete_configuration_override;

CREATE OR REPLACE FUNCTION delete_configuration_override(
    system_configuration_override entire_system_configuration_override,
    system entire_system
) RETURNS SETOF system_configuration_overrides AS $$
DECLARE
    s ALIAS FOR system;
    sco ALIAS FOR system_configuration_override;
    sid INTEGER = CASE WHEN s IS NOT NULL
        THEN s.id
        ELSE sco.system_id END;
    stid INTEGER = CASE WHEN s IS NOT NULL
        THEN s.system_type_id
        ELSE sco.system_type_id END;
BEGIN
    DELETE FROM system_configuration_overrides
    WHERE system_id = sid
    AND system_type_id = stid
    AND detail_type_id = sco.detail_type_id
    AND configuration_type_id = sco.configuration_type_id
    RETURNING *;
END;
$$ LANGUAGE plpgsql;
