
DROP FUNCTION IF EXISTS no_rectangles_overlap;

CREATE OR REPLACE FUNCTION gc_utils.no_rectangles_overlap(rqs RECTANGLE_QUAD[])
RETURNS BOOLEAN AS $$
DECLARE
    rq RECTANGLE_QUAD;
    orq RECTANGLE_QUAD;
BEGIN

    FOREACH rq IN ARRAY rqs LOOP
        rqs := array_remove(rqs, rq);

        FOREACH orq IN ARRAY rqs LOOP
            IF rectangles_overlap(rq, orq) THEN
                RETURN FALSE;
            END IF;
        END LOOP;
    END LOOP;

    RETURN TRUE;

END;
$$ LANGUAGE plpgsql STRICT IMMUTABLE;
