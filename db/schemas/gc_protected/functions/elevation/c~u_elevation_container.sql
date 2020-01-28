DROP FUNCTION IF EXISTS create_or_update_elevation_container;

CREATE OR REPLACE FUNCTION gc_protected.create_or_update_elevation_container(
    elevation_container ENTIRE_ELEVATION_CONTAINER,
    elevation_id INTEGER
) RETURNS SETOF ELEVATION_CONTAINERS AS $$
DECLARE
    pid INTEGER;
    ec ALIAS FOR elevation_container;
    eid INTEGER = elevation_id;
BEGIN

     -- CHECK CURRENT USER

    SELECT project_id FROM elevations INTO pid
    WHERE id = eid;

    IF pid NOT IN (
        SELECT id FROM projects
        WHERE owner_id = get_current_user_id()
    ) THEN

        RAISE EXCEPTION 'Elevation not owned by user %', get_current_user_id();

    ELSE

        -- IF AUTHORIZED
            
        IF ec.id IS NULL
        THEN RETURN QUERY
            INSERT INTO elevation_containers (
                elevation_id,
                original,
                contents,
                daylight_opening
                -- custom_rough_opening
            ) VALUES (
                eid,
                ec.original,
                ec.contents,
                ec.daylight_opening
                -- ec.custom_rough_opening
            )
            RETURNING *;
        ELSE RETURN QUERY
            UPDATE elevation_containers SET
                original = COALESCE(ec.original, elevation_containers.original),
                contents = COALESCE(ec.contents, elevation_containers.contents),
                daylight_opening = COALESCE(ec.daylight_opening, elevation_containers.daylight_opening)
                -- custom_rough_opening = CASE
                --     WHEN ec.custom_rough_opening IS NOT NULL
                --         THEN ec.custom_rough_opening
                --     ELSE elevation_containers.custom_rough_opening END
            WHERE elevation_containers.elevation_id = eid
            AND elevation_containers.id = ec.id
            RETURNING *;
        END IF;
    END IF;
END;
$$ LANGUAGE plpgsql;
