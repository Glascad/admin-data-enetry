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

    RETURN cp.parent_configuration_option_value_path || ('__PT' || cp.id || '__') || pn;

END;
$$ LANGUAGE plpgsql STABLE;
