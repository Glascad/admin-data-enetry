
DROP FUNCTION IF EXISTS rectangles_overlap;

CREATE OR REPLACE FUNCTION gc_utils.rectangles_overlap(RECTANGLE_QUAD, RECTANGLE_QUAD)
RETURNS BOOLEAN AS $$
DECLARE
BEGIN

    RETURN (
        values_overlap(($1.xmin, $1.xmax)::LINE_1D, ($2.xmin, $2.xmax)::LINE_1D)
        AND
        values_overlap(($1.ymin, $1.ymax)::LINE_1D, ($2.ymin, $2.ymax)::LINE_1D)
    );

END;
$$ LANGUAGE plpgsql STRICT IMMUTABLE;
