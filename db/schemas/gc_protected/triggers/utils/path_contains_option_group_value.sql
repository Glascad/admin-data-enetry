DROP FUNCTION IF EXISTS path_contains_option_group_value;

CREATE OR REPLACE FUNCTION gc_protected.path_contains_option_group_value(
    path LTREE,
    option_name OPTION_NAME,
    option_value_name OPTION_VALUE_NAME
) RETURNS BOOLEAN AS $$
DECLARE
    o ALIAS FOR option_name;
    v ALIAS FOR option_value_name;
BEGIN

    IF (
        path ~ ('*.' || o || '.*')::LQUERY
        AND
        NOT (path ~ ('*.' || o || '.' || v || '.*')::LQUERY)
    ) THEN

        RETURN FALSE;

    END IF;

    RETURN TRUE;

END;
$$ LANGUAGE plpgsql STRICT IMMUTABLE;
