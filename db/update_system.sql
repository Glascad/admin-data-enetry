DROP FUNCTION IF EXISTS update_system;

CREATE OR REPLACE FUNCTION update_system (
    system_id INTEGER,
    new_name TEXT,
    new_manufacturer_id INTEGER,
    new_system_type_id INTEGER,
    new_depth FLOAT,
    new_default_sightline FLOAT,
    new_shim_size FLOAT,
    new_default_glass_size FLOAT,
    new_default_glass_bite FLOAT
) RETURNS SETOF systems AS $$
BEGIN
    RETURN QUERY UPDATE systems s
    SET
        name = CASE
            WHEN new_name IS NOT NULL
                THEN new_name
            ELSE name END,
        manufacturer_id = CASE
            WHEN new_manufacturer_id IS NOT NULL
                THEN new_manufacturer_id
            ELSE manufacturer_id END,
        system_type_id = CASE
            WHEN new_system_type_id IS NOT NULL
                THEN new_system_type_id
            ELSE system_type_id END,
        depth = CASE
            WHEN new_depth IS NOT NULL
                THEN new_depth
            ELSE depth END,
        default_sightline = CASE
            WHEN new_default_sightline IS NOT NULL
                THEN new_default_sightline
            ELSE default_sightline END,
        shim_size = CASE
            WHEN new_shim_size IS NOT NULL
                THEN new_shim_size
            ELSE shim_size END,
        default_glass_size = CASE
            WHEN new_default_glass_size IS NOT NULL
                THEN new_default_glass_size
            ELSE default_glass_size END,
        default_glass_bite = CASE
            WHEN new_default_glass_bite IS NOT NULL
                THEN new_default_glass_bite
            ELSE default_glass_bite END
    WHERE s.id = system_id
    RETURNING *;
END;
$$ LANGUAGE plpgsql;
