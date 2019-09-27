DROP FUNCTION IF EXISTS check_system_set_detail_option_value_groups;

CREATE OR REPLACE FUNCTION gc_protected.check_system_set_detail_option_value_groups()
RETURNS TRIGGER AS $$
DECLARE
    dov DETAIL_OPTION_VALUES;
    ogns OPTION_NAME[];
    ogn OPTION_NAME;
    ssogv OPTION_VALUE_NAME;
    p LTREE := COALESCE(NEW.detail_option_value_path, OLD.detail_option_value_path);
    sid INTEGER := subltree(p, 0, 1)::TEXT::INTEGER;
    ssid INTEGER := COALESCE(NEW.system_set_id, OLD.system_set_id);
BEGIN

    SELECT * FROM detail_option_values dovs
    INTO dov
    WHERE dovs.path = p;

    -- RAISE EXCEPTION 'dov option name is %, and value name is %', dov.option_name, dov.name;

    -- find all option groups that apply to dov
    SELECT ARRAY_AGG(name) FROM option_groups og
    INTO ogns
    -- must belong to same system
    WHERE og.system_id = sid
    -- must apply to same dov
    AND ('*.' || og.name || '.*')::LQUERY ~ p;

    -- RAISE EXCEPTION 'option group name is %', og.name;

    -- RAISE EXCEPTION 'matched % option groups', array_length(ogns, 1);

    IF ogns IS NOT NULL THEN
        FOREACH ogn IN ARRAY ogns LOOP

            -- RAISE NOTICE 'option group name is %', ogn;

            SELECT name FROM system_set_option_group_values ssogvs
            INTO ssogv
            WHERE ssogvs.system_set_id = ssid
            AND ssogvs.option_name = ogn;

            -- RAISE NOTICE 'selected option group value is %', ssogv;

            IF ssogv IS NULL THEN

                RAISE EXCEPTION 'Could not find system set option group value for option: %. Select option group value before selecting detail option value', ogn;

            ELSE

                IF ('*.' || ogn || '.' || ssogv || '.*')::LQUERY ~ p THEN
                    -- RAISE NOTICE 'detail option value fulfills selected option group';
                ELSE
                    RAISE EXCEPTION 'detail option value: % does not fulfill selected option group %: %', p, ogn, ssogv;
                END IF;

            END IF;

        END LOOP;

    END IF;

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_system_set_detail_option_value_groups
BEFORE INSERT OR UPDATE ON system_set_detail_option_values
FOR EACH ROW EXECUTE FUNCTION check_system_set_detail_option_value_groups();



CREATE OR REPLACE FUNCTION gc_protected.check_system_set_configuration_option_value_groups()
RETURNS TRIGGER AS $$
DECLARE
    cov DETAIL_OPTION_VALUES;
    ogns OPTION_NAME[];
    ogn OPTION_NAME;
    ssogv OPTION_VALUE_NAME;
    p LTREE := COALESCE(NEW.configuration_option_value_path, OLD.configuration_option_value_path);
    sid INTEGER := subltree(p, 0, 1)::TEXT::INTEGER;
    ssid INTEGER := COALESCE(NEW.system_set_id, OLD.system_set_id);
BEGIN

    SELECT * FROM configuration_option_values covs
    INTO cov
    WHERE covs.path = p;

    -- RAISE EXCEPTION 'cov option name is %, and value name is %', cov.option_name, cov.name;

    -- find all option groups that apply to cov
    SELECT ARRAY_AGG(name) FROM option_groups og
    INTO ogns
    -- must belong to same system
    WHERE og.system_id = sid
    -- must apply to same cov
    AND ('*.' || og.name || '.*')::LQUERY ~ p;

    -- RAISE EXCEPTION 'option group name is %', og.name;

    -- RAISE EXCEPTION 'matched % option groups', array_length(ogns, 1);

    IF ogns IS NOT NULL THEN
        FOREACH ogn IN ARRAY ogns LOOP

            -- RAISE NOTICE 'option group name is %', ogn;

            SELECT name FROM system_set_option_group_values ssogvs
            INTO ssogv
            WHERE ssogvs.system_set_id = ssid
            AND ssogvs.option_name = ogn;

            -- RAISE NOTICE 'selected option group value is %', ssogv;

            IF ssogv IS NULL THEN

                RAISE EXCEPTION 'Could not find system set option group value for option: %. Select option group value before selecting configuration option value', ogn;

            ELSE

                IF ('*.' || ogn || '.' || ssogv || '.*')::LQUERY ~ p THEN
                    -- RAISE NOTICE 'configuration option value fulfills selected option group';
                ELSE
                    RAISE EXCEPTION 'configuration option value: % does not fulfill selected option group %: %', p, ogn, ssogv;
                END IF;

            END IF;

        END LOOP;

    END IF;

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_system_set_configuration_option_value_groups
BEFORE INSERT OR UPDATE ON system_set_configuration_option_values
FOR EACH ROW EXECUTE FUNCTION check_system_set_configuration_option_value_groups();
