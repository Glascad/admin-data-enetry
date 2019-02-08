DROP FUNCTION IF EXISTS delete_configuration_override;

CREATE OR REPLACE FUNCTION delete_configuration_override(
    system_configuration_override entire_system_configuration_override
) RETURNS SETOF system_configuration_overrides AS $$
DECLARE
    sco ALIAS FOR system_configuration_override;
BEGIN
    DELETE FROM system_configuration_overrides
    WHERE system_id = sco.system_id
    AND system_type_id = sco.system_type_id
    AND detail_type_id = sco.detail_type_id
    AND configuration_type_id = sco.configuration_type_id
    RETURNING *;
END;
$$ LANGUAGE plpgsql;
