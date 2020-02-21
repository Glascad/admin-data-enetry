
DROP FUNCTION IF EXISTS check_elevation_frame_placement;

CREATE OR REPLACE FUNCTION check_elevation_frame_placement()
RETURNS TRIGGER AS $$
DECLARE
    eid INTEGER;
    ep RECTANGLE;
    epq RECTANGLE_QUAD;
    efid INTEGER;
    efp RECTANGLE;
    efpq RECTANGLE_QUAD;
    efo COORDINATE;
    efdim DIMENSIONS;
    v BOOLEAN;
    sl FLOAT;
    cdids INTEGER[];
    fecids INTEGER[];
    secids INTEGER[];
    cdps RECTANGLE[];
    fecdlos RECTANGLE[];
    secdlos RECTANGLE[];
    r RECTANGLE;
    rq RECTANGLE_QUAD;
    o COORDINATE;
    d DIMENSIONS;
BEGIN

    -- gather data
    eid := COALESCE(NEW.elevation_id, OLD.elevation_id);

    SELECT (0, 0), rough_opening FROM elevations e
    INTO ep
    WHERE e.id = eid;

    epq := ep::RECTANGLE_QUAD;

    efid := COALESCE(NEW.id, OLD.id);
    efp := COALESCE(NEW.placement, OLD.placement);
    efpq := efp::RECTANGLE_QUAD;
    efo := efp.origin;
    efdim := efp.dimensions;
    v := COALESCE(NEW.vertical, OLD.vertical);

    SELECT sightline FROM systems s
    INTO sl
    WHERE s.id = (
        SELECT system_id FROM system_sets ss
        WHERE ss.id = (
            SELECT system_set_id FROM elevations e
            WHERE e.id = eid
        )
    );

    SELECT array_agg(id), array_agg(first_container_id), array_agg(second_container_id), array_agg(placement) FROM container_details cd
    INTO cdids, fecids, secids, cdps
    WHERE cd.elevation_frame_id = efid;

    SELECT array_agg(daylight_opening) FROM elevation_containers ec
    INTO fecdlos
    WHERE ec.id IN (
        SELECT * FROM unnest(fecids)
    );

    SELECT array_agg(daylight_opening) FROM elevation_containers ec
    INTO secdlos
    WHERE ec.id IN (
        SELECT * FROM unnest(secids)
    );

    -- compare against rough opening
    IF NOT rectangle_is_contained(efp, ep::RECTANGLE_QUAD) THEN
        RAISE EXCEPTION 'Frame %, % must fit inside elevation %, %', efid, efp, eid, ep;
    END IF;

    -- compare with details
        -- details should all be contained within the frame
        IF NOT rectangles_are_contained(cdps, efp) THEN
            RAISE EXCEPTION 'Frame %, % must contain all details %, %', efid, efp, cdids, cdps;
        END IF;

        -- details should not overlap each other
        IF NOT no_rectangles_overlap(cdps) THEN
            RAISE EXCEPTION 'Frame %''s details %, % must not overlap', efid, cdids, cdps;
        END IF;

        -- details and frame should all have same sightline and x|y dimension
        IF (
            (v AND efdim.width <> sl)
            OR
            (NOT v AND efdim.height <> sl)
        ) THEN
            RAISE EXCEPTION 'Frame %, % must have correct sightline %', efid, efp, sl;
        END IF;

        IF cdps IS NOT NULL THEN
            FOREACH r IN ARRAY cdps LOOP

                d := r.dimensions;

                IF (
                    (v AND efdim.width <> d.width)
                    OR
                    (NOT v AND efdim.height <> d.height)
                ) THEN
                    RAISE EXCEPTION 'Frame %, % and its detail % must all have same sightline', efid, efp, r;
                END IF;

            END LOOP;
        ELSE
            RAISE EXCEPTION 'Frame %, % must contain details', efid, efp;
        END IF;

        -- ends of frame should match ends of end details (for verticals maybe plus 1 SL)
        rq := combine_rectangles(cdps);

        IF v THEN
            IF ((
                efpq.ymin <> rq.ymin
                AND
                efpq.ymin <> rq.ymin - sl
            ) OR (
                efpq.ymax <> rq.ymax
                AND
                efpq.ymax <> rq.ymax + sl
            )) THEN
                RAISE EXCEPTION 'Vertical frame %, % must end at end of details %, % or extend one sightline beyond', efid, efp, rq, cdps;
            END IF;
        ELSE
            IF (
                efpq.xmin <> rq.xmin
                OR
                efpq.xmax <> rq.xmax
            ) THEN
                RAISE EXCEPTION 'Horizontal frame %, % must end at end of details %, %', efid, efp, rq, cdps;
            END IF;
        END IF;

    -- compare with containers?
    -- frame should be adjacent to all first containers
    IF fecdlos IS NOT NULL THEN
        FOREACH rq In ARRAY fecdlos::RECTANGLE_QUAD[] LOOP

            IF (
                (v AND rq.xmax <> efpq.xmin)
                OR
                (NOT v AND rq.ymax <> efpq.ymin)
            ) THEN
                RAISE EXCEPTION 'Frame %, % must be adjacent to first container %', efid, efp, rq;
            END IF;

        END LOOP;
    ELSE
        IF (
            (v AND efo.x <> 0)
            OR
            (NOT v AND efo.y <> 0)
        ) THEN
            RAISE EXCEPTION 'Frame %, % with no first containers must be adjacent to RO', efid, efp;
        END IF;
    END IF;

    -- and second containers
    IF secdlos IS NOT NULL THEN
        FOREACH rq In ARRAY secdlos::RECTANGLE_QUAD[] LOOP

            IF (
                (v AND rq.xmin <> efpq.xmax)
                OR
                (NOT v AND rq.ymin <> efpq.ymax)
            ) THEN
                RAISE EXCEPTION 'Frame %, % must be adjacent to second container %', efid, efp, rq;
            END IF;

        END LOOP;
    ELSE
        IF (
            (v AND efpq.xmax <> epq.xmax)
            OR
            (NOT v AND efpq.ymax <> epq.ymax)
        ) THEN
            RAISE EXCEPTION 'Frame %, % with no first containers must be adjacent to RO', efid, efp;
        END IF;
    END IF;

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER check_elevation_frame_placement
AFTER INSERT OR UPDATE OF placement ON elevation_frames
INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION check_elevation_frame_placement();
