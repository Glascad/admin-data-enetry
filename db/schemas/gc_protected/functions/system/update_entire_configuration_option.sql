DROP FUNCTION IF EXISTS update_entire_configuration_option;

CREATE OR REPLACE FUNCTION gc_protected.update_entire_configuration_option(configuration_option ENTIRE_CONFIGURATION_OPTION, id_map ENTIRE_SYSTEM_ID_MAP)
RETURNS CONFIGURATION_OPTIONS AS $$
DECLARE
BEGIN
END;
$$ LANGUAGE plpgsql;
