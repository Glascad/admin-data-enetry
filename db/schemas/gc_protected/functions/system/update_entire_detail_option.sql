DROP FUNCTION IF EXISTS update_entire_detail_option;

CREATE OR REPLACE FUNCTION gc_protected.update_entire_detail_option(
    detail_option ENTIRE_DETAIL_OPTION,
    system SYSTEMS,
    id_map ENTIRE_SYSTEM_ID_MAP
) RETURNS ENTIRE_SYSTEM_ID_MAP AS $$
DECLARE
    _do ALIAS FOR detail_option;
    s ALIAS FOR system;
    dov ENTIRE_DETAIL_OPTION_VALUE;
BEGIN

    -- create or update detail option
    id_map := create_or_update_detail_option(_do, s, id_map);

    -- create or update values
    IF _do.detail_option_values IS NOT NULL THEN
        FOREACH dov IN ARRAY _do.detail_option_values LOOP
            id_map := update_entire_detail_option_value(dov, _do, s, id_map);
        END LOOP;
    END IF;

    RETURN id_map;
END;
$$ LANGUAGE plpgsql;