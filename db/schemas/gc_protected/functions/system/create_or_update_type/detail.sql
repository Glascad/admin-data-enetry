DROP FUNCTION IF EXISTS create_or_update_system_detail_type;

CREATE OR REPLACE FUNCTION gc_protected.create_or_update_system_detail_type(
    system_detail_type ENTIRE_SYSTEM_DETAIL_TYPE,
    system SYSTEMS,
    id_map ENTIRE_SYSTEM_ID_MAP
) RETURNS ENTIRE_SYSTEM_ID_MAP AS $$
DECLARE
    sdt ALIAS FOR system_detail_type;
    s ALIAS FOR system;
    usdt system_detail_types%ROWTYPE;
    real_id INTEGER;
    sov_id_pairs ID_PAIR[];
    -- fake system option id
    fake_sovid INTEGER;
    -- system option id
    psovid INTEGER;
BEGIN

    -- get real parent system option value id
    sov_id_pairs := id_map.system_option_value_id_pairs;

    psovid := CASE WHEN sdt.parent_system_option_value_id IS NOT NULL
        THEN sdt.parent_system_option_value_id
        ELSE get_real_id(sov_id_pairs, sdt.parent_system_option_value_fake_id) END;

    IF sdt.id IS NOT NULL THEN
        -- update
        UPDATE system_detail_types SET
            detail_type = CASE WHEN sdt.detail_type IS NOT NULL
                THEN sdt.detail_type
                ELSE system_detail_types.detail_type END
        WHERE id = sdt.id
        AND system_id = s.id;
    ELSIF sdt.fake_id IS NOT NULL THEN
        -- insert and update id map
        INSERT INTO system_detail_types (
            system_id,
            detail_type,
            parent_system_option_value_id
        ) VALUES (
            s.id,
            sdt.detail_type,
            psovid
        )
        RETURNING * INTO usdt;

        -- add detail type id to updated id map
        id_map.system_detail_type_id_pairs := id_map.system_detail_type_id_pairs || ROW(
            -- link fake id to real id
            usdt.id,
            sdt.fake_id
        )::ID_PAIR;
    ELSE
        RAISE EXCEPTION 'Must specify detail type `id` or `fake_id`';
    END IF;

    RETURN id_map;

END;
$$ LANGUAGE plpgsql;
