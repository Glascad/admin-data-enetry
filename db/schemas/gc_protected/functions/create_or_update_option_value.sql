DROP FUNCTION IF EXISTS create_or_update_option_value;

CREATE OR REPLACE FUNCTION gc_protected.create_or_update_option_value (
    value_name OPTION_VALUE_NAME,
    option_name SYSTEM_OPTION_NAME,
    system_id INTEGER
) RETURNS OPTION_VALUES AS $$
DECLARE
    vn ALIAS FOR value_name;
    -- ov ALIAS FOR option_value;
    sid ALIAS FOR system_id;
    o ALIAS FOR option_name;
    -- soid INTEGER = CASE WHEN option_name IS NOT NULL
    --     THEN option_name
    --     ELSE ov.option_name END;
    uov option_values%ROWTYPE;
BEGIN

    IF o IS NULL THEN RAISE EXCEPTION 'Cannot have NULL `option_name` - CREATE_OR_UPDATE_OPTION_VALUE';
    END IF;

    -- IF ov.id IS NULL THEN
        INSERT INTO option_values (
            system_id,
            option_name,
            name
            -- value
            -- value_order,
            -- mirror_from_option_value_id
        )
        VALUES (
            sid,
            o,
            vn
            -- ov.value
            -- ov.value_order,
            -- ov.mirror_from_option_value_id
        )
        RETURNING * INTO uov;
    -- ELSE RETURN QUERY
    --     UPDATE option_values SET
    --         name = CASE
    --             WHEN ov.name IS NOT NULL
    --                 THEN ov.name
    --             ELSE option_values.name END,
    --         value = CASE
    --             WHEN ov.value IS NOT NULL
    --                 THEN ov.value
    --             ELSE option_values.value END
    --         -- value_order = CASE
    --         --     WHEN ov.value_order IS NOT NULL
    --         --         THEN ov.value_order
    --         --     ELSE option_values.value_order END,
    --         -- mirror_from_option_value_id = CASE
    --         --     WHEN ov.mirror_from_option_value_id IS NOT NULL
    --         --         THEN ov.mirror_from_option_value_id
    --         --     ELSE option_values.mirror_from_option_value_id END
    --     WHERE option_values.id = ov.id
    --     AND option_values.option_name = soid
    --     RETURNING *;
    -- END IF;

    RETURN uov;

END;
$$ LANGUAGE plpgsql;
