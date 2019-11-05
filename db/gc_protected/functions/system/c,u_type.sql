
<<LOOP
    TYPE (detail, configuration)
    PARENT (system, detail)
>>

    -- CREATE

    DROP FUNCTION IF EXISTS create_entire_<<PARENT>>_<<TYPE>>;

    CREATE OR REPLACE FUNCTION gc_protected.create_entire_<<PARENT>>_<<TYPE>>(
        <<PARENT>>_<<TYPE>> NEW_<<PARENT>>_<<TYPE>>,
        system SYSTEMS
    ) RETURNS <<PARENT>>_<<TYPE>>S AS $$
    DECLARE
        st ALIAS FOR <<PARENT>>_<<TYPE>>;
        s ALIAS FOR system;
        ust <<PARENT>>_<<TYPE>>s%ROWTYPE;
    BEGIN

        INSERT INTO <<PARENT>>_<<TYPE>>s (
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

    DROP FUNCTION IF EXISTS update_entire_<<PARENT>>_<<TYPE>>;

    CREATE OR REPLACE FUNCTION gc_protected.update_entire_<<PARENT>>_<<TYPE>>(
        <<PARENT>>_<<TYPE>> ENTIRE_<<PARENT>>_<<TYPE>>,
        system SYSTEMS
    ) RETURNS <<PARENT>>_<<TYPE>>S AS $$
    DECLARE
        st ALIAS FOR <<PARENT>>_<<TYPE>>;
        s ALIAS FOR system;
        u NEW_<<PARENT>>_<<TYPE>>;
        ust <<PARENT>>_<<TYPE>>s%ROWTYPE;
    BEGIN

        u := st.update;

        IF st.path IS NULL OR u IS NULL THEN 
            RAISE EXCEPTION 'Must specify both `path` and `update` on <<PARENT>> <<TYPE>>, received path: % and update: %', st.path, (
                CASE WHEN u IS NULL THEN NULL
                ELSE '[update]' END
            );
        END IF;

        UPDATE <<PARENT>>_<<TYPE>>s sts SET
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
            RAISE EXCEPTION 'Cannot update <<PARENT>> <<TYPE>>, cannot find path %', st.path::TEXT;
        END IF;

        RETURN ust;

    END;
    $$ LANGUAGE plpgsql;

<<END LOOP>>
