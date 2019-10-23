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
    WHERE og.name IN (
        SELECT * FROM UNNEST (s.option_groups_to_delete) AS name
    )
    AND og.system_id = us.id;
    

    INSERT INTO option_groups (
        system_id,
        name
    ) SELECT
        us.id,
        nog.name
    FROM UNNEST (s.new_option_groups) nog;

    RETURN us;

END;
$$ LANGUAGE plpgsql;
