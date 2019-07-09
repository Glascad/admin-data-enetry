
DROP FUNCTION IF EXISTS track_elevation_updates;

CREATE OR REPLACE FUNCTION track_elevation_updates(elevation_id INTEGER)
RETURNS TRIGGER AS $$
BEGIN
    IF elevation_id IS NOT NULL THEN
        UPDATE elevations SET
            last_updated_at = CURRENT_TIMESTAMP,
            last_updated_by = get_current_user_id
        WHERE elevations.id = elevation_id;
        RETURN NULL;
    ELSE
        NEW.last_updated_at = CURRENT_TIMESTAMP,
        NEW.last_updated_by = get_current_user_id
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER track_elevation_updates
BEFORE INSERT, UPDATE ON elevations
FOR EACH ROW EXECUTE PROCEDURE track_elevation_updates();

CREATE TRIGGER track_nested_elevation_updates
BEFORE INSERT, UPDATE ON elevation_containers
FOR EACH ROW EXECUTE PROCEDURE track_elevation_updates(NEW.elevation_id);

CREATE TRIGGER track_nested_elevation_updates
BEFORE INSERT, UPDATE ON container_details
FOR EACH ROW EXECUTE PROCEDURE track_elevation_updates(NEW.elevation_id);
