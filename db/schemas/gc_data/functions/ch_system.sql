DROP FUNCTION IF EXISTS check_entire_system;

CREATE OR REPLACE FUNCTION gc_data.check_entire_system(system SYSTEMS)
RETURNS SYSTEMS AS $$
DECLARE
    s ALIAS FOR system;
    ov RECORD;
    og RECORD;
    p LTREE;
    d OPTION_VALUE_NAME;
    previous_path LTREE;
    ovs OPTION_VALUE_NAME[];
    previous_ovs OPTION_VALUE_NAME[];
    previous_default OPTION_VALUE_NAME;
    ___ TEXT[];
BEGIN

    -- option values must not have duplicate kinds of children

    SELECT ARRAY_AGG(get_system_child_type(t.id::TEXT::LTREE)) FROM systems t INTO ___ WHERE t.id = s.id;

    <<LOOP 
        TYPE (
            system_option_value,
            detail_option_value,
            system_detail,
            detail_configuration
        )
    >>

        -- this function throws an error if there are duplicate child types
        SELECT ARRAY_AGG(get_<<TYPE>>_child_type(t.path))
        FROM <<TYPE>>s t
        INTO ___
        WHERE t.system_id = s.id;

    <<END LOOP>>

    -- all grouped options must have same values

    FOR og IN (
        SELECT * FROM option_groups
        WHERE option_groups.system_id = s.id
    ) LOOP
        previous_path := NULL;
        previous_ovs := NULL;
        previous_default := NULL;
        ovs := NULL;

        <<LOOP
            TYPE (detail, configuration)
            ALIAS (d, c)
        >>
            FOR p, d IN (
                SELECT path, default_<<TYPE>>_option_value
                FROM <<TYPE>>_options o
                WHERE o.name = og.name
                AND o.system_id = og.system_id
                ORDER BY path, default_<<TYPE>>_option_value
            ) LOOP

                -- get all values
                SELECT ARRAY_AGG(tov.name)
                FROM <<TYPE>>_option_values tov
                INTO ovs
                WHERE tov.parent_<<TYPE>>_option_path = p;

                -- compare against previous values
                IF previous_ovs IS NOT NULL AND previous_ovs <> ovs THEN
                    RAISE EXCEPTION 'Grouped <<TYPE>> option % has mismatching option values: % with values %, and % with values %', og.name, previous_path, previous_ovs, p, ovs;
                ELSIF previous_default IS NOT NULL AND previous_default <> d THEN
                    RAISE EXCEPTION 'Grouped <<TYPE>> option % has mismatching option defaults: % with default %, and % with default %', og.name, previous_path, previous_default, p, d;
                END IF;

                previous_path := p;
                previous_ovs := ovs;
                previous_default := d;

            END LOOP;
        <<END LOOP>>

    END LOOP;

    RETURN system;

END;
$$ LANGUAGE plpgsql STABLE;
