DROP FUNCTION IF EXISTS create_or_update_system_set_option_group_value;

CREATE OR REPLACE FUNCTION gc_protected.create_or_update_system_set_option_group_value(
    option_group_value OPTION_VALUE_PAIR,
    system_set SYSTEM_SETS
) RETURNS SYSTEM_SET_OPTION_GROUP_VALUES AS $$
DECLARE
    ogv ALIAS FOR option_group_value;
    ss ALIAS FOR system_set;
    ssogvs RECORD;
BEGIN

    INSERT INTO system_set_option_group_values AS ssogv (
        system_set_id,
        option_name,
        name
    ) VALUES (
        ss.id,
        ogv.option_name,
        ogv.name
    )
    ON CONFLICT (system_set_id, option_name) DO UPDATE SET
        name = EXCLUDED.name
    WHERE ssogv.system_set_id = ss.id
    AND ssogv.option_name = ogv.option_name
    RETURNING * INTO ssogvs;

    RETURN ssogvs;

END;
$$ LANGUAGE plpgsql;
