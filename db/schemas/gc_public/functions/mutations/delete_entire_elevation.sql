DROP FUNCTION IF EXISTS delete_entire_elevation;

CREATE OR REPLACE FUNCTION delete_entire_elevation(elevation_id INTEGER)
RETURNS INTEGER AS $$
DECLARE
    pid INTEGER;
    eid ALIAS FOR elevation_id;
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

        DELETE FROM container_details
            WHERE container_details.elevation_id = eid;

        DELETE FROM elevation_containers
            WHERE elevation_containers.elevation_id = eid;

        DELETE FROM elevations
            WHERE elevations.id = eid;
        
        RETURN eid;

    END IF;
END;
$$ LANGUAGE plpgsql;
