DROP FUNCTION IF EXISTS create_and_delete_option_groups;

CREATE OR REPLACE FUNCTION gc_protected.create_and_delete_option_groups(
    system ENTIRE_SYSTEM,
    updated_system SYSTEMS
) RETURNS SYSTEMS AS $$
DECLARE
    s ALIAS FOR system;
    us ALIAS FOR updated_system;
BEGIN

    DELETE FROM option_groups og
    WHERE (og.system_option_value_path, og.name) IN (SELECT system_option_value_path, name FROM UNNEST (s.option_groups_to_delete))
    AND og.system_id = us.id;
    

    INSERT INTO option_groups (
        system_id,
        system_option_value_path,
        name
    ) SELECT
        us.id,
        nog.system_option_value_path,
        nog.name
    FROM UNNEST (s.new_option_groups) nog;

    RETURN us;

END;
$$ LANGUAGE plpgsql;
