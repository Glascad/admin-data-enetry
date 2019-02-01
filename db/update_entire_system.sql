DROP FUNCTION IF EXISTS update_entire_system;

CREATE OR REPLACE FUNCTION update_entire_system (
    id INTEGER,
    new_name TEXT,
    new_manufacturer_id INTEGER,
    new_system_type_id INTEGER,
    new_depth FLOAT,
    new_default_sightline FLOAT,
    new_shim_size FLOAT,
    new_default_glass_size FLOAT,
    new_default_glass_bite FLOAT,
    new_system_tags INTEGER[],
    old_system_tags INTEGER[],
    new_infill_sizes FLOAT[],
    old_infill_sizes FLOAT[],
    new_infill_pocket_sizes FLOAT[],
    old_infill_pocket_sizes FLOAT[],
    new_infill_pocket_types INTEGER[],
    old_infill_pocket_types INTEGER[]
) RETURNS SETOF systems AS $$
BEGIN
    RETURN QUERY WITH updated_system AS (
        SELECT * FROM create_or_update_system(
            id,
            new_name,
            new_manufacturer_id,
            new_system_type_id,
            new_depth,
            new_default_sightline,
            new_shim_size,
            new_default_glass_size,
            new_default_glass_bite
        )
    ),
    new_system_tags AS (
        INSERT INTO system_system_tags
        SELECT updated_system.id AS system_id, system_tag_id
        FROM updated_system
        JOIN (
            SELECT system_tag_id FROM UNNEST (new_system_tags) AS system_tag_id
        ) AS system_system_tag ON TRUE
        -- ON CONFLICT DO NOTHING
    ),
    old_system_tags AS (
        DELETE FROM system_system_tags
        WHERE system_id IN (
            SELECT updated_system.id FROM updated_system
        )
        AND system_tag_id IN (
            SELECT system_tag_id FROM UNNEST (old_system_tags) AS system_tag_id
        )
        -- ON CONFLICT DO NOTHING
    ),
    new_infill_sizes AS (
        INSERT INTO system_infill_sizes
        SELECT updated_system.id AS system_id, infill_size
        FROM updated_system
        JOIN (
            SELECT infill_size FROM UNNEST (new_infill_sizes) AS infill_size
        ) AS system_infill_size ON TRUE
        -- ON CONFLICT DO NOTHING
    ),
    old_infill_sizes AS (
        DELETE FROM system_infill_sizes
        WHERE system_id IN (
            SELECT updated_system.id FROM updated_system
        )
        AND infill_size IN (
            SELECT infill_size FROM UNNEST (old_infill_sizes) AS infill_size
        )
        -- ON CONFLICT DO NOTHING
    ),
    new_infill_pocket_sizes AS (
        INSERT INTO system_infill_pocket_sizes
        SELECT updated_system.id AS system_id, infill_pocket_size
        FROM updated_system
        JOIN (
            SELECT infill_pocket_size FROM UNNEST (new_infill_pocket_sizes) AS infill_pocket_size
        ) AS system_infill_pocket_size ON TRUE
        -- ON CONFLICT DO NOTHING
    ),
    old_infill_pocket_sizes AS (
        DELETE FROM system_infill_pocket_sizes
        WHERE system_id IN (
            SELECT updated_system.id FROM updated_system
        )
        AND infill_pocket_size IN (
            SELECT infill_pocket_size FROM UNNEST (old_infill_pocket_sizes) AS infill_pocket_size
        )
        -- ON CONFLICT DO NOTHING
    ),
    new_infill_pocket_types AS (
        INSERT INTO system_infill_pocket_types
        SELECT updated_system.id AS system_id, infill_pocket_type_id
        FROM updated_system
        JOIN (
            SELECT infill_pocket_type_id FROM UNNEST (new_infill_pocket_types) AS infill_pocket_type_id
        ) AS system_infill_pocket_type ON TRUE
        -- ON CONFLICT DO NOTHING
    ),
    old_infill_pocket_types AS (
        DELETE FROM system_infill_pocket_types
        WHERE system_id IN (
            SELECT updated_system.id FROM updated_system
        )
        AND infill_pocket_type_id IN (
            SELECT infill_pocket_type_id FROM UNNEST (old_infill_pocket_types) AS infill_pocket_type_id
        )
        -- ON CONFLICT DO NOTHING
    )
    SELECT * FROM updated_system;
END;
$$ LANGUAGE plpgsql;
