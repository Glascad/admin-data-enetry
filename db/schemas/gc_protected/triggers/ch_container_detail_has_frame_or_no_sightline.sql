
DROP FUNCTION IF EXISTS check_container_detail_has_frame_or_no_sightline;

CREATE OR REPLACE FUNCTION check_container_detail_has_frame_or_no_sightline()
RETURNS TRIGGER AS $$
DECLARE
    pq RECTANGLE;
    d DIMENSIONS;
    v BOOLEAN;
BEGIN

    pq := NEW.placement::RECTANGLE;
    d := pq.dimensions;
    v := NEW.vertical;

    IF v THEN
        IF d.x <> 0 THEN
            RAISE EXCEPTION 'Vertical detail %, % with no elevation_frame_id must have 0 sightline. Received %', NEW.id, pq, d.x;
        END IF;
    ELSE
        IF d.y <> 0 THEN
            RAISE EXCEPTION 'Horizontal detail %, % with no elevation_frame_id must have 0 sightline. Received %', NEW.id, pq, d.y;
        END IF;
    END IF;

END;
$$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER check_container_detail_has_frame_or_no_sightline
AFTER INSERT OR UPDATE OF elevation_frame_id, placement ON container_details
INITIALLY DEFERRED
FOR EACH ROW WHEN (NEW.elevation_frame_id IS NULL)
EXECUTE FUNCTION check_container_detail_has_frame_or_no_sightline();
