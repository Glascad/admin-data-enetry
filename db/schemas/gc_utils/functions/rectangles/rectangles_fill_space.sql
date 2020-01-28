
DROP FUNCTION IF EXISTS rectangles_fill_space;

CREATE OR REPLACE FUNCTION gc_utils.rectangles_fill_space(RECTANGLE_QUAD[], RECTANGLE_QUAD, BOOLEAN = FALSE)
RETURNS BOOLEAN AS $$
DECLARE
    areas_equal BOOLEAN;
    contained BOOLEAN;
    no_overlap BOOLEAN;
BEGIN

    areas_equal := sum_rectangle_area($1) = rectangle_area($2);
    contained := rectangles_are_contained($1, $2, $3);
    no_overlap := no_rectangles_overlap($1, $3);

    IF $3 THEN
        <<LOOP CHECK (areas_equal, contained, no_overlap)>>

            IF <<CHECK>> = FALSE THEN

                RAISE EXCEPTION '<<CHECK>> is FALSE';

            END IF;

        <<END LOOP>>
    END IF;

    RETURN (areas_equal AND contained AND no_overlap);

END;
$$ LANGUAGE plpgsql STRICT IMMUTABLE;
