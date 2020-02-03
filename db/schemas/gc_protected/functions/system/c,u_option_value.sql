
<<LOOP TYPE (system, detail, configuration)>>

    -- CREATE

    DROP FUNCTION IF EXISTS create_entire_<<TYPE>>_option_value;

    CREATE OR REPLACE FUNCTION gc_protected.create_entire_<<TYPE>>_option_value(
        <<TYPE>>_option_value NEW_<<TYPE>>_OPTION_VALUE,
        system SYSTEMS
    ) RETURNS <<TYPE>>_OPTION_VALUES AS $$
    DECLARE
        ov ALIAS FOR <<TYPE>>_option_value;
        s ALIAS FOR system;
        uov <<TYPE>>_option_values%ROWTYPE;
    BEGIN

        INSERT INTO <<TYPE>>_option_values (
            name,
            parent_<<TYPE>>_option_path
        ) VALUES (
            ov.name,
            prepend_system_id(s.id, ov.parent_<<TYPE>>_option_path)
        )
        RETURNING * INTO uov;

        RETURN uov;

    END;
    $$ LANGUAGE plpgsql;



    -- UPDATE

    DROP FUNCTION IF EXISTS update_entire_<<TYPE>>_option_value;

    CREATE OR REPLACE FUNCTION gc_protected.update_entire_<<TYPE>>_option_value(
        <<TYPE>>_option_value ENTIRE_<<TYPE>>_OPTION_VALUE,
        system SYSTEMS
    ) RETURNS <<TYPE>>_OPTION_VALUES AS $$
    DECLARE
        ov ALIAS FOR <<TYPE>>_option_value;
        s ALIAS FOR system;
        u NEW_<<TYPE>>_OPTION_VALUE;
        uov <<TYPE>>_option_values%ROWTYPE;
        pop LTREE;
    BEGIN

        u := ov.update;

        IF ov.path IS NULL OR u IS NULL THEN 
            RAISE EXCEPTION 'Must specify both `path` and `update` on <<TYPE>> option value, received path: % and update: %', ov.path, (
                CASE WHEN u IS NULL THEN NULL
                ELSE '[update]' END
            );
        END IF;

        UPDATE <<TYPE>>_option_values ovs SET
            name = COALESCE(
                u.name,
                ovs.name
            ),
            parent_<<TYPE>>_option_path = COALESCE(
                u.parent_<<TYPE>>_option_path,
                ovs.parent_<<TYPE>>_option_path
            )
        WHERE ovs.path = ov.path
        RETURNING * INTO uov;

        IF uov IS NULL THEN
            RAISE EXCEPTION 'Cannot update <<TYPE>> option value, cannot find path %', ov.path::TEXT;
        END IF;

        RETURN uov;

    END;
    $$ LANGUAGE plpgsql;

<<END LOOP>>
