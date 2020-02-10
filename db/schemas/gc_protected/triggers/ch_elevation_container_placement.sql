
DROP FUNCTION IF EXISTS check_elevation_container_placement;

CREATE OR REPLACE FUNCTION gc_protected.check_elevation_container_placement()
RETURNS TRIGGER AS $$
DECLARE
    -- elevation id & placement
    eid INTEGER;
    ep RECTANGLE;
    epq RECTANGLE_QUAD;
    -- container id & placement
    ecid INTEGER;
    ecdlo RECTANGLE_QUAD;
    eco COORDINATE;
    ecdim DIMENSIONS;
    <<LOOP
        ALIAS (t, b, l, r)
        ID (tfid, bfid, lfid, rfid)
        RECT (tfp, bfp, lfp, rfp)
    >>
        <<ALIAS>> RECORD;
        -- frame ids
        <<ID>> INTEGER;
        -- frame placements
        <<RECT>> RECTANGLE_QUAD;
    <<END LOOP>>
    -- voids
    contents TEXT;
    dlo RECTANGLE_QUAD;
    oc RECORD;
BEGIN

    -- gather data
    eid := COALESCE(NEW.elevation_id, OLD.elevation_id);

    SELECT (0, 0), rough_opening FROM elevations
    INTO ep
    WHERE elevations.id = eid;

    epq := ep::RECTANGLE_QUAD;

    ecid := COALESCE(NEW.id, OLD.id);
    ecdlo := COALESCE(NEW.daylight_opening, OLD.daylight_opening)::RECTANGLE_QUAD;
    eco := ecdlo.origin;
    ecdim := ecdlo.dimensions;

    <<LOOP
        ALIAS (t, b, l, r)
        ID (tfid, bfid, lfid, rfid)
        RECT (tfp, bfp, lfp, rfp)
        VERT (FALSE, FALSE, TRUE, TRUE)
        FIRST (first, second, second, first)
    >>

        SELECT id, placement FROM elevation_frames ef
        INTO <<ALIAS>>
        WHERE ef.id IN (
            SELECT elevation_frame_id FROM container_details cd
            WHERE cd.vertical = <<VERT>>
            AND cd .<<FIRST>>_container_id = ecid
        );

        <<ID>> := <<ALIAS>>.id;
        <<RECT>> := <<ALIAS>>.placement::RECTANGLE_QUAD;
        
    <<END LOOP>>

    contents := COALESCE(NEW.contents, OLD.contents)::TEXT;
    dlo := COALESCE(NEW.daylight_opening, OLD.daylight_opening)::RECTANGLE_QUAD;

    -- compare against rough opening
    IF NOT rectangle_is_contained(ecdlo, ep::RECTANGLE_QUAD) THEN
        RAISE EXCEPTION 'Container %, % must fit inside elevation %, %', ecid, ecdlo, eid, ep;
    END IF;

    -- compare against all 4 frames
    -- right
    IF contents ~ 'RIGHT_NOTCH' THEN
        IF ecdlo.xmax <> epq.xmax THEN
            RAISE EXCEPTION '% container %, % must be adjacent to right edge of RO %', contents, ecid, ecdlo, epq;
        END IF;
    ELSE
        IF ecdlo.xmax <> rfp.xmin THEN
            RAISE EXCEPTION 'Container %, % and its right frame %, % must be adjacent', ecid, ecdlo, rfid, rfp;
        END IF;
    END IF;

    -- left
    IF contents ~ 'LEFT_NOTCH' THEN
        IF ecdlo.xmin <> epq.xmin THEN
            RAISE EXCEPTION '% container %, % must be adjacent to left edge of RO %', contents, ecid, ecdlo, epq;
        END IF;
    ELSE
        IF ecdlo.xmin <> lfp.xmax THEN
            RAISE EXCEPTION 'Container %, % and its left frame %, % must be adjacent', ecid, ecdlo, lfid, lfp;
        END IF;
    END IF;

    -- top
    IF contents ~ 'STEPPED_HEAD' THEN
        IF ecdlo.ymax <> epq.ymax THEN
            RAISE EXCEPTION '% container %, % must be adjacent to top edge of RO %', contents, ecid, ecdlo, epq;
        END IF;
    ELSE
        IF ecdlo.ymax <> tfp.ymin THEN
            RAISE EXCEPTION 'Container %, % and its top frame %, % must be adjacent', ecid, ecdlo, tfid, tfp;
        END IF;
    END IF;

    -- bottom
    IF contents ~ 'RAISED_CURB' THEN
        IF ecdlo.ymin <> epq.ymin THEN
            RAISE EXCEPTION '% container %, % must be adjacent to bottom edge of RO %', contents, ecid, ecdlo, epq;
        END IF;
    ELSE
        IF ecdlo.ymin <> bfp.ymax THEN
            RAISE EXCEPTION 'Container %, % and its bottom frame %, % must be adjacent', ecid, ecdlo, bfid, bfp;
        END IF;
    END IF;

    -- internal voids
    IF contents ~ 'VOID_INTERNAL' THEN
        
    END IF;

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER check_elevation_container_placement
AFTER INSERT OR UPDATE OF daylight_opening ON elevation_containers
INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION check_elevation_container_placement();
