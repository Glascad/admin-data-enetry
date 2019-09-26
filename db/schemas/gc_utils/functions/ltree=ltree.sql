DROP FUNCTION IF EXISTS ltree_eq_ltree;

CREATE OR REPLACE FUNCTION gc_utils.ltree_eq_ltree(LTREE, LTREE)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN $1::TEXT = $2::TEXT;
END;
$$ LANGUAGE plpgsql STRICT IMMUTABLE;

CREATE OPERATOR === (
    LEFTARG = LTREE,
    RIGHTARG = LTREE,
    PROCEDURE = gc_utils.ltree_eq_ltree,
    COMMUTATOR = ===
);

CREATE OPERATOR = (
    LEFTARG = LTREE,
    RIGHTARG = LTREE,
    PROCEDURE = gc_utils.ltree_eq_ltree
);
