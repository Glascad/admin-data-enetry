
<<LOOP
    TYPE (system, detail, configuration)
    PARENT (NULL, system, detail)
>>

DROP FUNCTION IF EXISTS create_or_update_<<TYPE>>_option;

CREATE OR REPLACE FUNCTION gc_protected.create_or_update_<<TYPE>>_option(
    <<TYPE>>_option ENTIRE_<<TYPE>>_OPTION,
    system SYSTEMS
) RETURNS <<TYPE>>_OPTIONS AS $$
DECLARE
    o ALIAS FOR <<TYPE>>_option;
    s ALIAS FOR system;
    uo <<TYPE>>_options%ROWTYPE;
BEGIN

    INSERT INTO <<TYPE>>_options AS os (
        system_id,
        name,
        parent_<<TYPE>>_option_value_path,
        default_<<TYPE>>_option_value
        <<ONLY TYPE (detail, configuration)>>
            , parent_system_<<TYPE>>_path
        <<END ONLY>>
    ) VALUES (
        s.id,
        o.name,
        o.parent_<<TYPE>>_option_value_path,
        default_<<TYPE>>_option_value
        <<ONLY TYPE (detail, configuration)>>
            , parent_system_<<TYPE>>_path
        <<END ONLY>>
    )
    ON CONFLICT (path) DO UPDATE SET
        name = COALESCE(
            EXCLUDED.name,
            os.name
        ),
        parent_<<TYPE>>_option_value_path = COALESCE(
            EXCLUDED.parent_<<TYPE>>_option_value_path,
            os.parent_<<TYPE>>_option_value_path
        ),
        default_<<TYPE>>_option_value = COALESCE(
            EXCLUDED.default_<<TYPE>>_option_value_path,
            os.default_<<TYPE>>_option_value_path
        )
        <<ONLY TYPE (detail, configuration)>>
            , parent_system_<<PARENT>>_type_path = COALESCE(
                EXCLUDED.parent_system_<<PARENT>>_type_path,
                os.parent_system_<<PARENT>>_type_path
            )
        <<END ONLY>>
    WHERE os.path = EXCLUDED.path
    RETURNING * INTO uo;

    RETURN uo;

END;
$$ LANGUAGE plpgsql;

<<END LOOP>>
