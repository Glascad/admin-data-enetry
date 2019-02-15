DROP FUNCTION IF EXISTS update_entire_system;

CREATE OR REPLACE FUNCTION update_entire_system (
    system entire_system
) RETURNS SETOF systems AS $$
DECLARE
    -- SYSTEM
    s ALIAS FOR system;
    -- LOOP
    so entire_system_option;
    sco entire_system_configuration_override;
    ___ INTEGER;
    -- OUT
    us systems%ROWTYPE;
BEGIN
    SELECT * FROM create_or_update_system(s) INTO us;

    -- SYSTEM TAGS
    INSERT INTO system_system_tags (
        system_id,
        system_tag_id
    )
    SELECT
        us.id AS system_id,
        st AS system_tag_id
    FROM UNNEST (s.system_tag_ids) st
    ON CONFLICT DO NOTHING;

    DELETE FROM system_system_tags
    WHERE system_id = s.id
    AND system_tag_id IN (
        SELECT * FROM UNNEST (s.system_tag_ids_to_delete)
    );

    -- SYSTEM TAGS
    INSERT INTO system_system_tags (
        system_id,
        system_tag_id
    )
    SELECT
        us.id AS system_id,
        st AS system_tag_id
    FROM UNNEST (s.system_tag_ids) st
    ON CONFLICT DO NOTHING;

    DELETE FROM system_system_tags
    WHERE system_id = s.id
    AND system_tag_id IN (
        SELECT * FROM UNNEST (s.system_tag_ids_to_delete)
    );

    -- INFILL SIZES
    INSERT INTO system_infill_sizes (
        system_id,
        infill_size
    )
    SELECT
        us.id AS system_id,
        iz AS infill_size
    FROM UNNEST (s.infill_sizes) iz
    ON CONFLICT DO NOTHING;

    DELETE FROM system_infill_sizes
    WHERE system_id = s.id
    AND infill_size IN (
        SELECT * FROM UNNEST (s.infill_sizes_to_delete)
    );

    -- INFILL POCKET SIZES
    INSERT INTO system_infill_pocket_sizes (
        system_id,
        infill_pocket_size
    )
    SELECT
        us.id AS system_id,
        ips AS infill_pocket_size
    FROM UNNEST (s.infill_pocket_sizes) ips
    ON CONFLICT DO NOTHING;

    DELETE FROM system_infill_pocket_sizes
    WHERE system_id = s.id
    AND infill_pocket_size IN (
        SELECT * FROM UNNEST (s.infill_pocket_sizes_to_delete)
    );

    -- INFILL POCKET TYPES
    INSERT INTO system_infill_pocket_types (
        system_id,
        infill_pocket_type_id
    )
    SELECT
        us.id AS system_id,
        ipt AS infill_pocket_type_id
    FROM UNNEST (s.infill_pocket_type_ids) ipt
    ON CONFLICT DO NOTHING;

    DELETE FROM system_infill_pocket_types
    WHERE system_id = s.id
    AND infill_pocket_type_id IN (
        SELECT * FROM UNNEST (s.infill_pocket_type_ids_to_delete)
    );

    -- INVALID CONFIGURATIONS
    INSERT INTO invalid_system_configuration_types (
        system_id,
        invalid_configuration_type_id
    )
    SELECT
        us.id AS system_id,
        ict AS invalid_configuration_type_id
    FROM UNNEST (s.invalid_configuration_type_ids) ict
    ON CONFLICT DO NOTHING;

    DELETE FROM invalid_system_configuration_types
    WHERE system_id = s.id
    AND invalid_configuration_type_id IN (
        SELECT * FROM UNNEST (s.invalid_configuration_type_ids_to_delete)
    );

    -- CONFIGURATION OVERRIDES
    IF s.configuration_overrides IS NOT NULL
    THEN
        FOREACH sco IN ARRAY s.configuration_overrides
        LOOP
            SELECT system_id FROM create_or_update_configuration_override(sco, us.id) INTO ___;
        END LOOP;
    END IF;

    IF s.configuration_overrides_to_delete IS NOT NULL
    THEN
        FOREACH sco IN ARRAY s.configuration_overrides_to_delete
        LOOP
            SELECT system_id FROM delete_configuration_override(sco, us.id) INTO ___;
        END LOOP;
    END IF;

    -- OPTIONS
    IF s.system_options IS NOT NULL
    THEN
        FOREACH so IN ARRAY s.system_options
        LOOP
            RAISE NOTICE 'Creating System Option: %', us.id;
            SELECT id FROM update_entire_system_option(so, us.id) INTO ___;
        END LOOP;
    END IF;

    DELETE FROM system_options
    WHERE system_id = s.id
    AND id IN (
        SELECT * FROM UNNEST (s.system_option_ids_to_delete)
    );

    RETURN QUERY SELECT * FROM (SELECT us.*) us;
END;
$$ LANGUAGE plpgsql;
