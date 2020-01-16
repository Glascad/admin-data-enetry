

DROP FUNCTION IF EXISTS check_option_group_members;

CREATE OR REPLACE FUNCTION gc_protected.check_option_group_members(
    option_name OPTION_NAME,
    system_id INTEGER
) RETURNS BOOLEAN AS $$
DECLARE
    n ALIAS FOR option_name;
    sid ALIAS FOR system_id;
    p LTREE;
    d OPTION_VALUE_NAME;
    ovs OPTION_VALUE_NAME[];
    previous_path LTREE;
    previous_default OPTION_VALUE_NAME;
    previous_ovs OPTION_VALUE_NAME[];
    ___ INTEGER;
BEGIN

    <<LOOP
        TYPE (detail, configuration)
    >>
        FOR p, d IN (
            SELECT path, default_<<TYPE>>_option_value
            FROM <<TYPE>>_options o
            WHERE o.name = n
            AND o.system_id = sid
            ORDER BY path, default_<<TYPE>>_option_value
        ) LOOP

            -- get all values
            SELECT ARRAY_AGG(tov.name)
            FROM <<TYPE>>_option_values tov
            INTO ovs
            WHERE tov.parent_<<TYPE>>_option_path = p;

            -- compare against previous values
            IF previous_ovs IS NOT NULL AND previous_ovs <> ovs THEN
                RAISE EXCEPTION 'Grouped <<TYPE>> option % has mismatching option values: % with values %, and % with values %', n, previous_path, previous_ovs, p, ovs;
            ELSIF previous_default IS NOT NULL AND previous_default <> d THEN
                RAISE EXCEPTION 'Grouped <<TYPE>> option % has mismatching option defaults: % with default %, and % with default %', n, previous_path, previous_default, p, d;
            END IF;

            previous_path := p;
            previous_ovs := ovs;
            previous_default := d;

        END LOOP;
    <<END LOOP>>

    RETURN TRUE;

END;
$$ LANGUAGE plpgsql;


DROP FUNCTION IF EXISTS check_option_group_members_trigger;

CREATE OR REPLACE FUNCTION gc_protected.check_option_group_members_trigger()
RETURNS TRIGGER AS $$
DECLARE
    ___ INTEGER;
BEGIN

    SELECT 1 FROM check_option_group_members(
        COALESCE(NEW.name, OLD.name),
        COALESCE(NEW.system_id, OLD.system_id)
    ) INTO ___;

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER check_option_group_members_trigger
AFTER INSERT OR UPDATE OF name ON option_groups
INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION check_option_group_members_trigger();



<<LOOP
    TYPE (detail_option, configuration_option)
>>

    DROP FUNCTION IF EXISTS check_grouped_<<TYPE>>;

    CREATE OR REPLACE FUNCTION gc_protected.check_grouped_<<TYPE>>()
    RETURNS TRIGGER AS $$
    DECLARE
        sid INTEGER;
        ogn OPTION_NAME;
        ___ INTEGER;
    BEGIN

        sid := COALESCE(NEW.system_id, OLD.system_id);

        FOR ogn IN
            SELECT name FROM option_groups og WHERE og.system_id = sid
        LOOP

            SELECT 1 FROM check_option_group_members(ogn, sid) INTO ___;

        END LOOP;

        RETURN NEW;

    END;
    $$ LANGUAGE plpgsql;

    CREATE CONSTRAINT TRIGGER check_grouped_<<TYPE>>
    AFTER INSERT OR UPDATE OF name ON <<TYPE>>s
    INITIALLY DEFERRED
    FOR EACH ROW EXECUTE FUNCTION check_grouped_<<TYPE>>();

<<END LOOP>>
