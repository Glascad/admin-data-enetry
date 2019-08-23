DROP FUNCTION IF EXISTS create_or_update_system_option;

CREATE OR REPLACE FUNCTION gc_protected.create_or_update_system_option(
    system_option ENTIRE_SYSTEM_OPTION,
    system SYSTEMS,
    id_map ENTIRE_SYSTEM_ID_MAP
) RETURNS ENTIRE_SYSTEM_ID_MAP AS $$
DECLARE
    so ALIAS FOR system_option;
    s ALIAS FOR system;
    uso system_options%ROWTYPE;
    real_id INTEGER;
    sov_id_pairs ID_PAIR[];
    -- fake parent system option value id
    fake_psovid INTEGER;
    -- parent system option value id
    psovid INTEGER;
BEGIN

    -- get real parent system option value id
    sov_id_pairs := id_map.system_option_value_id_pairs;
    fake_psovid := so.parent_system_option_value_fake_id;

    -- expect fake parent id to be in provided id map
    -- if fake id, get real id
    IF fake_psovid IS NOT NULL THEN
        psovid := get_real_id(sov_id_pairs, fake_psovid);

        IF psovid IS NULL THEN
            RAISE EXCEPTION 'Fake system option value id: % not found in previous items. Please reorder array', fake_psovid;
        END IF;
    ELSE
        psovid := system_option.parent_system_option_value_id;
    END IF;

    IF so.id IS NOT NULL THEN
        -- update
        UPDATE system_options SET
            name = CASE WHEN so.name IS NOT NULL
                THEN so.name
                ELSE system_options.name END,
            parent_system_option_value_id = CASE WHEN so.parent_system_option_value_id IS NOT NULL
                THEN so.parent_system_option_value_id
                ELSE system_options.parent_system_option_value_id END
        WHERE id = so.id
        AND system_id = s.id
        RETURNING * INTO uso;
    ELSIF so.fake_id IS NOT NULL THEN
        -- insert and update id map
        INSERT INTO system_options (
            system_id,
            name,
            parent_system_option_value_id
        ) VALUES (
            s.id,
            so.name,
            psovid
        )
        RETURNING * INTO uso;

        -- add option id to updated id map
        id_map.system_option_id_pairs := id_map.system_option_id_pairs || ROW(
            -- link fake id to real id
            uso.id,
            so.fake_id
        )::ID_PAIR;
    ELSE
        RAISE EXCEPTION 'Must specify system option `id` or `fake_id`';
    END IF;

    RETURN id_map;

END;
$$ LANGUAGE plpgsql;
