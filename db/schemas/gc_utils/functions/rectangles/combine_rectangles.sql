
DROP FUNCTION IF EXISTS combine_rectangles;

CREATE OR REPLACE FUNCTION gc_utils.combine_rectangles(RECTANGLE_QUAD[])
RETURNS RECTANGLE_QUAD AS $$
DECLARE
    rq RECTANGLE_QUAD;
    xmin FLOAT;
    xmax FLOAT;
    ymin FLOAT;
    ymax FLOAT;
    width FLOAT;
    height FLOAT;
    origin COORDINATE;
    dimensions DIMENSIONS;
    combined RECTANGLE_QUAD;
BEGIN

    FOREACH rq IN ARRAY $1 LOOP

        xmin := least(xmin, rq.xmin);
        xmax := greatest(xmax, rq.xmax);
        ymin := least(ymin, rq.ymin);
        ymax := greatest(ymax, rq.ymax);

    END LOOP;

    width := xmax - xmin;
    height := ymax - ymin;

    origin := (xmin, ymin)::COORDINATE;
    dimensions := (width, height)::DIMENSIONS;

    combined := (xmin, ymin, xmax, ymax, origin, dimensions)::RECTANGLE_QUAD;

    IF validate_rectangle(combined) THEN
        RETURN combined;
    END IF;

END;
$$ LANGUAGE plpgsql STRICT IMMUTABLE;
