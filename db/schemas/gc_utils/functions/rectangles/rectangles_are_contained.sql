
DROP FUNCTION IF EXISTS rectangles_are_contained;

CREATE OR REPLACE FUNCTION gc_utils.rectangles_are_contained(RECTANGLE_QUAD[], RECTANGLE_QUAD)
RETURNS BOOLEAN AS $$
DECLARE
    rq RECTANGLE_QUAD;
BEGIN

    FOREACH rq IN ARRAY $1 LOOP
        IF rectangle_is_contained(rq, $2) = FALSE THEN
            RETURN FALSE;
        END IF;
    END LOOP;

    RETURN TRUE;

END;
$$ LANGUAGE plpgsql STRICT IMMUTABLE;
