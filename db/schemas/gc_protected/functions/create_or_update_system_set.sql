DROP FUNCTION IF EXISTS create_or_update_system_set;

CREATE OR REPLACE FUNCTION gc_protected.create_or_update_system_set(system_set ENTIRE_SYSTEM_SET)
RETURNS SYSTEM_SETS AS $$
DECLARE
    ss ALIAS FOR system_set;
    uss system_sets%ROWTYPE;
BEGIN
    IF ss.id IS NULL THEN
        INSERT INTO system_sets (
            project_id,
            system_id,
            system_type,
            name
            -- infill_size
        )
        VALUES (
            ss.project_id,
            ss.system_id,
            CASE WHEN ss.system_type IS NOT NULL
                THEN ss.system_type
                ELSE (
                    SELECT system_type FROM systems
                    WHERE systems.id = ss.system_id
                ) END,
            ss.name
            -- ss.infill_size
        )
        RETURNING * INTO uss;
    ELSE
        UPDATE system_sets SET
            name = CASE WHEN ss.name IS NOT NULL
                THEN ss.name
                ELSE system_sets.name END
            -- infill_size = CASE WHEN ss.infill_size IS NOT NULL
            --     THEN ss.infill_size
            --     ELSE system_sets.infill_size END
        WHERE system_sets.id = ss.id
        RETURNING * INTO uss;
    END IF;

    IF uss IS NULL THEN RAISE EXCEPTION 'uss is NULL - CREATE_OR_UPDATE_SYSTEM_SET';
    END IF;

    RETURN uss;

END;
$$ LANGUAGE plpgsql;
