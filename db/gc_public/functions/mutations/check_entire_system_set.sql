
CREATE OR REPLACE FUNCTION gc_public.check_entire_system_set(system_set SYSTEM_SETS)
RETURNS SYSTEM_SETS AS $$
DECLARE
    ss ALIAS FOR system_set;
    comp RECORD;
BEGIN

    -- selected system subtree must be a terminal system option value

        -- check that child type of system option value is system_detail
        IF get_system_option_value_child_type(ss.system_option_value_path) <> 'system_detail' THEN
            RAISE EXCEPTION 'System set must reference terminal system option value but option % has more system options beneath it', ss.system_option_value_path;
        END IF;

        FOR comp IN (
            SELECT * FROM system_set_detail_option_values ssdov
            WHERE ssdov.system_set_id = ss.id
        ) LOOP

            IF get_detail_option_value_child_type(comp.detail_option_value_path) <> 'system_configuration' THEN
                RAISE EXCEPTION 'System set detail option value must reference terminal detail option value but option % has more detail options beneath it', comp.detail_option_value_path;
            END IF;

        END LOOP;

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
                RAISE EXCEPTION 'Option group %.% must is missing a selected value', comp.option_path, comp.option_name;
            END IF;

        END LOOP;

    -- all selected detail and configuration option values must be within the option group selection

        FOR comp IN (
            SELECT * FROM system_set_option_group_values ssogvs
            WHERE ssogvs.system_set_id = ss.id
        ) LOOP

            <<LOOP TYPE (detail, configuration)>>
                IF EXISTS (
                    SELECT * FROM system_set_<<TYPE>>_option_values ssov
                    WHERE ssov.system_set_id = ss.id
                    AND ssov.<<TYPE>>_option_value_path ~ ('*.' || comp.option_name || '.*')::LQUERY
                    AND NOT (ssov.<<TYPE>>_option_value_path ~ ('*.' || comp.option_name || '.' || comp.name || '.*')::LQUERY)
                ) THEN
                    RAISE EXCEPTION 'System set <<TYPE>> option value has wrong value selected for option group %.%', comp.option_name, comp.name;
                END IF;
            <<END LOOP>>

        END LOOP;

    -- all required system configurations have an option value selected

    
    
    RETURN system_set;

END;
$$ LANGUAGE plpgsql STABLE;
