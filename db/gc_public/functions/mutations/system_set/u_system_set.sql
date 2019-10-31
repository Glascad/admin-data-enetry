DROP FUNCTION IF EXISTS update_entire_system_set;

CREATE OR REPLACE FUNCTION gc_public.update_entire_system_set(system_set ENTIRE_SYSTEM_SET)
RETURNS SYSTEM_SETS AS $$
DECLARE
    ss ALIAS FOR system_set;
    uss system_sets%ROWTYPE;
    ___ INTEGER;
    ogv OPTION_VALUE_PAIR;
    sn ENTIRE_SYSTEM_SET_NODE;
BEGIN

    SET search_path = gc_public,gc_data,gc_protected,gc_utils,pg_temp_1,pg_toast,pg_toast_temp_1;

    -- system set
    SELECT * FROM create_or_update_system_set(ss) INTO uss;

    -- option group values
    IF ss.option_group_values IS NOT NULL THEN

        FOREACH ogv IN ARRAY ss.option_group_values LOOP

            SELECT 1 FROM create_or_update_system_set_option_group_value(ogv, uss) INTO ___;

        END LOOP;

    END IF;

    -- detail option values & configuration option values
    <<LOOP TYPE (detail, configuration)>>

        IF ss.<<TYPE>>_option_values IS NOT NULL THEN

            FOREACH sn IN ARRAY ss.<<TYPE>>_option_values LOOP

                SELECT 1 FROM create_or_update_or_delete_system_set_<<TYPE>>_option_value(sn, uss) INTO ___;

            END LOOP;

        END IF;

    <<END LOOP>>

    RETURN check_entire_system_set(uss);

END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

ALTER FUNCTION gc_public.update_entire_system_set OWNER TO gc_invoker;
