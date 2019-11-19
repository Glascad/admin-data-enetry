DROP FUNCTION IF EXISTS configuration_parts_path;

CREATE OR REPLACE FUNCTION gc_protected.configuration_parts_path(cp CONFIGURATION_PARTS)
RETURNS LTREE AS $$
DECLARE
    pn TEXT;
BEGIN

    SELECT part_number
    FROM parts
    INTO pn
    WHERE parts.id = cp.part_id;

    -- IF cp.parent_configuration_option_value_path IS NULL THEN
        -- RAISE EXCEPTION 'cov path is %, dc path is %, id is %', cp.parent_configuration_option_value_path, cp.parent_detail_configuration_path, cp.id;
    -- END IF;

    RETURN COALESCE(
        cp.parent_configuration_option_value_path,
        cp.parent_detail_configuration_path
    ) || (
        '__PT' || cp.id || '__'
    ) || regexp_replace(
        pn,
        '\W+',
        '_',
        'g'
    );

END;
$$ LANGUAGE plpgsql STABLE;
