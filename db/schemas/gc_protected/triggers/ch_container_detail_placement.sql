
DROP FUNCTION IF EXISTS check_container_detail_placement;

CREATE OR REPLACE FUNCTION gc_protected.check_container_detail_placement()
RETURNS TRIGGER AS $$
DECLARE
BEGIN

    -- compare with frame
    -- compare with other details within frame
    -- compare with first container
    -- compare with second container

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER check_container_detail_placement
AFTER INSERT OR UPDATE OF placement ON container_details
INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION check_container_detail_placement();
