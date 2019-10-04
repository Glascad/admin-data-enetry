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
BEGIN

    -- option values must not have duplicate kinds of children

    <<LOOP
        TYPE (system, detail)
        CHILD (detail, configuration)
    >>

        -- get all option values
        FOR ov IN SELECT * FROM <<TYPE>>_option_values LOOP
            IF EXISTS (
                SELECT * FROM <<TYPE>>_options o
                WHERE o.parent_<<TYPE>>_option_value_path = ov.path
            ) AND EXISTS (
                SELECT * FROM system_<<CHILD>>s st
                WHERE st.parent_<<TYPE>>_option_value_path = ov.path
            ) THEN
                RAISE EXCEPTION 'Option value % contains both recursive <<TYPE>> option and system <<CHILD>>', ov.path::TEXT;
            END IF;
        END LOOP;
        -- get option children and type children of option value
        -- raise exception if both exist

    <<END LOOP>>

    -- all grouped options must have same values

    -- get all option groups
    FOR og IN SELECT * FROM option_groups LOOP
        -- for each group
        -- select first option in group, and its values
        previous_path := NULL;
        previous_ovs := NULL;
        ovs := NULL;
        -- get all options in group
        -- SELECT detail_options and LOOP through
        -- then SELECT configuration_options and LOOP through



        <<LOOP
            TYPE (detail, configuration)
            ALIAS (d, c)
        >>
            FOR p IN SELECT path FROM <<TYPE>>_options o WHERE o.name = og.name AND o.path <@ og.system_option_value_path LOOP

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

        -- FOR p IN SELECT COALESCE(_do.path, co.path) AS path
        -- FROM detail_options _do
        -- FULL OUTER JOIN configuration_options co ON FALSE
        -- LOOP

        --     -- select into ovs
        --     -- SELECT...

        --     -- compare all other options values to first option
        --     IF COALESCE(previous_ovs, ovs) <> ovs THEN
        --     -- raise exception if any option has an extra value
        --     -- raise exception if any option is missing a value
        --         RAISE EXCEPTION 'Option with path...';
        --     END IF;

        --     previous_ovs := ovs;
        --     ovs := NULL;

        -- END LOOP;

    END LOOP;

    RETURN system;

END;
$$ LANGUAGE plpgsql;
