DROP FUNCTION IF EXISTS create_or_update_system_set;

CREATE OR REPLACE FUNCTION create_or_update_system_set(system_set ENTIRE_SYSTEM_SET)
RETURNS SETOF SYSTEM_SETS AS $$
DECLARE
    ss ALIAS FOR system_set;
BEGIN
    IF ss.id IS NULL
    THEN RETURN QUERY
        INSERT INTO system_sets (
            project_id,
            system_id,
            system_type_id
        )
        VALUES (
            ss.project_id,
            ss.system_id,
            ss.system_type_id
        )
        RETURNING *;
    ELSE RETURN QUERY
        SELECT * FROM system_sets
        WHERE system_sets.id = ss.id;
    END IF;
END;
$$ LANGUAGE plpgsql;
