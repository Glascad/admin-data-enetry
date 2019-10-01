DROP FUNCTION IF EXISTS create_or_update_system_option;

CREATE OR REPLACE FUNCTION gc_protected.create_or_update_system_option(
    system_option ENTIRE_SYSTEM_OPTION,
    system SYSTEMS
) RETURNS SYSTEM_OPTIONS AS $$
DECLARE
    so ALIAS FOR system_option;
    s ALIAS FOR system;
    uso system_options%ROWTYPE;
BEGIN

    IF EXISTS (SELECT * FROM system_options WHERE path = so.path) THEN
        -- update
        UPDATE system_options SET
            name = CASE WHEN so.name IS NOT NULL
                THEN so.name
                ELSE system_options.name END,
            parent_system_option_value_path = CASE WHEN so.parent_system_option_value_path IS NOT NULL
                THEN so.parent_system_option_value_path
                ELSE system_options.parent_system_option_value_path END
        WHERE path = so.path
        AND system_id = s.id
        RETURNING * INTO uso;
    ELSE
        -- insert and update id map
        INSERT INTO system_options (
            system_id,
            name,
            parent_system_option_value_path,
            is_recursive,
            default_system_option_value
        ) VALUES (
            s.id,
            so.name,
            psovid,
            psovid IS NOT NULL,
            0
        )
        RETURNING * INTO uso;

        -- add option id to updated id map
        id_map.system_option_id_pairs := id_map.system_option_id_pairs || ROW(
            -- link fake id to real id
            uso.id,
            so.fake_id
        )::ID_PAIR;
    END IF;

    RETURN uso;

END;
$$ LANGUAGE plpgsql;
