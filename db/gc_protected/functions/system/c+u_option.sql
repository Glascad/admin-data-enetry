
<<LOOP TYPE (system, detail, configuration)>>

    -- CREATE

    DROP FUNCTION IF EXISTS create_entire_<<TYPE>>_option;

    CREATE OR REPLACE FUNCTION gc_protected.create_entire_<<TYPE>>_option(
        <<TYPE>>_option NEW_<<TYPE>>_OPTION,
        system SYSTEMS
    ) RETURNS <<TYPE>>_OPTIONS AS $$
    DECLARE
        o ALIAS FOR <<TYPE>>_option;
        s ALIAS FOR system;
        uo <<TYPE>>_options%ROWTYPE;
    BEGIN

        -- RAISE EXCEPTION 'creating <<TYPE>> option';

        -- RAISE EXCEPTION 'parent system <<TYPE>> path is %', parent_system_<<TYPE>>_path;

        INSERT INTO <<TYPE>>_options (
            system_id,
            name,
            default_<<TYPE>>_option_value,
            parent_<<TYPE>>_option_value_path
            <<ONLY TYPE (detail, configuration)>>
                , parent_system_<<TYPE>>_path
            <<END ONLY>>
        ) VALUES (
            s.id,
            o.name,
            o.default_<<TYPE>>_option_value,
            o.parent_<<TYPE>>_option_value_path
            <<ONLY TYPE (detail, configuration)>>
                , o.parent_system_<<TYPE>>_path
            <<END ONLY>>
        )
        RETURNING * INTO uo;

        RETURN uo;

    END;
    $$ LANGUAGE plpgsql;



    -- UPDATE

    DROP FUNCTION IF EXISTS update_entire_<<TYPE>>_option;

    CREATE OR REPLACE FUNCTION gc_protected.update_entire_<<TYPE>>_option(
        <<TYPE>>_option ENTIRE_<<TYPE>>_OPTION,
        system SYSTEMS
    ) RETURNS <<TYPE>>_OPTIONS AS $$
    DECLARE
        o ALIAS FOR <<TYPE>>_option;
        s ALIAS FOR system;
        u NEW_<<TYPE>>_OPTION;
        uo <<TYPE>>_options%ROWTYPE;
    BEGIN

        u := o.update;

        IF o.path IS NULL OR u IS NULL THEN 
            RAISE EXCEPTION 'Must specify both `path` and `update` on <<TYPE>> option, received path: % and update: %', o.path, (
                CASE WHEN u IS NULL THEN NULL
                ELSE '[update]' END
            );
        END IF;

        UPDATE <<TYPE>>_options os SET
            name = COALESCE(
                u.name,
                os.name
            ),
            parent_<<TYPE>>_option_value_path = COALESCE(
                u.parent_<<TYPE>>_option_value_path,
                os.parent_<<TYPE>>_option_value_path
            ),
            default_<<TYPE>>_option_value = COALESCE(
                u.default_<<TYPE>>_option_value,
                os.default_<<TYPE>>_option_value
            )
            <<ONLY TYPE (detail, configuration)>>
                , parent_system_<<TYPE>>_path = COALESCE(
                    u.parent_system_<<TYPE>>_path,
                    os.parent_system_<<TYPE>>_path
                )
            <<END ONLY>>
        WHERE os.path = o.path
        RETURNING * INTO uo;

        IF uo IS NULL THEN
            RAISE EXCEPTION 'Cannot update <<TYPE>> option, cannot find path %', o.path::TEXT;
        END IF;

        RETURN uo;

    END;
    $$ LANGUAGE plpgsql;

<<END LOOP>>
