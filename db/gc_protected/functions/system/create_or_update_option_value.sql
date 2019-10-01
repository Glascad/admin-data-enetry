

<<LOOP TYPE (system, detail, configuration)>>

DROP FUNCTION IF EXISTS create_or_update_<<TYPE>>_option_value;

CREATE OR REPLACE FUNCTION gc_protected.create_or_update_<<TYPE>>_option_value(
    <<TYPE>>_option_value ENTIRE_<<TYPE>>_OPTION_VALUE,
    system SYSTEMS
) RETURNS <<TYPE>>OPTION_VALUES AS $$
DECLARE
    ov ALIAS FOR <<TYPE>>_option_value;
    s ALIAS FOR system;
    uov <<TYPE>>_option_values%ROWTYPE;
BEGIN

    INSERT INTO <<TYPE>>_option_values AS ovs (
        name,
        parent_<<TYPE>>_option_path
    ) VALUES (
        ov.name,
        ov.parent_<<TYPE>>_option_path
    )
    ON CONFLICT (path) DO UPDATE SET
        name = COALESCE(
            EXCLUDED.name,
            ovs.name
        ),
        parent_<<TYPE>>_option_path = COALESCE(
            EXCLUDED.parent_<<TYPE>>_option_path,
            ovs.parent_<<TYPE>>_option_path
        )
    WHERE ovs.path = EXCLUDED.path
    RETURNING * INTO uov;

END;
$$ LANGUAGE plpgsql;

<<END LOOP>>
