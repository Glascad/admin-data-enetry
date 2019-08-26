DROP FUNCTION IF EXISTS create_or_update_system_option_value;

CREATE OR REPLACE FUNCTION gc_protected.create_or_update_system_option_value(
    system_option_value ENTIRE_SYSTEM_OPTION_VALUE,
    system_option ENTIRE_SYSTEM_OPTION,
    system SYSTEMS,
    id_map ENTIRE_SYSTEM_ID_MAP
) RETURNS ENTIRE_SYSTEM_ID_MAP AS $$
DECLARE
    sov ALIAS FOR system_option_value;
    so ALIAS FOR system_option;
    s ALIAS FOR system;
    usov system_option_values%ROWTYPE;
    real_id INTEGER;
    so_id_pairs ID_PAIR[];
    -- fake system option id
    fake_soid INTEGER;
    -- system option id
    soid INTEGER;
BEGIN

    -- get real parent system option id
    so_id_pairs := id_map.system_option_id_pairs;

    soid := CASE WHEN so.id IS NOT NULL
        THEN so.id
        ELSE get_real_id(so_id_pairs, so.fake_id) END;

    IF sov.id IS NOT NULL THEN
        -- update
        UPDATE system_option_values SET
            name = CASE WHEN sov.name IS NOT NULL
                THEN sov.name
                ELSE system_option_values.name END,
            system_option_id = CASE WHEN soid IS NOT NULL
                THEN soid
                ELSE system_option_values.system_option_id END
        WHERE id = sov.id
        AND system_id = s.id;
    ELSIF sov.fake_id IS NOT NULL THEN
        -- insert and update id map
        INSERT INTO system_option_values (
            system_id,
            name,
            system_option_id,
            option_name
        ) VALUES (
            s.id,
            sov.name,
            soid,
            so.name
        )
        RETURNING * INTO usov;

        -- add option value id to updated id map
        id_map.system_option_value_id_pairs := id_map.system_option_value_id_pairs || ROW(
            -- link fake id to real id
            usov.id,
            sov.fake_id
        )::ID_PAIR;
    ELSE
        RAISE EXCEPTION 'Must specify system option value `id` or `fake_id`';
    END IF;

    RETURN id_map;

END;
$$ LANGUAGE plpgsql;
