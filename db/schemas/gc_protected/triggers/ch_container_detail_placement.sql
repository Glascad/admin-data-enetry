
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
    fec RECORD;
    sec RECORD;
    fecid INTEGER;
    secid INTEGER;
    fecpq RECTANGLE_QUAD;
    secpq RECTANGLE_QUAD;
    ecoverlapmin FLOAT;
    ecoverlapmax FLOAT;
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
    SELECT array_agg(placement) FROM container_details cd
    INTO ocdps
    WHERE cd.elevation_frame_id = efid
    AND cd.id <> cdid;

    -- containers
    fecid := COALESCE(NEW.first_container_id, OLD.first_container_id);
    secid := COALESCE(NEW.second_container_id, OLD.second_container_id);

    SELECT daylight_opening FROM elevation_containers
    INTO fec
    WHERE elevation_containers.id = fecid;

    SELECT daylight_opening FROM elevation_containers
    INTO sec
    WHERE elevation_containers.id = secid;

    fecpq := fec.daylight_opening::RECTANGLE_QUAD;
    secpq := sec.daylight_opening::RECTANGLE_QUAD;

    -- compare against sightline
    IF v THEN
        IF cddim.width <> sl THEN
            RAISE EXCEPTION 'Vertical detail %, % must have sightline % as width %', cdid, cdp, sl, cddim.width;
        END IF;
    ELSE
        IF cddim.height <> sl THEN
            RAISE EXCEPTION 'Horizontal detail %, % must have sightline % as height %', cdid, cdp, sl, cddim.height;
        END IF;
    END IF;

    -- compare with first container & second container
    IF v THEN
        IF cdpq.xmin <> fecpq.xmax THEN
            RAISE EXCEPTION 'Detail %, % must be adjacent to first container %, %', cdid, cpd, fecid, fecpq;
        END IF;

        IF cdpq.xmax <> secpq.xmin THEN
            RAISE EXCEPTION 'Detail %, % must be adjacent to second container %, %', cdid, cpd, secid, secpq;
        END IF;

        -- calculate overlap between containers
        ecoverlapmin := greatest(fecpq.ymin, secpq.ymin);
        ecoverlapmax := least(fecpq.ymax, secpq.ymax);

        IF cdpq.ymin <> ecoverlapmin THEN
            RAISE EXCEPTION 'Vertical detail %, %, must end at minimum y overlap % of first container %, % and second container %, %', cdid, cdp, ecoverlapmin, fecid, fecpq, secid, secpq;
        END IF;

        IF cdpq.ymax <> ecoverlapmax THEN
            RAISE EXCEPTION 'Vertical detail %, %, must end at maximum y overlap % of first container %, % and second container %, %', cdid, cdp, ecoverlapmax, fecid, fecpq, secid, secpq;
        END IF;
    ELSE
        IF cdpq.ymin <> fecpq.ymax THEN
            RAISE EXCEPTION 'Detail %, % must be adjacent to first container %, %', cdid, cpd, fecid, fecpq;
        END IF;

        IF cdpq.ymax <> secpq.ymin THEN
            RAISE EXCEPTION 'Detail %, % must be adjacent to second container %, %', cdid, cpd, secid, secpq;
        END IF;

        -- calculate overlap between containers
        ecoverlapmin := greatest(fecpq.xmin, secpq.xmin);
        ecoverlapmax := least(fecpq.xmax, secpq.xmax);

        IF cdpq.xmin <> ecoverlapmin THEN
            RAISE EXCEPTION 'Horizontal detail %, %, must end at minimum x overlap % of first container %, % and second container %, %', cdid, cdp, ecoverlapmin, fecid, fecpq, secid, secpq;
        END IF;

        IF cdpq.xmax <> ecoverlapmax THEN
            RAISE EXCEPTION 'Horizontal detail %, %, must end at maximum x overlap % of first container %, % and second container %, %', cdid, cdp, ecoverlapmax, fecid, fecpq, secid, secpq;
        END IF;
    END IF;

    -- compare against rough opening
    IF NOT rectangle_is_contained(cdp, ep) THEN
        RAISE EXCEPTION 'Detail %, % must fit inside elevation %, %', cdid, cdp, eid, ep;
    END IF;

    -- compare with frame
    IF NOT rectangle_is_contained(cdp, efp) THEN
        RAISE EXCEPTION 'Detail %, % must fit inside frame %, %', cdid, cdps, efid, efp;
    END IF;

    -- compare with other details within frame
    IF NOT no_rectangles_overlap(ocdps::RECTANGLE_QUAD[] || cdp::RECTANGLE_QUAD) THEN
        RAISE EXCEPTION 'Detail %, % must not overlap with other details %', cdid, cdp, ocdps;
    END IF;

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER check_container_detail_placement
AFTER INSERT OR UPDATE OF placement, first_container_id, second_container_id, elevation_frame_id ON container_details
INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION check_container_detail_placement();
