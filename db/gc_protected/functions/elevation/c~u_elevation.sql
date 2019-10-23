DROP FUNCTION IF EXISTS create_or_update_elevation;

CREATE OR REPLACE FUNCTION gc_protected.create_or_update_elevation(elevation ENTIRE_ELEVATION)
RETURNS SETOF ELEVATIONS AS $$
DECLARE
    pid INTEGER;
    e ALIAS FOR elevation;
BEGIN

    -- CHECK CURRENT USER

    IF e.id IS NOT NULL THEN
        SELECT project_id FROM elevations INTO pid
        WHERE id = e.id;
    ELSE
        pid := e.project_id;
    END IF;

    IF pid NOT IN (
        SELECT id FROM projects
        WHERE owner_id = get_current_user_id()
    ) THEN

        RAISE EXCEPTION 'Elevation not owned by user %', get_current_user_id();

    ELSE

        -- IF AUTHORIZED
            
        IF e.id IS NULL
        THEN RETURN QUERY
            INSERT INTO elevations (
                project_id,
                system_set_id,
                name,
                rough_opening,
                finished_floor_height,
                sightline,
                preview
            ) VALUES (
                e.project_id,
                e.system_set_id,
                e.name,
                e.rough_opening,
                e.finished_floor_height,
                e.sightline,
                e.preview
            )
            RETURNING *;
        ELSE RETURN QUERY
            UPDATE elevations SET
                project_id = COALESCE(e.project_id, elevations.project_id),
                system_set_id = COALESCE(e.system_set_id, elevations.system_set_id),
                name = COALESCE(e.name, elevations.name),
                rough_opening = COALESCE(e.rough_opening, elevations.rough_opening),
                finished_floor_height = COALESCE(e.finished_floor_height, elevations.finished_floor_height),
                preview = COALESCE(e.preview, elevations.preview)
            WHERE elevations.id = e.id
            RETURNING *;
        END IF;
    END IF;
END;
$$ LANGUAGE plpgsql;
