DROP FUNCTION IF EXISTS create_or_update_detail_option;

CREATE OR REPLACE FUNCTION gc_protected.create_or_update_detail_option(
    detail_option ENTIRE_DETAIL_OPTION,
    system SYSTEMS,
    id_map ENTIRE_SYSTEM_ID_MAP
) RETURNS ENTIRE_SYSTEM_ID_MAP AS $$
DECLARE
    _do ALIAS FOR detail_option;
    s ALIAS FOR system;
    udo detail_options%ROWTYPE;
    real_id INTEGER;
    -- parent system option value
    dov_id_pairs ID_PAIR[];
    fake_pdovid INTEGER;
    pdovid INTEGER;
    -- system detail type
    sdt_id_pairs ID_PAIR[];
    fake_psdtid INTEGER;
    psdtid INTEGER;
BEGIN

    -- PARENT VALUE

    -- get real parent system option value id
    dov_id_pairs := id_map.detail_option_value_id_pairs;
    fake_pdovid := _do.parent_detail_option_value_fake_id;

    -- expect fake parent id to be in provided id map
    -- if fake id, get real id
    IF fake_pdovid IS NOT NULL THEN
        pdovid := get_real_id(dov_id_pairs, fake_pdovid);

        IF pdovid IS NULL THEN
            RAISE EXCEPTION 'Fake detail option value id: % not found in previous items. Please place fake ids earlier in the array than their references.', fake_pdovid;
        END IF;
    ELSE
        pdovid := detail_option.parent_detail_option_value_id;
    END IF;

    -- PARENT DETAIL TYPE

    -- get real parent system option value id
    sdt_id_pairs := id_map.system_detail_type_id_pairs;
    fake_psdtid := _do.parent_system_detail_type_fake_id;

    -- expect fake parent id to be in provided id map
    -- if fake id, get real id
    IF fake_psdtid IS NOT NULL THEN
        psdtid := get_real_id(sdt_id_pairs, fake_psdtid);

        IF psdtid IS NULL THEN
            RAISE EXCEPTION 'Fake detail type id: % not found in previous items. Please place fake ids earlier in the array than their references.', fake_psdtid;
        END IF;
    ELSE
        psdtid := detail_option.parent_system_detail_type_id;
    END IF;

    -- CREATE OR UPDATE

    IF _do.id IS NOT NULL THEN
        -- update
        UPDATE detail_options SET
            name = CASE WHEN _do.name IS NOT NULL
                THEN _do.name
                ELSE detail_options.name END,
            parent_system_detail_type_id = CASE WHEN psdtid IS NOT NULL
                THEN psdtid
                ELSE detail_options.parent_system_detail_type_id END,
            parent_detail_option_value_id = CASE WHEN pdovid IS NOT NULL
                THEN pdovid
                ELSE detail_options.parent_detail_option_value_id END
        WHERE id = _do.id
        AND system_id = s.id
        RETURNING * INTO udo;
    ELSIF _do.fake_id IS NOT NULL THEN
        -- insert and update id map
        INSERT INTO detail_options (
            system_id,
            name,
            parent_detail_option_value_id,
            parent_system_detail_type_id,
            is_recursive
        ) VALUES (
            s.id,
            _do.name,
            pdovid,
            psdtid,
            pdovid IS NOT NULL
        )
        RETURNING * INTO udo;

        -- add option id to updated id map
        id_map.detail_option_id_pairs := id_map.detail_option_id_pairs || ROW(
            -- link fake id to real id
            udo.id,
            _do.fake_id
        )::ID_PAIR;
    ELSE
        RAISE EXCEPTION 'Must specify detail option `id` or `fake_id`';
    END IF;

    -- UPDATE PARENT OPTION VALUE TO HAVE is_recursive: TRUE
    IF pdovid IS NOT NULL THEN
        UPDATE detail_option_values dov SET
            is_recursive = TRUE
        WHERE dov.id = pdovid;
    END IF;

    RETURN id_map;

END;
$$ LANGUAGE plpgsql;
