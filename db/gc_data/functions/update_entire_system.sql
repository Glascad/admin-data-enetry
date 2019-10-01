DROP FUNCTION IF EXISTS update_entire_system;

CREATE OR REPLACE FUNCTION gc_data.update_entire_system (system ENTIRE_SYSTEM)
RETURNS SYSTEMS AS $$
DECLARE
    s ALIAS FOR system;
    us systems%ROWTYPE;
    real_id INTEGER;
    <<LOOP
        TYPE (
            CONFIGURATION_OPTION_VALUE,
            CONFIGURATION_OPTION,
            SYSTEM_CONFIGURATION,
            DETAIL_OPTION_VALUE,
            DETAIL_OPTION,
            SYSTEM_DETAIL,
            SYSTEM_OPTION_VALUE,
            SYSTEM_OPTION
        )
        ALIAS (
            cov,
            co,
            sc,
            dov,
            _do,
            sd,
            sov,
            so
        )
    >>
        <<ALIAS>> ENTIRE_<<TYPE>>;
    <<END LOOP>>
    ___ INTEGER;
BEGIN

    SET search_path = gc_public,gc_data,gc_protected,gc_controlled,gc_utils,pg_temp_1,pg_toast,pg_toast_temp_1;

    SELECT * FROM create_or_update_system(s) INTO us;

    <<LOOP
        TYPE (
            configuration_option_value,
            configuration_option,
            system_configuration,
            detail_option_value,
            detail_option,
            system_detail,
            system_option_value,
            system_option
        )
        ALIAS (
            cov,
            co,
            sc,
            dov,
            _do,
            sd,
            sov,
            so
        )
    >>

        -- DELETE FIRST

        IF s.<<TYPE>>_paths_to_delete IS NOT NULL THEN
            DELETE FROM <<TYPE>>s t
            WHERE t.path IN (
                SELECT * FROM UNNEST (s.<<TYPE>>_paths_to_delete)
            )
            AND t.system_id = s.id;
        END IF;

        -- THEN CREATE

        IF s.<<TYPE>>s IS NOT NULL THEN
            FOREACH <<ALIAS>> IN ARRAY s.<<TYPE>>s LOOP
                SELECT 1 FROM create_or_update_<<TYPE>>(<<ALIAS>>, us) INTO ___;
            END LOOP;
        END IF;

        -- THEN SET DEFAULT -- can do in create_or_update now

        -- <<ONLY TYPE (configuration_option, detail_option, system_option)>>
        --     IF s.<<TYPE>>s IS NOT NULL THEN
        --         FOREACH <<ALIAS>> IN ARRAY s.<<TYPE>>s LOOP
        --             SELECT 1 FROM set_default_<<TYPE>>_value(<<ALIAS>>, us) INTO ___;
        --         END LOOP;
        --     END IF;
        -- <<END ONLY>>

    <<END LOOP>>


    RETURN us;

END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

ALTER FUNCTION gc_data.update_entire_system OWNER TO gc_invoker;
