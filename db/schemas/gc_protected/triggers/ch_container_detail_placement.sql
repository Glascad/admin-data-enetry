
DROP FUNCTION IF EXISTS check_container_detail_placement;

CREATE OR REPLACE FUNCTION gc_protected.check_container_detail_placement()
RETURNS TRIGGER AS $$
DECLARE
    eid INTEGER;
    ep RECTANGLE;
    epq RECTANGLE_QUAD;
    cdid INTEGER;
    cdp RECTANGLE;
    cdpq RECTANGLE_QUAD;
    cdo COORDINATE;
    cddim DIMENSIONS;
    ocdps RECTANGLE[];
    v BOOLEAN;
    sl FLOAT;
    efid INTEGER;
    ef RECORD;
    efp RECTANGLE;
BEGIN

    -- gather data
    -- elevation
    eid := COALESCE(NEW.elevation_id, OLD.elevation_id);

    SELECT (0, 0), rough_opening FROM elevations e
    INTO ep
    WHERE e.id = eid;

    epq := ep::RECTANGLE_QUAD;

    -- detail
    cdid := COALESCE(NEW.id, OLD.id);
    cdp := COALESCE(NEW.placement, OLD.placement);
    cdpq := cdp::RECTANGLE_QUAD;
    cdo := cdp.origin;
    cddim := cdp.dimensions;
    v := COALESCE(NEW.vertical, OLD.vertical);

    -- sightline
    SELECT sightline FROM systems s
    INTO sl
    WHERE s.id = (
        SELECT system_id FROM system_sets ss
        WHERE ss.id = (
            SELECT system_set_id FROM elevations e
            WHERE e.id = eid
        )
    );

    -- frame
    efid := COALESCE(NEW.elevation_frame_id, OLD.elevation_frame_id);

    SELECT placement FROM elevation_frames
    INTO ef
    WHERE elevation_frames.id = efid;

    efp := ef.placement;

    -- other details
    -- SELECT array_agg(placement) FROM container_details

    -- compare against rough opening
    IF NOT rectangle_is_contained(cdp, ep) THEN
        RAISE EXCEPTION 'Detail %, % must fit inside elevation %, %', cdid, cdp, eid, ep;
    END IF;

    -- compare with frame
    IF NOT rectangle_is_contained(cdp, efp) THEN
        RAISE EXCEPTION 'Detail %, % must fit inside frame %, %', cdid, cdps, efid, efp;
    END IF;

    -- compare with other details within frame
    -- compare with first container
    -- compare with second container

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER check_container_detail_placement
AFTER INSERT OR UPDATE OF placement, first_container_id, second_container_id, elevation_frame_id ON container_details
INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION check_container_detail_placement();
