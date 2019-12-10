DROP FUNCTION IF EXISTS check_system_set_path_grouped_option_values;

CREATE OR REPLACE FUNCTION gc_public.check_system_set_path_grouped_option_values(
    path LTREE,
    grouped_option_values OPTION_VALUE_PAIR[]
) RETURNS LTREE AS $$
DECLARE
    govs ALIAS FOR grouped_option_values;
    op OPTION_VALUE_PAIR;
BEGIN

    IF govs IS NOT NULL THEN
        FOREACH op IN ARRAY (govs) LOOP

            IF (
                path ~ ('*.' || op.option_name || '.*')::LQUERY
                AND
                NOT (path ~ ('*.' || op.option_name || '.' || op.name || '.*')::LQUERY)
            ) THEN

                RAISE EXCEPTION 'path `%` should have value `%` selected for grouped option `%`', path, op.name, op.option_name;

            END IF;

        END LOOP;
    END IF;

    RETURN path;

END;
$$ LANGUAGE plpgsql STRICT IMMUTABLE;
