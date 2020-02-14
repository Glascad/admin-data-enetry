
DROP FUNCTION IF EXISTS check_container_detail_deletion;

CREATE OR REPLACE FUNCTION check_container_detail_deletion()
RETURNS TRIGGER AS $$
DECLARE
    v BOOLEAN;
    vtext TEXT;
    fecid INTEGER;
    secid INTEGER;
    ocd RECORD;
    fec RECORD;
    sec RECORD;
    cdp RECTANGLE_QUAD;
    fecdlo RECTANGLE_QUAD;
    secdlo RECTANGLE_QUAD;
BEGIN

    v := OLD.vertical;
    vtext := CASE WHEN v THEN 'vertical' ELSE 'horizontal' END;
    fecid := OLD.first_container_id;
    secid := OLD.second_container_id;

    SELECT * FROM container_details cd
    WHERE cd.first_container_id = fecid
    AND cd.second_container_id = secid
    AND cd.vertical = v
    INTO ocd;

    SELECT * FROM elevation_containers ec
    WHERE ec.id = fecid
    INTO fec;

    SELECT * FROM elevation_containers ec
    WHERE ec.id = secid
    INTO sec;

    cdp := OLD.placement::RECTANGLE_QUAD;
    fecdlo := fec.daylight_opening::RECTANGLE_QUAD;
    secdlo := sec.daylight_opening::RECTANGLE_QUAD;

    IF (
        -- check that the detail was replaced by another.
        ocd IS NOT NULL
    ) OR (
        -- or that first or second container was also deleted
        (
            fecid IS NOT NULL
            AND
            fec IS NULL
        ) OR (
            secid IS NOT NULL
            AND
            sec IS NULL
        )
    ) OR (
        -- or that the containers are no longer adjacent to the detail's placement (they must have been updated and therefore checked already)
        (
            v AND (
                cdp.xmin <> fecdlo.xmax
                OR
                cdp.xmax <> secdlo.xmin
                OR
                NOT values_overlap(
                    (fecdlo.ymin, fecdlo.ymax)::LINE_1D,
                    (secdlo.ymin, secdlo.ymax)::LINE_1D
                )
            )
        ) OR (
            NOT v AND (
                cdp.ymin <> fecdlo.ymax
                OR
                cdp.ymax <> secdlo.ymin
                OR
                NOT values_overlap(
                    (fecdlo.xmin, fecdlo.xmax)::LINE_1D,
                    (secdlo.xmin, secdlo.xmax)::LINE_1D
                )
            )
        )
    ) THEN
        RETURN OLD;
    ELSE
        RAISE EXCEPTION 'Cannot delete % detail %, % between first container %, % and second container %, % without replacing it or moving/deleting the containers', vtext, OLD.id, OLD, fecid, fec, secid, sec;
    END IF;

END;
$$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER check_container_detail_deletion
AFTER DELETE ON container_details
INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION check_container_detail_deletion();
