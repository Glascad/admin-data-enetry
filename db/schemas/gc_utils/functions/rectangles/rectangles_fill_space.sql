
DROP FUNCTION IF EXISTS rectangles_fill_space;

CREATE OR REPLACE FUNCTION gc_utils.rectangles_fill_space(RECTANGLE_QUAD[], RECTANGLE_QUAD)
RETURNS BOOLEAN AS $$
DECLARE

BEGIN

    RETURN (
        sum_rectangle_area($1) = rectangle_area($2)
        AND
        rectangles_are_contained($1, $2)
        AND
        no_rectangles_overlap($1)
    );

END;
$$ LANGUAGE plpgsql STRICT IMMUTABLE;
