DROP FUNCTION IF EXISTS create_or_update_elevation;

CREATE OR REPLACE FUNCTION create_or_update_elevation(elevation ENTIRE_ELEVATION)
RETURNS SETOF ELEVATIONS AS $$
DECLARE
    e ALIAS FOR elevation;
BEGIN
    IF e.id IS NULL
    THEN RETURN QUERY
        INSERT INTO elevations (
            project_id,
            name,
            rough_opening,
            finished_floor_height
        ) VALUES (
            e.project_id,
            e.name,
            e.rough_opening,
            e.finished_floor_height
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
                ELSE elevations.finished_floor_height END
        WHERE elevations.id = e.id
        RETURNING *;
    END IF;
END;
$$ LANGUAGE plpgsql;
