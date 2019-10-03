
<<LOOP
    TYPE (detail, configuration)
    PARENT (system, detail)
>>

    -- CREATE

    DROP FUNCTION IF EXISTS create_entire_system_<<TYPE>>;

    CREATE OR REPLACE FUNCTION gc_protected.create_entire_system_<<TYPE>>(
        system_<<TYPE>> NEW_SYSTEM_<<TYPE>>,
        system SYSTEMS
    ) RETURNS SYSTEM_<<TYPE>>S AS $$
    DECLARE
        st ALIAS FOR system_<<TYPE>>;
        s ALIAS FOR system;
        ust system_<<TYPE>>s%ROWTYPE;
    BEGIN

        -- RAISE EXCEPTION 'Creating system <<TYPE>>';
        -- RAISE EXCEPTION 'parent option value path is %', parent_<<PARENT>>_option_value_path;

        INSERT INTO system_<<TYPE>>s (
            system_id,
            <<TYPE>>_type,
            parent_<<PARENT>>_option_value_path
        ) VALUES (
            s.id,
            st.<<TYPE>>_type,
            st.parent_<<PARENT>>_option_value_path
        )
        RETURNING * INTO ust;

        RETURN ust;

    END;
    $$ LANGUAGE plpgsql;



    -- UPDATE

    DROP FUNCTION IF EXISTS update_entire_system_<<TYPE>>;

    CREATE OR REPLACE FUNCTION gc_protected.update_entire_system_<<TYPE>>(
        system_<<TYPE>> ENTIRE_system_<<TYPE>>,
        system SYSTEMS
    ) RETURNS SYSTEM_<<TYPE>>S AS $$
    DECLARE
        st ALIAS FOR system_<<TYPE>>;
        s ALIAS FOR system;
        u NEW_SYSTEM_<<TYPE>>;
        ust system_<<TYPE>>s%ROWTYPE;
    BEGIN

        u := st.update;

        IF st.path IS NULL OR u IS NULL THEN 
            RAISE EXCEPTION 'Must specify both `path` and `update` on system <<TYPE>>, received path: % and update: %', st.path, (
                CASE WHEN u IS NULL THEN NULL
                ELSE '[update]' END
            );
        END IF;

        UPDATE system_<<TYPE>>s sts SET
            <<TYPE>>_type = COALESCE(
                u.<<TYPE>>_type,
                sts.<<TYPE>>_type
            ),
            parent_<<PARENT>>_option_value_path = COALESCE(
                u.parent_<<PARENT>>_option_value_path,
                sts.parent_<<PARENT>>_option_value_path
            )
        WHERE sts.path = st.path
        RETURNING * INTO ust;

        IF ust IS NULL THEN
            RAISE EXCEPTION 'Cannot update system <<TYPE>>, cannot find path %', st.path::TEXT;
        END IF;

        RETURN ust;

    END;
    $$ LANGUAGE plpgsql;

<<END LOOP>>
