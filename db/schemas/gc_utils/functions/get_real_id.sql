DROP FUNCTION IF EXISTS gc_utils.get_real_id;

CREATE OR REPLACE FUNCTION gc_utils.get_real_id (
    id_pairs ID_PAIR[],
    fake_id INTEGER,
    throw_on_invalid_fake_id BOOLEAN = FALSE
) RETURNS INTEGER AS $$
DECLARE
    f ALIAS FOR fake_id;
    real_id INTEGER;
BEGIN
    SELECT p.real_id
    FROM UNNEST (id_pairs) p
    INTO real_id
    WHERE p.fake_id = f;

    IF real_id IS NULL AND throw_on_invalid_fake_id = TRUE THEN
        RAISE EXCEPTION 'Fake id % not found in list %', fake_id, id_pairs;
    END IF;

    RETURN real_id;
END;
$$ LANGUAGE plpgsql STRICT IMMUTABLE;
