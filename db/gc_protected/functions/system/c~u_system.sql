DROP FUNCTION IF EXISTS create_or_update_system;

CREATE OR REPLACE FUNCTION gc_protected.create_or_update_system (system ENTIRE_SYSTEM)
RETURNS SYSTEMS AS $$
DECLARE
    s ALIAS FOR system;
    us systems%ROWTYPE;
BEGIN
    IF s.id IS NULL THEN
        INSERT INTO systems(
            name,
            manufacturer_id,
            system_type,
            sightline
            -- depth,
            -- default_sightline,
            -- shim_size,
            -- default_glass_size,
            -- default_glass_bite
        ) VALUES (
            s.name,
            s.manufacturer_id,
            s.system_type,
            s.sightline
            -- s.depth,
            -- s.default_sightline,
            -- s.shim_size,
            -- s.default_glass_bite,
            -- s.default_glass_size
        )
        RETURNING * INTO us;
    ELSE
        UPDATE systems SET
            name = COALESCE(s.name, systems.name),
            manufacturer_id = COALESCE(s.manufacturer_id, systems.manufacturer_id),
            system_type = COALESCE(s.system_type, systems.system_type),
            sightline = COALESCE(s.sightline, systems.sightline)
        WHERE systems.id = s.id
        RETURNING * INTO us;
    END IF;

    RETURN us;

END;
$$ LANGUAGE plpgsql;
