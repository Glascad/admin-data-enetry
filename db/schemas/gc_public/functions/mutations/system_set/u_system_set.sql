DROP FUNCTION IF EXISTS update_entire_system_set;

CREATE OR REPLACE FUNCTION gc_public.update_entire_system_set(system_set ENTIRE_SYSTEM_SET)
RETURNS SYSTEM_SETS AS $$
DECLARE
    ss ALIAS FOR system_set;
    uss system_sets%ROWTYPE;
    ___ INTEGER;
    ogv OPTION_VALUE_PAIR;
    ssd ENTIRE_SYSTEM_SET_DETAIL;
    ssc ENTIRE_SYSTEM_SET_CONFIGURATION;
    odc DETAIL_CONFIGURATION_PAIR;
BEGIN

    SET search_path = gc_public,gc_data,gc_protected,gc_utils,gc_controlled,pg_temp_1,pg_toast,pg_toast_temp_1;

    -- system set
    SELECT * FROM create_or_update_system_set(ss) INTO uss;

    -- option group values
    IF ss.option_group_values IS NOT NULL THEN

        FOREACH ogv IN ARRAY ss.option_group_values LOOP

            SELECT 1 FROM create_or_update_system_set_option_group_value(ogv, uss) INTO ___;

        END LOOP;

    END IF;

    -- detail option values & configuration option values
    <<LOOP 
        TYPE (detail, configuration)
        ALIAS (ssd, ssc)
    >>

        IF ss.<<TYPE>>s IS NOT NULL THEN

            FOREACH <<ALIAS>> IN ARRAY ss.<<TYPE>>s LOOP

                SELECT 1 FROM create_or_update_or_delete_system_set_<<TYPE>>(<<ALIAS>>, uss) INTO ___;

            END LOOP;

        END IF;

    <<END LOOP>>

    IF ss.optional_configurations_to_unselect IS NOT NULL THEN
        FOREACH odc IN ARRAY ss.optional_configurations_to_unselect LOOP

            SELECT 1 FROM delete_system_set_optional_configuration(odc, uss) INTO ___;

        END LOOP;
    END IF;

    RETURN check_entire_system_set(uss);

END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

ALTER FUNCTION gc_public.update_entire_system_set OWNER TO gc_invoker;
