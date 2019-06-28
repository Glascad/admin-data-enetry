DROP FUNCTION IF EXISTS create_or_update_elevation;

CREATE OR REPLACE FUNCTION create_or_update_elevation(elevation ENTIRE_ELEVATION)
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
                name,
                rough_opening,
                finished_floor_height,
                sightline,
                preview
            ) VALUES (
                e.project_id,
                e.name,
                e.rough_opening,
                e.finished_floor_height,
                e.sightline,
                e.preview
            )
            RETURNING *;
        ELSE RETURN QUERY
            UPDATE elevations SET
                project_id = CASE
                    WHEN e.project_id IS NOT NULL
                        THEN e.project_id
                    ELSE elevations.project_id END,
                name = CASE
                    WHEN e.name IS NOT NULL
                        THEN e.name
                    ELSE elevations.name END,
                rough_opening = CASE
                    WHEN e.rough_opening IS NOT NULL
                        THEN e.rough_opening
                    ELSE elevations.rough_opening END,
                finished_floor_height = CASE
                    WHEN e.finished_floor_height IS NOT NULL
                        THEN e.finished_floor_height
                    ELSE elevations.finished_floor_height END,
                preview = CASE
                    WHEN e.preview IS NOT NULL
                        THEN e.preview
                    ELSE elevations.preview END
            WHERE elevations.id = e.id
            RETURNING *;
        END IF;
    END IF;
END;
$$ LANGUAGE plpgsql;
