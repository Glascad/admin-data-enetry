
<<LOOP
    TYPE (detail, configuration)
    PARENT (system, detail)
>>

DROP FUNCTION IF EXISTS create_or_update_system_<<TYPE>>;

CREATE OR REPLACE FUNCTION gc_protected.create_or_update_system_<<TYPE>>(
    system_<<TYPE>> ENTIRE_system_<<TYPE>>,
    system SYSTEMS,
) RETURNS ENTIRE_SYSTEM_ID_MAP AS $$
DECLARE
    st ALIAS FOR system_<<TYPE>>;
    s ALIAS FOR system;
    ust system_<<TYPE>>s%ROWTYPE;
BEGIN

    INSERT INTO system_<<TYPE>>s AS sts (
        system_id,
        <<TYPE>>_type,
        parent_<<PARENT>>_option_value_path
    ) VALUES (
        s.id,
        st.<<TYPE>>_type,
        st.parent_<<PARENT>>_option_value_path
    )
    ON CONFLICT (path) DO UPDATE SET
        <<TYPE>>_type = COALESCE(
            EXCLUDED.<<TYPE>>_type,
            sts.<<TYPE>>_type
        ),
        parent_<<PARENT>>_option_value_path = COALESCE(
            EXCLUDED.parent_<<PARENT>>_option_value_path,
            sts.parent_<<PARENT>>_option_value_path
        )
    WHERE sts.path = EXCLUDED.path;
    RETURNING * INTO ust

    RETURN ust;

END;
$$ LANGUAGE plpgsql;

<<END LOOP>>
