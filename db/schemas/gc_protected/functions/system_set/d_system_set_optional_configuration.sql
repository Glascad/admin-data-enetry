DROP FUNCTION IF EXISTS delete_system_set_optional_configuration;

CREATE OR REPLACE FUNCTION gc_protected.delete_system_set_optional_configuration(
    detail_configuration DETAIL_CONFIGURATION_PAIR,
    system_set SYSTEM_SETS
) RETURNS SYSTEM_SET_CONFIGURATIONS AS $$
DECLARE
    dc ALIAS FOR detail_configuration;
    ss ALIAS FOR system_set;
    dssc SYSTEM_SET_CONFIGURATIONS;
BEGIN

    DELETE FROM system_set_configurations ssc
    WHERE ssc.system_set_id = ss.id
    AND ssc.detail_type = dc.detail_type
    AND ssc.configuration_type = dc.configuration_type
    RETURNING * INTO dssc;

    RETURN dssc;

END;
$$ LANGUAGE plpgsql;
