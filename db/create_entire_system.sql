DROP FUNCTION IF EXISTS create_entire_system;

CREATE OR REPLACE FUNCTION create_entire_system (
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
    new_infill_sizes FLOAT[],
    new_infill_pocket_sizes  FLOAT[],
    new_infill_pocket_types INTEGER[]
) RETURNS SETOF systems AS $$
BEGIN
    RETURN QUERY WITH new_system AS (
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
        SELECT new_system.id AS system_id, system_tag_id
        FROM new_system
        JOIN (
            SELECT system_tag_id FROM UNNEST (new_system_tags) AS system_tag_id
        ) AS system_system_tag ON TRUE
        RETURNING *
    ),
    new_infill_sizes AS (
        INSERT INTO system_infill_sizes
        SELECT new_system.id AS system_id, infill_size
        FROM new_system
        JOIN (
            SELECT infill_size FROM UNNEST (new_infill_sizes) AS infill_size
        ) AS system_infill_size ON TRUE
    ),
    new_infill_pocket_sizes AS (
        INSERT INTO system_infill_pocket_sizes
        SELECT new_system.id AS system_id, infill_pocket_size
        FROM new_system
        JOIN (
            SELECT infill_pocket_size FROM UNNEST (new_infill_pocket_sizes) AS infill_pocket_size
        ) AS system_infill_pocket_size ON TRUE
    ),
    new_infill_pocket_types AS (
        INSERT INTO system_infill_pocket_types
        SELECT new_system.id AS system_id, infill_pocket_type_id
        FROM new_system
        JOIN (
            SELECT infill_pocket_type_id FROM UNNEST (new_infill_pocket_types) AS infill_pocket_type_id
        ) AS system_infill_pocket_type ON TRUE
    )
    SELECT * FROM new_system;
END;
$$ LANGUAGE plpgsql;
