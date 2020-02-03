
DROP FUNCTION IF EXISTS validate_rectangle(RECTANGLE);
DROP FUNCTION IF EXISTS validate_rectangle(RECTANGLE_QUAD);

CREATE OR REPLACE FUNCTION gc_utils.validate_rectangle(RECTANGLE)
RETURNS BOOLEAN AS $$
DECLARE
    origin COORDINATE := $1.origin;
    dimensions DIMENSIONS := $1.dimensions;
BEGIN

    <<LOOP DIM (width, height)>>

        IF dimensions.<<DIM>> <= 0 THEN
            RAISE EXCEPTION 'Rectangle <<DIM>> cannot be less than or equal to 0. Received: %', dimensions.<<DIM>>;
        END IF;

    <<END LOOP>>

    RETURN TRUE;

END;
$$ LANGUAGE plpgsql STRICT IMMUTABLE;



CREATE OR REPLACE FUNCTION gc_utils.validate_rectangle(RECTANGLE_QUAD)
RETURNS BOOLEAN AS $$
DECLARE
    origin COORDINATE := $1.origin;
    dimensions DIMENSIONS := $1.dimensions;
BEGIN

    IF validate_rectangle((origin, dimensions)::RECTANGLE) THEN

        <<LOOP
            MAX (xmax, ymax)
            MIN (xmin, ymin)
            DIM (x, y)
            ODIM (width, height)
        >>

            IF $1.<<MAX>> <= $1.<<MIN>> THEN

                RAISE EXCEPTION 'Rectangle <<MAX>> % cannot be less than or equal to <<MIN>> %', $1.<<MAX>>, $1.<<MIN>>;

            END IF;

            IF $1.<<MAX>> <> (origin.<<DIM>> + dimensions.<<ODIM>>) THEN

                RAISE EXCEPTION 'Rectangle <<MAX>> % must be equal to origin.<<DIM>> % + dimensions.<<ODIM>> %', <<MAX>>, origin.<<DIM>>, dimensions.<<ODIM>>;

            END IF;

            IF $1.<<MIN>> <> origin.<<DIM>> THEN

                RAISE EXCEPTION 'Rectangle <<MIN>> % must be equal to origin.<DIM>> %', <<MIN>>, origin.<<DIM>>;

            END IF;

        <<END LOOP>>

    END IF;

    RETURN TRUE;

END;
$$ LANGUAGE plpgsql STRICT IMMUTABLE;
