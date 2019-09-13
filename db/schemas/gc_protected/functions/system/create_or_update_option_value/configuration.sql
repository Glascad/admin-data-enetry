DROP FUNCTION IF EXISTS create_or_update_configuration_option_value;

CREATE OR REPLACE FUNCTION gc_protected.create_or_update_configuration_option_value(
    configuration_option_value ENTIRE_CONFIGURATION_OPTION_VALUE,
    system SYSTEMS,
    id_map ENTIRE_SYSTEM_ID_MAP
) RETURNS ENTIRE_SYSTEM_ID_MAP AS $$
DECLARE
    cov ALIAS FOR configuration_option_value;
    s ALIAS FOR system;
    ucov configuration_option_values%ROWTYPE;
    real_id INTEGER;
    co_id_pairs ID_PAIR[];
    -- fake system option id
    fake_coid INTEGER;
    -- system option id
    coid INTEGER;
    -- system option name
    con TEXT;
BEGIN

    -- get real parent system option id
    co_id_pairs := id_map.configuration_option_id_pairs;

    coid := COALESCE(
        cov.parent_configuration_option_id,
        get_real_id(
            co_id_pairs,
            co.parent_configuration_option_fake_id
        )
    );

    SELECT name FROM configuration_options INTO con WHERE id = coid;

    IF cov.id IS NOT NULL THEN
        -- update
        UPDATE configuration_option_values SET
            name = CASE WHEN cov.name IS NOT NULL
                THEN cov.name
                ELSE configuration_option_values.name END,
            parent_configuration_option_id = CASE WHEN coid IS NOT NULL
                THEN coid
                ELSE configuration_option_values.parent_configuration_option_id END
        WHERE id = cov.id
        AND system_id = s.id;
    ELSIF cov.fake_id IS NOT NULL THEN
        -- insert and update id map
        INSERT INTO configuration_option_values (
            system_id,
            name,
            parent_configuration_option_id,
            option_name
        ) VALUES (
            s.id,
            cov.name,
            coid,
            con
        )
        RETURNING * INTO ucov;

        -- add option value id to updated id map
        id_map.configuration_option_value_id_pairs := id_map.configuration_option_value_id_pairs || ROW(
            -- link fake id to real id
            ucov.id,
            cov.fake_id
        )::ID_PAIR;
    ELSE
        RAISE EXCEPTION 'Must specify configuration option value `id` or `fake_id`';
    END IF;

    RETURN id_map;

END;
$$ LANGUAGE plpgsql;
