-- DROP FUNCTION IF EXISTS delete_entire_configuration_option;

-- CREATE OR REPLACE FUNCTION gc_protected.delete_entire_configuration_option(configuration_option_id INTEGER)
-- RETURNS INTEGER AS $$
-- DECLARE
--     coid ALIAS FOR configuration_option_id;
-- BEGIN

--     -- option values
--     DELETE FROM configuration_option_values cov
--     WHERE cov.configuration_option_id = coid;

--     -- option
--     DELETE FROM configuration_options
--     WHERE id = coid;

--     RETURN coid;
-- END;
-- $$ LANGUAGE plpgsql;
