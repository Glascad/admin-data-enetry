-- DROP FUNCTION IF EXISTS delete_entire_system_configuration_type;

-- CREATE OR REPLACE FUNCTION gc_protected.delete_entire_system_configuration_type(system_configuration_type_id INTEGER)
-- RETURNS INTEGER AS $$
-- DECLARE
--     sctid ALIAS FOR system_configuration_type_id;
-- BEGIN

--     -- options
--     SELECT delete_entire_configuration_option(id) FROM configuration_options co
--     WHERE co.system_configuration_type_id = sctid;

--     -- configuration type
--     DELETE FROM system_configuration_types sct
--     WHERE sct.id = sctid;

--     RETURN sctid;
-- END;
-- $$ LANGUAGE plpgsql;
