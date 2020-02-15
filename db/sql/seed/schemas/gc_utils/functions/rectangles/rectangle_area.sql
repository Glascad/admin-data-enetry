
DROP FUNCTION IF EXISTS rectangle_area;

CREATE OR REPLACE FUNCTION gc_utils.rectangle_area(RECTANGLE_QUAD)
RETURNS FLOAT AS $$
DECLARE
    dimensions DIMENSIONS := $1.dimensions;
BEGIN

    RETURN dimensions.width * dimensions.height;

END;
$$ LANGUAGE plpgsql STRICT IMMUTABLE;
