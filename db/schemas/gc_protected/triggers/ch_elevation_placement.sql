
DROP FUNCTION IF EXISTS check_elevation_placement;

CREATE OR REPLACE FUNCTION gc_protected.check_elevation_placement()
RETURNS TRIGGER AS $$
DECLARE
    eid INTEGER;
    bb RECTANGLE;
    ecdlos RECTANGLE[];
    cdps RECTANGLE[];
    efps RECTANGLE[];
BEGIN

    -- gather data
    eid := COALESCE(NEW.id, OLD.id);

    SELECT (0, 0), rough_opening FROM elevations es
    INTO bb
    WHERE es.id = eid;

    SELECT array_agg(daylight_opening) FROM elevation_containers ecs
    INTO ecdlos
    WHERE ecs.elevation_id = eid;

    SELECT array_agg(placement) FROM elevation_frames efs
    INTO efps
    WHERE efs.elevation_id = eid;

    SELECT array_agg(placement) FROM container_details cds
    INTO cdps
    WHERE cds.elevation_id = eid;

    -- compare data
    IF rectangles_fill_space((ecdlos || efps)::RECTANGLE_QUAD[], bb::RECTANGLE_QUAD, TRUE) = FALSE THEN
        RAISE EXCEPTION 'Invalid placement in elevation %', eid;
    END IF;

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER check_elevation_placement
AFTER INSERT OR UPDATE OF rough_opening ON elevations
INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION check_elevation_placement();
