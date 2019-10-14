
CREATE OR REPLACE FUNCTION gc_public.check_entire_system_set(system_set SYSTEM_SETS)
RETURNS SYSTEM_SETS AS $$
DECLARE
    ss ALIAS FOR system_set;
    comp RECORD;
    other_comp RECORD;
BEGIN

    -- selected system subtree must be a terminal system option value

        -- check that child type of system option value is system_detail
        IF get_system_option_value_child_type(ss.system_option_value_path) <> 'system_detail' THEN
            RAISE EXCEPTION 'System set must reference terminal system option value but option % has more system options beneath it', ss.system_option_value_path;
        END IF;

        <<LOOP 
            TYPE (detail, configuration)
            CHILD_TYPE ('system_configuration', 'configuration_part')
        >>

            FOR comp IN (
                SELECT * FROM system_set_<<TYPE>>_option_values ssdov
                WHERE ssdov.system_set_id = ss.id
            ) LOOP

                IF get_<<TYPE>>_option_value_child_type(comp.<<TYPE>>_option_value_path) <> <<CHILD_TYPE>> THEN
                    RAISE EXCEPTION 'System set <<TYPE>> option value must reference terminal <<TYPE>> option value but option % has more <<TYPE>> options beneath it', comp.<<TYPE>>_option_value_path;
                END IF;

            END LOOP;

        <<END LOOP>>

    -- all option groups from the selected system subtree must have a corresponding option group value

        FOR comp IN (
            SELECT ssogvs.name AS selected_value, ogs.system_option_value_path AS option_path, ogs.name AS option_name
            FROM option_groups ogs
            FULL OUTER JOIN system_set_option_group_values ssogvs
            ON ssogvs.option_group_system_option_value_path = ogs.system_option_value_path
            AND ssogvs.option_name = ogs.name
            WHERE ogs.system_option_value_path = ss.system_option_value_path
            OR ogs.system_option_value_path @> ss.system_option_value_path
        ) LOOP

            IF comp.selected_value IS NULL THEN
                RAISE EXCEPTION 'Missing a selected value for option group %.% ', comp.option_path, comp.option_name;
            END IF;

        END LOOP;

    -- all selected detail and configuration option values must be within the option group selection

        FOR comp IN (
            SELECT * FROM system_set_option_group_values ssogvs
            WHERE ssogvs.system_set_id = ss.id
        ) LOOP

            <<LOOP TYPE (detail, configuration)>>
                FOR other_comp IN (
                    SELECT * FROM system_set_<<TYPE>>_option_values ssov
                    WHERE ssov.system_set_id = ss.id
                    AND ssov.<<TYPE>>_option_value_path ~ ('*.' || comp.option_name || '.*')::LQUERY
                    AND NOT (ssov.<<TYPE>>_option_value_path ~ ('*.' || comp.option_name || '.' || comp.name || '.*')::LQUERY)
                ) LOOP
                    RAISE EXCEPTION 'System set <<TYPE>> option value % has wrong value selected for option group %.%', other_comp.<<TYPE>>_option_value_path, comp.option_name, comp.name;
                END LOOP;
            <<END LOOP>>

        END LOOP;

    -- all system details and required system configurations have an option value selected

        -- select all system details within selected system option value that don't have a corresponding ssdov but that do have option values to select from
        FOR comp IN (
            -- select all system details
            SELECT * FROM system_details sd
            -- within the selected system option value
            WHERE sd.parent_system_option_value_path = ss.system_option_value_path
            -- that have options to select from,
            AND EXISTS (
                SELECT * FROM detail_options _do
                WHERE _do.parent_system_detail_path = sd.path
            )
            -- but that don't have a corresponding ssdov
            AND NOT EXISTS (
                SELECT * FROM system_set_detail_option_values ssdov
                WHERE get_detail_type_from_path(ssdov.detail_option_value_path) = sd.detail_type
            )
        ) LOOP

            RAISE EXCEPTION 'Missing system set detail option value for system detail %', comp.path;

        END LOOP;

        FOR comp IN (
            -- select all system configurations
            SELECT * FROM system_configurations sc
            -- that are non-optional,
            WHERE sc.optional = FALSE
            -- within selected detail option values,
            AND sc.parent_detail_option_value_path IN (
                SELECT detail_option_value_path FROM system_set_detail_option_values ssdov
                WHERE ssdov.system_set_id = ss.id
            )
            -- that do have options to select from,
            AND EXISTS (
                SELECT * FROM configuration_options co
                WHERE co.parent_system_configuration_path = sc.path
            )
            -- but that don't have a corresponding sscov
            AND NOT EXISTS (
                SELECT * FROM system_set_configuration_option_values sscov
                WHERE get_configuration_type_from_path(sscov.configuration_option_value_path) = sc.configuration_type
            )
        ) LOOP

            RAISE EXCEPTION 'Missing system set configuration option value for system configuration %', comp.path;

        END LOOP;
    
    RETURN ss;

END;
$$ LANGUAGE plpgsql STABLE;
