-- DROP FUNCTION IF EXISTS update_entire_system_option;

-- CREATE OR REPLACE FUNCTION gc_protected.update_entire_system_option (
--     system_option entire_system_option,
--     system_id INTEGER
-- ) RETURNS SYSTEM_OPTIONS AS $$
-- DECLARE
--     -- OPTION
--     so ALIAS FOR system_option;
--     sid INTEGER = CASE WHEN system_id IS NOT NULL
--         THEN system_id
--         ELSE so.system_id END;
--     -- LOOP
--     ov OPTION_VALUE_NAME;
--     ___ INTEGER;
--     -- OUT
--     uso system_options%ROWTYPE;
-- BEGIN
--     SELECT * FROM create_or_update_system_option(so, sid) INTO uso;

--     -- OPTION VALUES
--     IF so.option_values IS NOT NULL THEN
--         FOREACH ov IN ARRAY so.option_values
--         LOOP
--             SELECT 1 FROM create_or_update_option_value(ov, uso.name, sid) INTO ___;
--         END LOOP;
--     END IF;

--     DELETE FROM option_values _ov
--         WHERE _ov.option_name = uso.name
--         AND _ov.system_id = sid
--         AND name IN (
--             SELECT * FROM UNNEST (so.option_values_to_delete)
--         );

--     -- -- CONFIGURATION TYPES
--     -- INSERT INTO system_option_configuration_types (
--     --     system_option,
--     --     configuration_type_id
--     -- )
--     -- SELECT
--     --     uso.name AS option_name,
--     --     ct AS configuration_type_id
--     -- FROM UNNEST (so.configuration_type_ids) ct;

--     -- DELETE FROM system_option_configuration_types
--     --     WHERE system_option = uso.name
--     --     AND configuration_type_id IN (
--     --         SELECT * FROM UNNEST (so.configuration_type_ids_to_delete)
--     --     );

--     RETURN uso;
-- END;
-- $$ LANGUAGE plpgsql;
