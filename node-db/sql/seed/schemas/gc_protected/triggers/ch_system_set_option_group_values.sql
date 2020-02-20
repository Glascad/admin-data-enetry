DROP FUNCTION IF EXISTS check_system_set_option_group_value;

CREATE OR REPLACE FUNCTION gc_public.check_system_set_option_group_value()
RETURNS TRIGGER AS $$
DECLARE
    ssid INTEGER := COALESCE(NEW.system_set_id, OLD.system_set_id);
    o OPTION_NAME := COALESCE(NEW.option_name, OLD.option_name);
    v OPTION_VALUE_NAME := COALESCE(NEW.name, OLD.name);
    paths LTREE[];
    p LTREE;
    ___ INTEGER;
BEGIN

    <<LOOP TYPE (detail, configuration)>>
    
        SELECT ARRAY_AGG(<<TYPE>>_option_value_path) FROM system_set_<<TYPE>>s sst
        INTO paths
        WHERE sst.system_set_id = ssid;

        IF paths IS NOT NULL THEN
            FOREACH p IN ARRAY paths LOOP

                IF path_contains_option_group_value(p, o, v) = FALSE THEN

                    RAISE EXCEPTION 'Cannot insert or update option group value %: % in system set %, does not match <<TYPE>> path %', o, v, ssid, p;

                END IF;

            END LOOP;
        END IF;

        paths := NULL;

    <<END LOOP>>

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER check_system_set_option_group_value
AFTER INSERT OR UPDATE OF name ON system_set_option_group_values
INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION check_system_set_option_group_value();



<<LOOP TYPE (detail, configuration)>>

    DROP FUNCTION IF EXISTS check_system_set_<<TYPE>>_option_group_values;

    CREATE OR REPLACE FUNCTION gc_public.check_system_set_<<TYPE>>_option_group_values()
    RETURNS TRIGGER AS $$
    DECLARE
        ssid INTEGER := COALESCE(NEW.system_set_id, OLD.system_set_id);
        path LTREE := COALESCE(NEW.<<TYPE>>_option_value_path, OLD.<<TYPE>>_option_value_path);
        ogvs OPTION_VALUE_PAIR[];
        ogv OPTION_VALUE_PAIR;
        ___ INTEGER;
    BEGIN

        IF path IS NOT NULL THEN

            SELECT ARRAY_AGG((option_name, name)::OPTION_VALUE_PAIR) FROM system_set_option_group_values ssogvs
            INTO ogvs
            WHERE ssogvs.system_set_id = ssid;

            IF ogvs IS NOT NULL THEN
                FOREACH ogv IN ARRAY ogvs LOOP

                    IF path_contains_option_group_value(path, ogv.option_name, ogv.name) = FALSE THEN

                        RAISE EXCEPTION '<<TYPE>> option value path % in system set % contains invalid value for option group % with selected value %', path, ssid, ogv.option_name, ogv.name;

                    END IF;

                END LOOP;
            END IF;

        END IF;

        RETURN NEW;

    END;
    $$ LANGUAGE plpgsql;

    CREATE CONSTRAINT TRIGGER check_system_set_<<TYPE>>_option_group_values
    AFTER INSERT OR UPDATE OF <<TYPE>>_option_value_path ON system_set_<<TYPE>>s
    INITIALLY DEFERRED
    FOR EACH ROW EXECUTE FUNCTION check_system_set_<<TYPE>>_option_group_values();

<<END LOOP>>
