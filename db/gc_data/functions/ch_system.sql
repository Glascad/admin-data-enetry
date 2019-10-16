DROP FUNCTION IF EXISTS check_entire_system;

CREATE OR REPLACE FUNCTION gc_data.check_entire_system(system SYSTEMS)
RETURNS SYSTEMS AS $$
DECLARE
    s ALIAS FOR system;
    ov RECORD;
    og RECORD;
    p LTREE;
    previous_path LTREE;
    ovs OPTION_VALUE_NAME[];
    previous_ovs OPTION_VALUE_NAME[];
    ___ TEXT[];
BEGIN

    -- option values must not have duplicate kinds of children

    <<LOOP TYPE (system, detail)>>

        SELECT ARRAY_AGG(get_<<TYPE>>_option_value_child_type(tov.path))
        FROM <<TYPE>>_option_values tov
        INTO ___
        WHERE tov.system_id = s.id;

    <<END LOOP>>

    -- all grouped options must have same values

    FOR og IN SELECT * FROM option_groups LOOP
        previous_path := NULL;
        previous_ovs := NULL;
        ovs := NULL;

        <<LOOP
            TYPE (detail, configuration)
            ALIAS (d, c)
        >>
            FOR p IN SELECT path FROM <<TYPE>>_options o WHERE o.name = og.name AND o.system_id = og.system_id LOOP

                SELECT ARRAY_AGG(tov.name)
                FROM <<TYPE>>_option_values tov
                INTO ovs
                WHERE tov.parent_<<TYPE>>_option_path = p;

                IF previous_ovs IS NOT NULL AND previous_ovs <> ovs THEN
                    RAISE EXCEPTION 'Grouped <<TYPE>> option % has mismatching options: % with values %, and % with values %', og.name, previous_path, previous_ovs, p, ovs;
                END IF;

                previous_path := p;
                previous_ovs := ovs;

            END LOOP;
        <<END LOOP>>

    END LOOP;

    RETURN system;

END;
$$ LANGUAGE plpgsql STABLE;
