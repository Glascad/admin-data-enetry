DROP FUNCTION IF EXISTS create_system;

CREATE OR REPLACE FUNCTION create_system (
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
    RETURN QUERY INSERT INTO systems(
        name,
        manufacturer_id,
        system_type_id,
        depth,
        default_sightline,
        shim_size,
        default_glass_size,
        default_glass_bite
    )
    VALUES (
        new_name,
        new_manufacturer_id,
        new_system_type_id,
        new_depth,
        new_default_sightline,
        new_shim_size,
        new_default_glass_bite,
        new_default_glass_size
    )
    RETURNING *;
END;
$$ LANGUAGE plpgsql;
