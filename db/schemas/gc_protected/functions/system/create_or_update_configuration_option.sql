DROP FUNCTION IF EXISTS create_or_update_configuration_option;

CREATE OR REPLACE FUNCTION gc_protected.create_or_update_configuration_option(
    configuration_option ENTIRE_CONFIGURATION_OPTION,
    system SYSTEMS,
    id_map ENTIRE_SYSTEM_ID_MAP
) RETURNS ENTIRE_SYSTEM_ID_MAP AS $$
DECLARE
    co ALIAS FOR configuration_option;
    s ALIAS FOR system;
    uco configuration_options%ROWTYPE;
    real_id INTEGER;
    -- parent system option value
    cov_id_pairs ID_PAIR[];
    fake_pcovid INTEGER;
    pcovid INTEGER;
    -- system configuration type
    sdt_id_pairs ID_PAIR[];
    fake_sctid INTEGER;
    sctid INTEGER;
BEGIN

    -- PARENT VALUE

    -- get real parent system option value id
    cov_id_pairs := id_map.configuration_option_value_id_pairs;
    fake_pcovid := co.parent_configuration_option_value_fake_id;

    -- expect fake parent id to be in provided id map
    -- if fake id, get real id
    IF fake_pcovid IS NOT NULL THEN
        pcovid := get_real_id(cov_id_pairs, fake_pcovid);

        IF pcovid IS NULL THEN
            RAISE EXCEPTION 'Fake configuration option value id: % not found in previous items. Please place fake ids earlier in the array than their references.', fake_pcovid;
        END IF;
    ELSE
        pcovid := configuration_option.parent_configuration_option_value_id;
    END IF;

    -- PARENT CONFIGURATION TYPE

    -- get real parent system option value id
    sdt_id_pairs := id_map.system_configuration_type_id_pairs;
    fake_sctid := co.system_configuration_type_fake_id;

    -- expect fake parent id to be in provided id map
    -- if fake id, get real id
    IF fake_sctid IS NOT NULL THEN
        sctid := get_real_id(sdt_id_pairs, fake_sctid);

        IF sctid IS NULL THEN
            RAISE EXCEPTION 'Fake configuration type id: % not found in previous items. Please place fake ids earlier in the array than their references.', fake_sctid;
        END IF;
    ELSE
        sctid := configuration_option.system_configuration_type_id;
    END IF;

    -- CREATE OR UPDATE

    IF co.id IS NOT NULL THEN
        -- update
        UPDATE configuration_options SET
            name = CASE WHEN co.name IS NOT NULL
                THEN co.name
                ELSE configuration_options.name END,
            system_configuration_type_id = CASE WHEN sctid IS NOT NULL
                THEN sctid
                ELSE configuration_options.system_configuration_type_id END,
            parent_configuration_option_value_id = CASE WHEN pcovid IS NOT NULL
                THEN pcovid
                ELSE configuration_options.parent_configuration_option_value_id END
        WHERE id = co.id
        AND system_id = s.id
        RETURNING * INTO uco;
    ELSIF co.fake_id IS NOT NULL THEN
        -- insert and update id map
        INSERT INTO configuration_options (
            system_id,
            name,
            parent_configuration_option_value_id,
            system_configuration_type_id
        ) VALUES (
            s.id,
            co.name,
            pcovid,
            sctid
        )
        RETURNING * INTO uco;

        -- add option id to updated id map
        id_map.configuration_option_id_pairs := id_map.configuration_option_id_pairs || ROW(
            -- link fake id to real id
            uco.id,
            co.fake_id
        )::ID_PAIR;
    ELSE
        RAISE EXCEPTION 'Must specify configuration option `id` or `fake_id`';
    END IF;

    RETURN id_map;

END;
$$ LANGUAGE plpgsql;
