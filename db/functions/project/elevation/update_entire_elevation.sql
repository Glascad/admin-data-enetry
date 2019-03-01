DROP FUNCTION IF EXISTS update_entire_elevation;

CREATE OR REPLACE FUNCTION update_entire_elevation(elevation ENTIRE_ELEVATION)
RETURNS SETOF ELEVATIONS AS $$
DECLARE
    -- ELEVATION
    e ALIAS FOR elevation;
    -- LOOP
    ec ENTIRE_ELEVATION_CONTAINER;
    cd ENTIRE_CONTAINER_DETAIL;
    ___ INTEGER;
    real_id INTEGER;
    id_pairs ID_PAIR[];
    -- OUT
    ue ELEVATIONS%ROWTYPE;
BEGIN
    SELECT * FROM create_or_update_elevation(e) INTO ue;

    -- CONTAINERS
    DELETE FROM elevation_containers
    WHERE elevation_id = e.id
    AND id IN (
        SELECT * FROM UNNEST (e.container_ids_to_delete)
    );

    IF e.containers IS NOT NULL
    THEN
        FOREACH ec IN ARRAY e.containers
        LOOP
            SELECT id FROM create_or_update_elevation_container(so, ue.id) INTO real_id;
            id_pairs := id_pairs || ROW(real_id, ec.fake_id)::ID_PAIR;
        END LOOP;
    END IF;

    -- DETAILS
    DELETE FROM container_details
    WHERE elevation_id = e.id
    AND id IN (
        SELECT * FROM UNNEST (e.detail_ids_to_delete)
    );

    SELECT 1 FROM update_elevation_container_details(e.details, id_pairs, ue.id) INTO ___;

END;
$$ LANGUAGE plpgsql;
