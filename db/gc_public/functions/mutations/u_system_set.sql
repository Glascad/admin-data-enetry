DROP FUNCTION IF EXISTS update_entire_system_set;

CREATE OR REPLACE FUNCTION gc_public.update_entire_system_set(system_set ENTIRE_SYSTEM_SET)
RETURNS SYSTEM_SETS AS $$
DECLARE
    ss ALIAS FOR system_set;
    uss system_sets%ROWTYPE;
    ___ INTEGER;
    sn ENTIRE_SYSTEM_SET_NODE;
BEGIN

    SET search_path = gc_public,gc_data,gc_protected,pg_temp_1,pg_toast,pg_toast_temp_1;

    SELECT * FROM create_or_update_system_set(ss) INTO uss;

    <<LOOP TYPE (detail, configuration)>>

        IF ss.<<TYPE>>_option_values IS NOT NULL THEN

            FOREACH sn IN ARRAY ss.<<TYPE>>_option_values LOOP

                -- SELECT 1 FROM create_or_update_or_delete_system_set_<<TYPE>>_option_value(sn, uss) INTO ___;

            END LOOP;

        END IF;

    <<END LOOP>>

    RETURN uss;

END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

ALTER FUNCTION gc_public.update_entire_system_set OWNER TO gc_invoker;
