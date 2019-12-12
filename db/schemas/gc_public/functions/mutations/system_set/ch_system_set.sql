
CREATE OR REPLACE FUNCTION gc_public.check_entire_system_set(system_set SYSTEM_SETS)
RETURNS SYSTEM_SETS AS $$
DECLARE
    ss ALIAS FOR system_set;
    comp RECORD;
    other_comp RECORD;
    spath LTREE;
    dpath LTREE;
    dpaths LTREE[];
    cpath LTREE;
    cpaths LTREE[];
    child_type TEXT;
    dts DETAIL_TYPE[];
    dtcts DETAIL_CONFIGURATION_PAIR[];
    option_groups OPTION_VALUE_PAIR[];
    ___ INTEGER;
BEGIN

    -- gather data
        
        -- selected sov
        spath := CASE WHEN ss.system_option_value_path IS NULL THEN
            ss.system_id::TEXT::LTREE ELSE
            ss.system_option_value_path END;

        -- selected dovs
        SELECT ARRAY_AGG(
            COALESCE(
                system_detail_path,
                detail_option_value_path
            )
        )
        FROM system_set_details ssd
        INTO dpaths
        WHERE ssd.system_set_id = ss.id;

        -- selected covs
        SELECT ARRAY_AGG(
            COALESCE(
                detail_configuration_path,
                configuration_option_value_path
            )
        )
        FROM system_set_configurations ssc
        INTO cpaths
        WHERE ssc.system_set_id = ss.id;

        -- selected ogvs
        SELECT ARRAY_AGG((option_name, name)::OPTION_VALUE_PAIR)
        FROM system_set_option_group_values ssogvs
        INTO option_groups
        WHERE ssogvs.system_set_id = ss.id;

        -- required sds
        SELECT ARRAY_AGG(detail_type)
        FROM system_details
        INTO dts
        WHERE path <@ spath;

        -- required dcs
        SELECT ARRAY_AGG((
            get_detail_type_from_path(path),
            get_configuration_type_from_path(path)
        )::DETAIL_CONFIGURATION_PAIR)
        FROM detail_configurations
        INTO dtcts
        WHERE path <@ dpaths
        AND optional = FALSE;

        -- optional dcs
        SELECT ARRAY_AGG((
            get_detail_type_from_path(path),
            get_configuration_type_from_path(path)
        )::DETAIL_CONFIGURATION_PAIR)
        FROM detail_configurations
        INTO dtcts
        WHERE path <@ dpaths
        AND optional = TRUE;

    -- selected option values must be terminal

        child_type := CASE WHEN ss.system_option_value_path IS NULL THEN
            get_system_child_type(spath) ELSE
            get_system_option_value_child_type(spath) END;

        -- check that child type of system selection is system_detail
        IF child_type <> 'system_detail' THEN

            RAISE EXCEPTION 'System set must reference terminal system option value but option % has more system options beneath it', ss.system_option_value_path;

        END IF;

        -- check details
        FOR comp IN (
            SELECT * FROM system_set_details ssd
            WHERE ssd.system_set_id = ss.id
        ) LOOP

            dpath := COALESCE(
                comp.system_detail_path,
                comp.detail_option_value_path
            );

            dpaths := dpaths || dpath;

            child_type := CASE WHEN comp.detail_option_value_path IS NULL THEN
                get_system_detail_child_type(dpath) ELSE
                get_detail_option_value_child_type(dpath) END;

            -- check that detail is within system
            IF NOT (spath @> dpath) THEN

                RAISE EXCEPTION 'Detail path `%` is not within system path `%`', dpath, spath;

            END IF;

            -- check that detail is terminal
            IF child_type <> 'detail_configuration' THEN

                RAISE EXCEPTION 'System set detail option value must reference terminal detail option value but option % has more detail options beneath it', dpath;

            END IF;

            -- check that detail has correct grouped option values
            SELECT 1 FROM check_system_set_path_grouped_option_values(dpath, option_groups) INTO ___;

        END LOOP;
        
        -- check configurations
        FOR comp IN (
            SELECT * FROM system_set_configurations ssd
            WHERE ssd.system_set_id = ss.id
        ) LOOP

            cpath := COALESCE(
                comp.detail_configuration_path,
                comp.configuration_option_value_path
            );

            cpaths := cpaths || cpath;

            child_type := CASE WHEN comp.configuration_option_value_path IS NULL THEN
                get_detail_configuration_child_type(cpath) ELSE
                get_configuration_option_value_child_type(cpath) END;

            -- check that configuration is within detail
            IF NOT (dpaths @> cpath) THEN

                RAISE EXCEPTION 'Configuration path `%` is not within any detail paths `%`', cpath, dpaths;

            END IF;

            -- check that configuration is terminal
            IF child_type <> 'configuration_part' THEN

                RAISE EXCEPTION 'System set configuration option value must reference terminal configuration option value but option % has more configuration options beneath it', cpath;

            END IF;

            -- check that grouped option values are satisfied
            SELECT 1 FROM check_system_set_path_grouped_option_values(cpath, option_groups) INTO ___;

        END LOOP;

    -- all option groups from the selected system subtree must have a corresponding option group value
        FOR comp IN (
            SELECT ssogvs.name AS selected_value, ogs.name AS option_name
            FROM option_groups ogs
            FULL OUTER JOIN system_set_option_group_values ssogvs
            ON ssogvs.system_id = ogs.system_id
            AND ssogvs.option_name = ogs.name
            WHERE ogs.system_id = ss.id
        ) LOOP

            IF comp.selected_value IS NULL THEN

                RAISE EXCEPTION 'Missing a selected value for option group %', comp.option_name;
            
            END IF;

        END LOOP;

    -- all selected detail and configuration option values must be within the option group selection

        -- FOR comp IN (
        --     SELECT * FROM system_set_option_group_values ssogvs
        --     WHERE ssogvs.system_set_id = ss.id
        -- ) LOOP

        --     <<LOOP TYPE (detail, configuration)>>
        --         FOR other_comp IN (
        --             SELECT * FROM system_set_<<TYPE>>_option_values ssov
        --             WHERE ssov.system_set_id = ss.id
        --             AND ssov.<<TYPE>>_option_value_path ~ ('*.' || comp.option_name || '.*')::LQUERY
        --             AND NOT (ssov.<<TYPE>>_option_value_path ~ ('*.' || comp.option_name || '.' || comp.name || '.*')::LQUERY)
        --         ) LOOP

        --             RAISE EXCEPTION 'System set <<TYPE>> option value % has wrong value selected for option group %.%', other_comp.<<TYPE>>_option_value_path, comp.option_name, comp.name;

        --         END LOOP;
        --     <<END LOOP>>

        -- END LOOP;

    -- all system details and required system configurations have an option value selected

        -- select all system details within selected system option value that don't have a corresponding ssd but that do have option values to select from
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
            -- but that don't have a corresponding ssd
            AND NOT EXISTS (
                SELECT * FROM system_set_details ssd
                WHERE get_detail_type_from_path(ssd.detail_option_value_path) = sd.detail_type
            )
        ) LOOP

            RAISE EXCEPTION 'Missing system set detail option value for system detail %', comp.path;

        END LOOP;

        FOR comp IN (
            -- select all system configurations
            SELECT * FROM detail_configurations sc
            -- that are non-optional,
            WHERE sc.optional = FALSE
            -- within selected detail option values,
            AND sc.parent_detail_option_value_path IN (
                SELECT detail_option_value_path FROM system_set_details ssd
                WHERE ssd.system_set_id = ss.id
            )
            -- that do have options to select from,
            AND EXISTS (
                SELECT * FROM configuration_options co
                WHERE co.parent_detail_configuration_path = sc.path
            )
            -- but that don't have a corresponding sscov
            AND NOT EXISTS (
                SELECT * FROM system_set_configurations sscov
                WHERE get_configuration_type_from_path(sscov.configuration_option_value_path) = sc.configuration_type
            )
        ) LOOP

            RAISE EXCEPTION 'Missing system set configuration option value for system configuration %', comp.path;

        END LOOP;
    
    RETURN ss;

END;
$$ LANGUAGE plpgsql STABLE;
