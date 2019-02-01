DROP FUNCTION IF EXISTS create_or_update_system;

CREATE OR REPLACE FUNCTION create_or_update_system (
    id INTEGER,
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
    IF id IS NOT NULL
    THEN RETURN QUERY SELECT * FROM update_system(
        id,
        new_name,
        new_manufacturer_id,
        new_system_type_id,
        new_depth,
        new_default_sightline,
        new_shim_size,
        new_default_glass_size,
        new_default_glass_bite
    );
    ELSE RETURN QUERY SELECT * FROM create_system(
        new_name,
        new_manufacturer_id,
        new_system_type_id,
        new_depth,
        new_default_sightline,
        new_shim_size,
        new_default_glass_size,
        new_default_glass_bite
    );
    END IF;
END;
$$ LANGUAGE plpgsql;
