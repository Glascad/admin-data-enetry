DROP FUNCTION IF EXISTS create_or_update_detail_option_value;

CREATE OR REPLACE FUNCTION gc_protected.create_or_update_detail_option_value(
    detail_option_value ENTIRE_DETAIL_OPTION_VALUE,
    detail_option ENTIRE_DETAIL_OPTION,
    system SYSTEMS,
    id_map ENTIRE_SYSTEM_ID_MAP
) RETURNS ENTIRE_SYSTEM_ID_MAP AS $$
DECLARE
    dov ALIAS FOR detail_option_value;
    _do ALIAS FOR detail_option;
    s ALIAS FOR system;
    udov detail_option_values%ROWTYPE;
    real_id INTEGER;
    do_id_pairs ID_PAIR[];
    -- fake system option id
    fake_doid INTEGER;
    -- system option id
    doid INTEGER;
BEGIN

    -- get real parent system option id
    do_id_pairs := id_map.detail_option_id_pairs;

    doid := CASE WHEN _do.id IS NOT NULL
        THEN _do.id
        ELSE get_real_id(do_id_pairs, _do.fake_id) END;

    IF dov.id IS NOT NULL THEN
        -- update
        UPDATE detail_option_values SET
            name = CASE WHEN dov.name IS NOT NULL
                THEN dov.name
                ELSE detail_option_values.name END,
            detail_option_id = CASE WHEN doid IS NOT NULL
                THEN doid
                ELSE detail_option_values.detail_option_id END
        WHERE id = dov.id
        AND system_id = s.id;
    ELSIF dov.fake_id IS NOT NULL THEN
        -- insert and update id map
        INSERT INTO detail_option_values (
            system_id,
            name,
            detail_option_id,
            option_name
        ) VALUES (
            s.id,
            dov.name,
            doid,
            _do.name
        )
        RETURNING * INTO udov;

        -- add option value id to updated id map
        id_map.detail_option_value_id_pairs := id_map.detail_option_value_id_pairs || ROW(
            -- link fake id to real id
            udov.id,
            dov.fake_id
        )::ID_PAIR;
    ELSE
        RAISE EXCEPTION 'Must specify detail option value `id` or `fake_id`';
    END IF;

    RETURN id_map;

END;
$$ LANGUAGE plpgsql;
