
DROP FUNCTION IF EXISTS check_elevation_placement;

CREATE OR REPLACE FUNCTION gc_protected.check_elevation_placement(INTEGER)
RETURNS BOOLEAN AS $$
DECLARE
    bb RECTANGLE;
    ecdlos RECTANGLE[];
    cdps RECTANGLE[];
    efps RECTANGLE[];
BEGIN

    -- gather data
    SELECT (0, 0), rough_opening FROM elevations es
    INTO bb
    WHERE es.id = $1;

    SELECT array_agg(daylight_opening) FROM elevation_containers ecs
    INTO ecdlos
    WHERE ecs.elevation_id = $1;

    SELECT array_agg(placement) FROM elevation_frames efs
    INTO efps
    WHERE efs.elevation_id = $1;

    SELECT array_agg(placement) FROM container_details cds
    INTO cdps
    WHERE cds.elevation_id = $1;

    -- compare data
    IF rectangles_fill_space((ecdlos || efps)::RECTANGLE_QUAD[], bb::RECTANGLE_QUAD, TRUE) = FALSE THEN
        RAISE EXCEPTION 'Invalid placement in elevation %', $1;
    END IF;

    RETURN TRUE;

END;
$$ LANGUAGE plpgsql;
