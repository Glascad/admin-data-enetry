
DROP FUNCTION IF EXISTS rectangle_is_contained;

CREATE OR REPLACE FUNCTION gc_utils.rectangle_is_contained(RECTANGLE_QUAD, RECTANGLE_QUAD)
RETURNS BOOLEAN AS $$
BEGIN

    RETURN (
        $1.ymax <= $2.ymax
        AND
        $1.ymin >= $2.ymin
        AND
        $1.xmin >= $2.xmin
        AND
        $1.xmax <= $2.xmax
    );

END;
$$ LANGUAGE plpgsql STRICT IMMUTABLE;
