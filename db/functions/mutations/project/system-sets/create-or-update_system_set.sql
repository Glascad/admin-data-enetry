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
            system_type_id,
            infill_size
        )
        VALUES (
            ss.project_id,
            ss.system_id,
            ss.system_type_id,
            ss.infill_size
        )
        RETURNING *;
    ELSE RETURN QUERY
        UPDATE system_sets SET
            infill_size = CASE WHEN ss.infill_size IS NOT NULL
                THEN ss.infill_size
                ELSE system_sets.infill_size END
        WHERE system_sets.id = ss.id
        RETURNING *;
    END IF;
END;
$$ LANGUAGE plpgsql;
