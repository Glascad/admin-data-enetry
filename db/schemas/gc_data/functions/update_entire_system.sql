DROP FUNCTION IF EXISTS update_entire_system;

CREATE OR REPLACE FUNCTION gc_data.update_entire_system (system ENTIRE_SYSTEM)
RETURNS SYSTEMS AS $$
DECLARE
    s ALIAS FOR system;
    us systems%ROWTYPE;
    real_id INTEGER;
    id_map ENTIRE_SYSTEM_ID_MAP;
    so ENTIRE_SYSTEM_OPTION;
    _do ENTIRE_DETAIL_OPTION;
    co ENTIRE_CONFIGURATION_OPTION;
BEGIN

    SET search_path = gc_public,gc_data,gc_protected,gc_controlled,gc_utils,pg_temp_1,pg_toast,pg_toast_temp_1;

    SELECT * FROM create_or_update_system(s) INTO us;

    -- DELETE FROM BOTTOM UP

    IF s.configuration_option_ids_to_delete IS NOT NULL THEN
        DELETE FROM configuration_options co
        WHERE co.id IN (
            SELECT * FROM UNNEST(s.configuration_option_ids_to_delete)
        )
        AND system_id = us.id;
    END IF;

    IF s.detail_option_ids_to_delete IS NOT NULL THEN
        DELETE FROM detail_options _do
        WHERE _do.id IN (
            SELECT * FROM UNNEST(s.detail_option_ids_to_delete)
        )
        AND system_id = us.id;
    END IF;

    IF s.system_option_ids_to_delete IS NOT NULL THEN
        DELETE FROM system_options so
        WHERE so.id IN (
            SELECT * FROM UNNEST(s.system_option_ids_to_delete)
        )
        AND system_id = us.id;
    END IF;

    -- UPDATE FROM TOP DOWN

    -- expect dependent fake ids to come after referenced fake ids in the array
    -- if a dependent fake id comes before its referenced fake id, throw an error telling the user to put the items in the correct order
    -- on the front end, make sure to order items correctly

    IF s.system_options IS NOT NULL THEN
        FOREACH so IN ARRAY s.system_options LOOP
            id_map := update_entire_system_option(so, us, id_map);
        END LOOP;
    END IF;

    IF s.detail_options IS NOT NULL THEN
        FOREACH _do IN ARRAY s.detail_options LOOP
            id_map := update_entire_detail_option(_do, us, id_map);
        END LOOP;
    END IF;

    IF s.configuration_options IS NOT NULL THEN
        FOREACH co IN ARRAY s.configuration_options LOOP
            id_map := update_entire_configuration_option(co, us, id_map);
        END LOOP;
    END IF;

    RETURN us;

END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

ALTER FUNCTION gc_data.update_entire_system OWNER TO gc_invoker;
