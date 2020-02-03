
DROP FUNCTION IF EXISTS rectangle_to_rectangle_quad;

CREATE OR REPLACE FUNCTION gc_utils.rectangle_to_rectangle_quad(RECTANGLE)
RETURNS RECTANGLE_QUAD AS $$
DECLARE
    origin COORDINATE;
    dimensions DIMENSIONS;
    ymax FLOAT;
    ymin FLOAT;
    xmin FLOAT;
    xmax FLOAT;
BEGIN

    origin := $1.origin;
    dimensions := $1.dimensions;

    xmin := origin.x;
    ymin := origin.y;
    xmax := xmin + dimensions.width;
    ymax := ymin + dimensions.height;

    RETURN (xmin, ymin, xmax, ymax, origin, dimensions)::RECTANGLE_QUAD;

END;
$$ LANGUAGE plpgsql STRICT IMMUTABLE;

CREATE CAST (RECTANGLE AS RECTANGLE_QUAD)
WITH FUNCTION rectangle_to_rectangle_quad
AS IMPLICIT;
