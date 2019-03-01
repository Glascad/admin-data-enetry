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
            SELECT id FROM create_or_update_elevation_container(ec, ue.id) INTO real_id;
            id_pairs := id_pairs || ROW(real_id, ec.fake_id)::ID_PAIR;
        END LOOP;
    END IF;

    -- DETAILS
    DELETE FROM container_details
    WHERE elevation_id = e.id
    AND id IN (
        SELECT * FROM UNNEST (e.detail_ids_to_delete)
    );

    IF e.details IS NOT NULL
    THEN
        FOREACH cd IN ARRAY e.details
        LOOP
            INSERT INTO container_details (
                elevation_id,
                first_container_id,
                second_container_id,
                vertical
            ) VALUES (
                ue.id,
                CASE
                    WHEN cd.first_container_id IS NOT NULL
                        THEN cd.first_container_id
                    ELSE get_real_id(id_pairs, cd.first_container_fake_id) END,
                CASE
                    WHEN cd.second_container_id IS NOT NULL
                        THEN cd.second_container_id
                    ELSE get_real_id(id_pairs, cd.second_container_fake_id) END,
                cd.vertical
            );
        END LOOP;
    END IF;

    RETURN QUERY SELECT * FROM (SELECT ue.*) ue;

END;
$$ LANGUAGE plpgsql;
