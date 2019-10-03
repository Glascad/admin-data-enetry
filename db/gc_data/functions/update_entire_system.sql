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
        n<<ALIAS>> NEW_<<TYPE>>;
    <<END LOOP>>
    ___ INTEGER;
BEGIN

    SET search_path = gc_public,gc_data,gc_protected,gc_controlled,gc_utils,pg_temp_1,pg_toast,pg_toast_temp_1;

    SELECT * FROM create_or_update_system(s) INTO us;

    -- DELETE FIRST

    IF s.paths_to_delete IS NOT NULL THEN
        <<LOOP
            -- FROM BOTTOM UP
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
            DELETE FROM <<TYPE>>s t
            WHERE t.path IN (SELECT UNNEST(s.paths_to_delete))
            AND t.system_id = s.id;
        <<END LOOP>>
    END IF;

    -- THEN UPDATE

    <<LOOP
        TYPE (
            configuration_option_value,
            configuration_option,
            detail_option_value,
            detail_option,
            system_detail,
            system_option_value,
            system_configuration,
            system_option
        )
        ALIAS (
            cov,
            co,
            dov,
            _do,
            sd,
            sov,
            sc,
            so
        )
    >>

        IF s.<<TYPE>>s IS NOT NULL THEN
            FOREACH <<ALIAS>> IN ARRAY s.<<TYPE>>s LOOP
                SELECT 1 FROM update_entire_<<TYPE>>(<<ALIAS>>, us) INTO ___;
            END LOOP;
        END IF;

    <<END LOOP>>

    -- THEN CREATE LAST

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

        IF s.new_<<TYPE>>s IS NOT NULL THEN
            FOREACH n<<ALIAS>> IN ARRAY s.new_<<TYPE>>s LOOP
                -- RAISE EXCEPTION 'Creating first item';
                SELECT 1 FROM create_entire_<<TYPE>>(n<<ALIAS>>, us) INTO ___;
                -- RAISE EXCEPTION 'Created first item';
            END LOOP;
        END IF;

    <<END LOOP>>

    RETURN us;

END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

ALTER FUNCTION gc_data.update_entire_system OWNER TO gc_invoker;
