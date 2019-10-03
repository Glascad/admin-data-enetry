
-- -- update values when an option is added to a group

-- CREATE OR REPLACE FUNCTION gc_protected.check_option_group_values()
-- RETURNS TRIGGER AS $$
-- DECLARE
--     oid INTEGER := COALESCE(NEW.id, OLD.id);
--     ogid INTEGER := NEW.option_group_id;
--     -- other option id
--     ooid INTEGER;
--     ovs OPTION_VALUE_NAME[];
--     oovs OPTION_VALUE_NAME[];
--     missing OPTION_VALUE_NAME;
--     extra OPTION_VALUE_NAME;
-- BEGIN

--     IF ogid IS NOT NULL THEN

--         -- get another option that matches the same group
--         SELECT _do.id FROM detail_options _do
--         INTO ooid
--         WHERE _do.option_group_id = ogid
--         AND _do.id <> oid
--         LIMIT 1;

--         IF ooid IS NOT NULL THEN

--             -- get values of current option
--             SELECT ARRAY_AGG(name ORDER BY name) FROM detail_option_values sov
--             INTO ovs
--             WHERE sov.parent_detail_option_id = oid;

--             -- get values of other option
--             SELECT ARRAY_AGG(name ORDER BY name) FROM detail_option_values sov
--             INTO oovs
--             WHERE sov.parent_detail_option_id = ooid;

--             IF ovs <> oovs THEN

--                 -- get extra option value name
--                 SELECT vn FROM UNNEST(ovs) vn
--                 INTO extra
--                 WHERE vn NOT IN (
--                     SELECT ovn FROM UNNEST(oovs) ovn
--                 )
--                 LIMIT 1;

--                 -- get missing option value name
--                 SELECT ovn FROM UNNEST(oovs) ovn
--                 INTO missing
--                 WHERE ovn NOT IN (
--                     SELECT vn FROM UNNEST(ovs) vn
--                 )
--                 LIMIT 1;

--                 IF extra IS NOT NULL THEN
--                     RAISE EXCEPTION 'Detail option % cannot be added to option group % because it contains an extra value %', oid, ogid, extra;
--                 END IF;

--                 IF missing IS NOT NULL THEN
--                     RAISE EXCEPTION 'Detail option % cannot be added to option group % because it is missing value %', oid, ogid, missing;
--                 END IF;

--             END IF;

--         END IF;

--     END IF;

-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION gc_protected.update_detail_option_group_values()
-- RETURNS TRIGGER AS $$
-- DECLARE
-- BEGIN

--     IF ogid THEN

--         UPDATE detail_option_values sov SET
--             option_group_id = ogid
--         WHERE sov.parent_detail_option_path = COALESCE(
--             NEW.path,
--             OLD.path
--         );

--     END IF;

--     RETURN NEW;

-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE TRIGGER update_detail_option_group_values
-- AFTER UPDATE ON detail_options
-- FOR EACH ROW EXECUTE FUNCTION update_detail_option_group_values();
