DROP FUNCTION IF EXISTS prepend_system_id;

CREATE OR REPLACE FUNCTION gc_data.prepend_system_id(
    id INTEGER,
    path LTREE
) RETURNS LTREE AS $$
DECLARE
    final_path LTREE;
BEGIN

    RETURN id::TEXT || (
        CASE WHEN subltree(path, 0, 1)::TEXT ~ '^\d+$' AND nlevel(path) > 1
            THEN subpath(path, 1)
            ELSE path
        END
    );

END;
$$ LANGUAGE plpgsql STRICT IMMUTABLE;
