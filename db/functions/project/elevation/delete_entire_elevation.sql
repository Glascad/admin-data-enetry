DROP FUNCTION IF EXISTS delete_entire_elevation;

CREATE OR REPLACE FUNCTION delete_entire_elevation(elevation_id INTEGER)
RETURNS INTEGER AS $$
DECLARE
    eid ALIAS FOR elevation_id;
BEGIN
    DELETE FROM container_details
        WHERE container_details.elevation_id = eid;

    DELETE FROM elevation_containers
        WHERE elevation_containers.elevation_id = eid;

    DELETE FROM elevations
        WHERE elevations.id = eid;
    
    RETURN eid;
END;
$$ LANGUAGE plpgsql;
