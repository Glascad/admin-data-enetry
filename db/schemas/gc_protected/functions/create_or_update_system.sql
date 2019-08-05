DROP FUNCTION IF EXISTS create_or_update_system;

CREATE OR REPLACE FUNCTION gc_protected.create_or_update_system (system ENTIRE_SYSTEM)
RETURNS SETOF SYSTEMS AS $$
DECLARE
    s ALIAS FOR system;
BEGIN
    IF s.id IS NULL
    THEN RETURN QUERY
        INSERT INTO systems(
            name,
            manufacturer_id,
            system_type
            -- depth,
            -- default_sightline,
            -- shim_size,
            -- default_glass_size,
            -- default_glass_bite
        )
        VALUES (
            s.name,
            s.manufacturer_id,
            s.system_type
            -- s.depth,
            -- s.default_sightline,
            -- s.shim_size,
            -- s.default_glass_bite,
            -- s.default_glass_size
        )
        RETURNING *;
    ELSE RETURN QUERY
    -- BEFORE QUERY MUST DELETE ALL OVERRIDES FROM PREVIOUS SYSTEM TYPE IF SYSTEM TYPE IS UPDATED
        UPDATE systems SET
            name = CASE
                WHEN s.name IS NOT NULL
                    THEN s.name
                ELSE systems.name END,
            manufacturer_id = CASE
                WHEN s.manufacturer_id IS NOT NULL
                    THEN s.manufacturer_id
                ELSE systems.manufacturer_id END,
            system_type = CASE
                WHEN s.system_type IS NOT NULL
                    THEN s.system_type
                ELSE systems.system_type END
            -- depth = CASE
            --     WHEN s.depth IS NOT NULL
            --         THEN s.depth
            --     ELSE systems.depth END,
            -- default_sightline = CASE
            --     WHEN s.default_sightline IS NOT NULL
            --         THEN s.default_sightline
            --     ELSE systems.default_sightline END,
            -- shim_size = CASE
            --     WHEN s.shim_size IS NOT NULL
            --         THEN s.shim_size
            --     ELSE systems.shim_size END,
            -- default_glass_size = CASE
            --     WHEN s.default_glass_size IS NOT NULL
            --         THEN s.default_glass_size
            --     ELSE systems.default_glass_size END,
            -- default_glass_bite = CASE
            --     WHEN s.default_glass_bite IS NOT NULL
            --         THEN s.default_glass_bite
            --     ELSE systems.default_glass_bite END
        WHERE systems.id = s.id
        RETURNING *;
    END IF;
END;
$$ LANGUAGE plpgsql;
