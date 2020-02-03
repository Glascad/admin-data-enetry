
DROP FUNCTION IF EXISTS values_overlap;

CREATE OR REPLACE FUNCTION gc_utils.values_overlap(LINE_1D, LINE_1D)
RETURNS BOOLEAN AS $$
DECLARE
    amin FLOAT := least($1.a, $1.b);
    amax FLOAT := greatest($1.a, $1.b);
    bmin FLOAT := least($1.a, $1.b);
    bmax FLOAT := greatest($1.a, $1.b);
BEGIN

    RETURN (
        (
            amax < bmax
            AND
            amax > bmin
        ) OR (
            bmax < amax
            AND
            bmax > amin
        )
    );

END;
$$ LANGUAGE plpgsql STRICT IMMUTABLE;
