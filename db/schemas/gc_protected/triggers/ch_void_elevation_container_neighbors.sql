
DROP FUNCTION IF EXISTS check_void_elevation_container_neighbors;

CREATE OR REPLACE FUNCTION check_void_elevation_container_neighbors()
RETURNS TRIGGER AS $$
DECLARE
    <<LOOP
        DET_DIR (above, below, left_of, right_of)
        THIS (first, second, second, first)
        OTHER (second, first, first, second)
        VERT (TRUE, TRUE, FALSE, FALSE)
    >>
        <<DET_DIR>> INTEGER[];
    <<END LOOP>>
    c TEXT;
BEGIN

    c := NEW.contents::TEXT;

    <<LOOP
        DET_DIR (above, below, left_of, right_of)
        THIS (first, second, second, first)
        OTHER (second, first, first, second)
        VERT (FALSE, FALSE, TRUE, TRUE)
    >>
        SELECT array_agg(id) FROM elevation_containers
        WHERE elevation_containers.contents::TEXT ~ 'VOID'
        AND elevation_containers.id IN (
            SELECT <<OTHER>>_container_id FROM container_details
            WHERE container_details.<<THIS>>_container_id = NEW.id
            AND container_details.vertical = <<VERT>>
        ) INTO <<DET_DIR>>;
    <<END LOOP>>

    -- stepped heads & raised curbs cannot have another deleted container above or beneath them
    IF c ~ 'STEPPED_HEAD|RAISED_CURB' THEN

        <<LOOP CON_DIR (above, below)>>
            IF <<CON_DIR>> IS NOT NULL THEN
                RAISE EXCEPTION 'Container % with % cannot have other VOID containers <<CON_DIR>> it. Received %', NEW.id, c, <<CON_DIR>>;
            END IF;
        <<END LOOP>>

    -- internal voids cannot have any other deleted containers around them
    ELSIF c ~ 'INTERNAL' THEN

        <<LOOP CON_DIR (above, below, left_of, right_of)>>
            IF <<CON_DIR>> IS NOT NULL THEN
                RAISE EXCEPTION 'Container % with % cannot have other VOID containers <<CON_DIR>> it. Received %', NEW.id, c, <<CON_DIR>>;
            END IF;
        <<END LOOP>>

    END IF;

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER check_void_elevation_container_neighbors
AFTER INSERT OR UPDATE OF contents ON elevation_containers
-- INITIALLY DEFERRED
FOR EACH ROW WHEN (NEW.contents::TEXT ~ 'VOID')
EXECUTE FUNCTION check_void_elevation_container_neighbors();
