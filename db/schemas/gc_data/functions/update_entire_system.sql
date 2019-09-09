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
    sov ENTIRE_SYSTEM_OPTION_VALUE;
    dov ENTIRE_DETAIL_OPTION_VALUE;
    cov ENTIRE_CONFIGURATION_OPTION_VALUE;
    sdt ENTIRE_SYSTEM_DETAIL_TYPE;
    sct ENTIRE_SYSTEM_CONFIGURATION_TYPE;
BEGIN

    SET search_path = gc_public,gc_data,gc_protected,gc_controlled,gc_utils,pg_temp_1,pg_toast,pg_toast_temp_1;

    SELECT * FROM create_or_update_system(s) INTO us;

    -- DELETE FROM BOTTOM UP

    -- DELETE TYPES

    IF s.system_configuration_type_ids_to_delete IS NOT NULL THEN
        DELETE FROM system_configuration_types sct
        WHERE sct.id IN (
            SELECT * FROM UNNEST (s.system_configuration_type_ids_to_delete)
        )
        AND sct.system_id = s.id;
    END IF;

    -- delete detail types
    IF s.system_detail_type_ids_to_delete IS NOT NULL THEN
        DELETE FROM system_detail_types sdt
        WHERE sdt.id IN (
            SELECT * FROM UNNEST (s.system_detail_type_ids_to_delete)
        )
        AND sdt.system_id = s.id;
    END IF;

    -- DELETE VALUES

    IF s.system_option_value_ids_to_delete IS NOT NULL THEN
        DELETE FROM system_option_values ov
        WHERE ov.id IN (
            SELECT * FROM UNNEST (s.system_option_value_ids_to_delete)
        )
        AND ov.system_id = s.id;
    END IF;

    IF s.detail_option_value_ids_to_delete IS NOT NULL THEN
        DELETE FROM detail_option_values ov
        WHERE ov.id IN (
            SELECT * FROM UNNEST (s.detail_option_value_ids_to_delete)
        )
        AND ov.system_id = s.id;
    END IF;

    IF s.configuration_option_value_ids_to_delete IS NOT NULL THEN
        DELETE FROM configuration_option_values ov
        WHERE ov.id IN (
            SELECT * FROM UNNEST (s.configuration_option_value_ids_to_delete)
        )
        AND ov.system_id = s.id;
    END IF;

    -- DELETE OPTIONS

    IF s.configuration_option_ids_to_delete IS NOT NULL THEN
        DELETE FROM configuration_options o
        WHERE o.id IN (
            SELECT * FROM UNNEST(s.configuration_option_ids_to_delete)
        )
        AND o.system_id = us.id;
    END IF;

    IF s.detail_option_ids_to_delete IS NOT NULL THEN
        DELETE FROM detail_options o
        WHERE o.id IN (
            SELECT * FROM UNNEST(s.detail_option_ids_to_delete)
        )
        AND o.system_id = us.id;
    END IF;

    IF s.system_option_ids_to_delete IS NOT NULL THEN
        DELETE FROM system_options o
        WHERE o.id IN (
            SELECT * FROM UNNEST(s.system_option_ids_to_delete)
        )
        AND o.system_id = us.id;
    END IF;

    -- UPDATE FROM TOP DOWN

    -- expect dependent fake ids to come after referenced fake ids in the array
    -- if a dependent fake id comes before its referenced fake id, throw an error telling the user to put the items in the correct order
    -- on the front end, make sure to order items correctly

    -- SYSTEM

    -- OPTIONS

    IF s.system_options IS NOT NULL THEN
        FOREACH so IN ARRAY s.system_options LOOP
            id_map := create_or_update_system_option(so, us, id_map);
        END LOOP;
    END IF;

    -- VALUES

    IF s.system_option_values IS NOT NULL THEN
        FOREACH sov IN ARRAY s.system_option_values LOOP
            id_map := create_or_update_system_option_value(sov, us, id_map);
        END LOOP;
    END IF;

    -- DETAIL TYPES

    IF s.system_detail_types IS NOT NULL THEN
        FOREACH sdt IN ARRAY s.system_detail_types LOOP
            id_map := create_or_update_system_detail_type(sdt, us, id_map);
        END LOOP;
    END IF;

    -- OPTIONS

    IF s.detail_options IS NOT NULL THEN
        FOREACH _do IN ARRAY s.detail_options LOOP
            id_map := create_or_update_detail_option(_do, us, id_map);
        END LOOP;
    END IF;

    -- VALUES

    IF s.detail_option_values IS NOT NULL THEN
        FOREACH dov IN ARRAY s.detail_option_values LOOP
            id_map := create_or_update_detail_option_value(dov, us, id_map);
        END LOOP;
    END IF;

    -- CONFIGURATION TYPES

    IF s.system_configuration_types IS NOT NULL THEN
        FOREACH sct IN ARRAY s.system_configuration_types LOOP
            id_map := create_or_update_system_configuration_type(sct, us, id_map);
        END LOOP;
    END IF;

    -- OPTIONS

    IF s.configuration_options IS NOT NULL THEN
        FOREACH co IN ARRAY s.configuration_options LOOP
            id_map := create_or_update_configuration_option(co, us, id_map);
        END LOOP;
    END IF;

    -- VALUES

    IF s.configuration_option_values IS NOT NULL THEN
        FOREACH cov IN ARRAY s.configuration_option_values LOOP
            id_map := create_or_update_configuration_option_value(cov, us, id_map);
        END LOOP;
    END IF;

    RETURN us;

END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

ALTER FUNCTION gc_data.update_entire_system OWNER TO gc_invoker;
