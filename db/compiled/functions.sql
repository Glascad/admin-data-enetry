-- FUNCTIONS



-- create_or_update_container_detail.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 


DROP FUNCTION IF EXISTS create_or_update_container_detail;

CREATE OR REPLACE FUNCTION create_or_update_container_detail(
    container_detail ENTIRE_CONTAINER_DETAIL,
    id_pairs ID_PAIR[],
    elevation_id INTEGER
) RETURNS SETOF CONTAINER_DETAILS AS $$
DECLARE
    cd ALIAS FOR container_detail;
    eid ALIAS FOR elevation_id;
BEGIN
    IF cd.id IS NULL
    THEN RETURN QUERY
        INSERT INTO container_details (
            elevation_id,
            first_container_id,
            second_container_id,
            vertical
        ) VALUES (
            eid,
            CASE
                WHEN cd.first_container_id IS NOT NULL
                    THEN cd.first_container_id
                ELSE get_real_id(id_pairs, cd.first_container_fake_id) END,
            CASE
                WHEN cd.second_container_id IS NOT NULL
                    THEN cd.second_container_id
                ELSE get_real_id(id_pairs, cd.second_container_fake_id) END,
            cd.vertical
        )
        RETURNING *;
    ELSE RETURN QUERY
        UPDATE container_details SET
            first_container_id = CASE
                WHEN cd.first_container_id IS NOT NULL
                    THEN cd.first_container_id
                WHEN cd.first_container_fake_id IS NOT NULL
                    THEN get_real_id(id_pairs, cd.first_container_fake_id)
                ELSE container_details.first_container_id END,
            second_container_id = CASE
                WHEN cd.second_container_id IS NOT NULL
                    THEN cd.second_container_id
                WHEN cd.second_container_fake_id IS NOT NULL
                    THEN get_real_id(id_pairs, cd.second_container_fake_id)
                ELSE container_details.second_container_id END
        WHERE container_details.elevation_id = eid
        AND container_details.vertical = cd.vertical
        AND container_details.id = cd.id
        RETURNING *;
    END IF;
END;
$$ LANGUAGE plpgsql;


-- create_or_update_elevation.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 

DROP FUNCTION IF EXISTS create_or_update_elevation;

CREATE OR REPLACE FUNCTION create_or_update_elevation(elevation ENTIRE_ELEVATION)
RETURNS SETOF ELEVATIONS AS $$
DECLARE
    e ALIAS FOR elevation;
BEGIN
    IF e.id IS NULL
    THEN RETURN QUERY
        INSERT INTO elevations (
            project_id,
            name,
            rough_opening,
            finished_floor_height
        ) VALUES (
            e.project_id,
            e.name,
            e.rough_opening,
            e.finished_floor_height
        )
        RETURNING *;
    ELSE RETURN QUERY
        UPDATE elevations SET
            project_id = CASE
                WHEN e.project_id IS NOT NULL
                    THEN e.project_id
                ELSE elevations.project_id END,
            name = CASE
                WHEN e.name IS NOT NULL
                    THEN e.name
                ELSE elevations.name END,
            rough_opening = CASE
                WHEN e.rough_opening IS NOT NULL
                    THEN e.rough_opening
                ELSE elevations.rough_opening END,
            finished_floor_height = CASE
                WHEN e.finished_floor_height IS NOT NULL
                    THEN e.finished_floor_height
                ELSE elevations.finished_floor_height END
        WHERE elevations.id = e.id
        RETURNING *;
    END IF;
END;
$$ LANGUAGE plpgsql;


-- create_or_update_elevation_container.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 

DROP FUNCTION IF EXISTS create_or_update_elevation_container;

CREATE OR REPLACE FUNCTION create_or_update_elevation_container(
    elevation_container ENTIRE_ELEVATION_CONTAINER,
    elevation_id INTEGER
) RETURNS SETOF ELEVATION_CONTAINERS AS $$
DECLARE
    ec ALIAS FOR elevation_container;
    eid INTEGER = elevation_id;
BEGIN
    IF ec.id IS NULL
    THEN RETURN QUERY
        INSERT INTO elevation_containers (
            elevation_id,
            original,
            contents,
            daylight_opening,
            custom_rough_opening
        ) VALUES (
            eid,
            ec.original,
            ec.contents,
            ec.daylight_opening,
            ec.custom_rough_opening
        )
        RETURNING *;
    ELSE RETURN QUERY
        UPDATE elevation_containers SET
            original = CASE
                WHEN ec.original IS NOT NULL
                    THEN ec.original
                ELSE elevation_containers.original END,
            contents = CASE
                WHEN ec.contents IS NOT NULL
                    THEN ec.contents
                ELSE elevation_containers.contents END,
            daylight_opening = CASE
                WHEN ec.daylight_opening IS NOT NULL
                    THEN ec.daylight_opening
                ELSE elevation_containers.daylight_opening END,
            custom_rough_opening = CASE
                WHEN ec.custom_rough_opening IS NOT NULL
                    THEN ec.custom_rough_opening
                ELSE elevation_containers.custom_rough_opening END
        WHERE elevation_containers.elevation_id = eid
        AND elevation_containers.id = ec.id
        RETURNING *;
    END IF;
END;
$$ LANGUAGE plpgsql;


-- delete_entire_elevation.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 

DROP FUNCTION IF EXISTS delete_entire_elevation;

CREATE OR REPLACE FUNCTION delete_entire_elevation(elevation_id INTEGER)
RETURNS INTEGER AS $$
DECLARE
    eid ALIAS FOR elevation_id;
BEGIN
    DELETE FROM container_details
        WHERE container_details.elevation_id = eid;

    DELETE FROM elevation_containers
        WHERE elevation_containers.elevation_id = eid;

    DELETE FROM elevations
        WHERE elevations.id = eid;
    
    RETURN eid;
END;
$$ LANGUAGE plpgsql;


-- update_entire_elevation.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 

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

    -- CREATE OR UPDATE CONTAINERS
    IF e.containers IS NOT NULL
    THEN
        FOREACH ec IN ARRAY e.containers
        LOOP
            SELECT id FROM create_or_update_elevation_container(ec, ue.id) INTO real_id;
            id_pairs := id_pairs || ROW(real_id, ec.fake_id)::ID_PAIR;
        END LOOP;
    END IF;

    -- DELETE DETAILS
    DELETE FROM container_details
    WHERE elevation_id = e.id
    AND id IN (
        SELECT * FROM UNNEST (e.detail_ids_to_delete)
    );

    -- CREATE OR UPDATE DETAILS
    IF e.details IS NOT NULL
    THEN
        FOREACH cd IN ARRAY e.details
        LOOP
            SELECT id FROM create_or_update_container_detail(cd, id_pairs, ue.id) INTO ___;
        END LOOP;
    END IF;

    -- DELETE CONTAINERS
    DELETE FROM elevation_containers
    WHERE elevation_id = e.id
    AND id IN (
        SELECT * FROM UNNEST (e.container_ids_to_delete)
    );

    RETURN QUERY SELECT * FROM (SELECT ue.*) ue;

END;
$$ LANGUAGE plpgsql;
