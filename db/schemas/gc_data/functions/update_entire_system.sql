DROP FUNCTION IF EXISTS update_entire_system;

CREATE OR REPLACE FUNCTION gc_data.update_entire_system (system ENTIRE_SYSTEM)
RETURNS SYSTEMS AS $$
DECLARE
    -- SYSTEM
    s ALIAS FOR system;
    -- LOOP
    so ENTIRE_SYSTEM_OPTION;
    sco ENTIRE_SYSTEM_CONFIGURATION_OVERRIDE;
    ___ INTEGER;
    -- OUT
    us SYSTEMS%ROWTYPE;
BEGIN

    SET search_path = gc_public,gc_data,gc_protected,pg_temp_1,pg_toast,pg_toast_temp_1;

    SELECT * FROM create_or_update_system(s) INTO us;

    -- SYSTEM TAGS
    -- INSERT INTO system_system_tags (
    --     system_id,
    --     system_tag_id
    -- )
    -- SELECT
    --     us.id AS system_id,
    --     st AS system_tag_id
    -- FROM UNNEST (s.system_tag_ids) st
    -- ON CONFLICT DO NOTHING;

    -- DELETE FROM system_system_tags
    -- WHERE system_id = us.id
    -- AND system_tag_id IN (
    --     SELECT * FROM UNNEST (s.system_tag_ids_to_delete)
    -- );

    -- INFILL SIZES
    -- INSERT INTO system_infill_sizes (
    --     system_id,
    --     infill_size
    -- )
    -- SELECT
    --     us.id AS system_id,
    --     iz AS infill_size
    -- FROM UNNEST (s.infill_sizes) iz
    -- ON CONFLICT DO NOTHING;

    -- DELETE FROM system_infill_sizes
    -- WHERE system_id = us.id
    -- AND infill_size IN (
    --     SELECT * FROM UNNEST (s.infill_sizes_to_delete)
    -- );

    -- INFILL POCKET SIZES
    -- INSERT INTO system_infill_pocket_sizes (
    --     system_id,
    --     infill_pocket_size
    -- )
    -- SELECT
    --     us.id AS system_id,
    --     ips AS infill_pocket_size
    -- FROM UNNEST (s.infill_pocket_sizes) ips
    -- ON CONFLICT DO NOTHING;

    -- DELETE FROM system_infill_pocket_sizes
    -- WHERE system_id = us.id
    -- AND infill_pocket_size IN (
    --     SELECT * FROM UNNEST (s.infill_pocket_sizes_to_delete)
    -- );

    -- INFILL POCKET TYPES
    -- INSERT INTO system_infill_pocket_types (
    --     system_id,
    --     infill_pocket_type_id
    -- )
    -- SELECT
    --     us.id AS system_id,
    --     ipt AS infill_pocket_type_id
    -- FROM UNNEST (s.infill_pocket_type_ids) ipt
    -- ON CONFLICT DO NOTHING;

    -- DELETE FROM system_infill_pocket_types
    -- WHERE system_id = us.id
    -- AND infill_pocket_type_id IN (
    --     SELECT * FROM UNNEST (s.infill_pocket_type_ids_to_delete)
    -- );

    -- INVALID CONFIGURATIONS
    INSERT INTO invalid_system_configuration_types (
        system_id,
        detail_type,
        invalid_configuration_type
    )
    SELECT
        us.id AS system_id,
        ict.detail_type AS detail_type,
        ict.invalid_configuration_type AS invalid_configuration_type
    FROM UNNEST (s.invalid_system_configuration_types) ict
    ON CONFLICT DO NOTHING;

    DELETE FROM invalid_system_configuration_types
    WHERE system_id = us.id
    AND invalid_configuration_type IN (
        SELECT invalid_configuration_type FROM UNNEST (s.invalid_system_configuration_types_to_delete)
    )
    AND detail_type IN (
        SELECT detail_type FROM UNNEST (s.invalid_system_configuration_types_to_delete)
    );

    -- CONFIGURATION OVERRIDES
    IF s.configuration_overrides IS NOT NULL
    THEN
        FOREACH sco IN ARRAY s.configuration_overrides
        LOOP
            SELECT system_id FROM update_entire_system_configuration_override(sco, us.id, us.system_type) INTO ___;
        END LOOP;
    END IF;

    -- IF s.configuration_overrides_to_delete IS NOT NULL
    -- THEN
    --     FOREACH sco IN ARRAY s.configuration_overrides_to_delete
    --     LOOP
    --         SELECT system_id FROM delete_system_configuration_override(sco, us.id, us.system_type) INTO ___;
    --     END LOOP;
    -- END IF;

    -- OPTIONS
    IF s.system_options IS NOT NULL
    THEN
        FOREACH so IN ARRAY s.system_options
        LOOP
            SELECT id FROM update_entire_system_option(so, us.id) INTO ___;
        END LOOP;
    END IF;

    IF s.system_options_to_delete IS NOT NULL
    AND us.id IS NOT NULL THEN
        DELETE FROM option_values
        WHERE system_id = us.id
        AND option_name IN (
            SELECT * FROM UNNEST (s.system_options_to_delete)
        );

        DELETE FROM system_options
        WHERE system_id = us.id
        AND name IN (
            SELECT * FROM UNNEST (s.system_options_to_delete)
        );
    END IF;

    RETURN us;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

ALTER FUNCTION gc_data.update_entire_system OWNER TO gc_invoker;
