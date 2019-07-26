DROP FUNCTION IF EXISTS gc_utils.get_real_id;

CREATE OR REPLACE FUNCTION gc_utils.get_real_id (
    id_pairs ID_PAIR[],
    fake_id INTEGER
) RETURNS INTEGER AS $$
DECLARE
    f ALIAS FOR fake_id;
    real_id INTEGER;
BEGIN
    SELECT p.id
        FROM UNNEST (id_pairs) p
        INTO real_id
        WHERE p.fake_id = f;
    RETURN real_id;
END;
$$ LANGUAGE plpgsql IMMUTABLE;
