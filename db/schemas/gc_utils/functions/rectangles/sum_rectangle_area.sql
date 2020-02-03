
DROP FUNCTION IF EXISTS sum_rectangle_area;

CREATE OR REPLACE FUNCTION gc_utils.sum_rectangle_area(RECTANGLE_QUAD[])
RETURNS FLOAT AS $$
DECLARE
    area FLOAT := 0;
    rq RECTANGLE_QUAD;
BEGIN

    FOREACH rq IN ARRAY $1 LOOP

        area := area + rectangle_area(rq);

    END LOOP;

    RETURN area;

END;
$$ LANGUAGE plpgsql STRICT IMMUTABLE;
