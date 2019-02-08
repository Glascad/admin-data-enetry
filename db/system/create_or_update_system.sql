DROP FUNCTION IF EXISTS create_or_update_system;

CREATE OR REPLACE FUNCTION create_or_update_system (
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
    RETURN QUERY
        INSERT INTO systems(
            id,
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
            system_id,
            new_name,
            new_manufacturer_id,
            new_system_type_id,
            new_depth,
            new_default_sightline,
            new_shim_size,
            new_default_glass_bite,
            new_default_glass_size
        )
    ON CONFLICT (id) DO UPDATE
        SET
            name = CASE
                WHEN EXCLUDED.name IS NOT NULL
                    THEN EXCLUDED.name
                ELSE systems.name END,
            manufacturer_id = CASE
                WHEN EXCLUDED.manufacturer_id IS NOT NULL
                    THEN EXCLUDED.manufacturer_id
                ELSE systems.manufacturer_id END,
            system_type_id = CASE
                WHEN EXCLUDED.system_type_id IS NOT NULL
                    THEN EXCLUDED.system_type_id
                ELSE systems.system_type_id END,
            depth = CASE
                WHEN EXCLUDED.depth IS NOT NULL
                    THEN EXCLUDED.depth
                ELSE systems.depth END,
            default_sightline = CASE
                WHEN EXCLUDED.default_sightline IS NOT NULL
                    THEN EXCLUDED.default_sightline
                ELSE systems.default_sightline END,
            shim_size = CASE
                WHEN EXCLUDED.shim_size IS NOT NULL
                    THEN EXCLUDED.shim_size
                ELSE systems.shim_size END,
            default_glass_size = CASE
                WHEN EXCLUDED.default_glass_size IS NOT NULL
                    THEN EXCLUDED.default_glass_size
                ELSE systems.default_glass_size END,
            default_glass_bite = CASE
                WHEN EXCLUDED.default_glass_bite IS NOT NULL
                    THEN EXCLUDED.default_glass_bite
                ELSE systems.default_glass_bite END
        WHERE systems.id = system_id
    RETURNING *;
END;
$$ LANGUAGE plpgsql;
