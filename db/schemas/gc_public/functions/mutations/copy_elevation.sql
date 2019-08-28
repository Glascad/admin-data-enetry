DROP FUNCTION IF EXISTS copy_elevation;

CREATE OR REPLACE FUNCTION gc_public.copy_elevation(
    elevation_id INTEGER,
    new_name TEXT
) RETURNS elevations AS $$
DECLARE
    eid ALIAS FOR elevation_id;
    e elevations%ROWTYPE;
    ne elevations%ROWTYPE;
    ec elevation_containers%ROWTYPE;
    pid INTEGER;
    ecid INTEGER;
    cd container_details%ROWTYPE;
    id_pairs ID_PAIR[];
BEGIN

    SET search_path = gc_public,gc_protected,gc_utils,pg_temp_1,pg_toast,pg_toast_temp_1;

    SELECT * FROM elevations
    INTO e
    WHERE id = eid;

    -- CHECK CURRENT USER

    pid := e.project_id;

    IF pid NOT IN (
        SELECT id FROM projects
        WHERE owner_id = get_current_user_id()
    ) THEN

        RAISE EXCEPTION 'Elevation not owned by user %', get_current_user_id();

    ELSE

        -- IF AUTHORIZED

        -- CREATE ELEVATION

        INSERT INTO elevations (
            name,
            rough_opening,
            finished_floor_height,
            project_id,
            system_set_id,
            sightline,
            preview
        ) VALUES (
            new_name,
            e.rough_opening,
            e.finished_floor_height,
            e.project_id,
            e.system_set_id,
            e.sightline,
            e.preview
        ) RETURNING * INTO ne;

        -- CREATE ELEVATION CONTAINERS

        FOR ec IN (
            SELECT * FROM elevation_containers
            WHERE elevation_containers.elevation_id = eid
        ) LOOP
            INSERT INTO elevation_containers (
                elevation_id,
                original,
                contents,
                daylight_opening,
                custom_rough_opening
            ) VALUES (
                ne.id,
                ec.original,
                ec.contents,
                ec.daylight_opening,
                ec.custom_rough_opening
            ) RETURNING id INTO ecid;

            id_pairs := id_pairs || ROW(
                ecid, -- NEW/REAL ID
                ec.id -- OLD/FAKE ID
            )::ID_PAIR;
        END LOOP;

        -- CREATE CONTAINER DETAILS

        FOR cd IN (
            SELECT * FROM container_details
            WHERE container_details.elevation_id = eid
        ) LOOP
            INSERT INTO container_details (
                elevation_id,
                first_container_id,
                second_container_id,
                vertical
            ) VALUES (
                ne.id,
                get_real_id(id_pairs, cd.first_container_id),
                get_real_id(id_pairs, cd.second_container_id),
                cd.vertical
            );
        END LOOP;

        RETURN ne;

    END IF;
END;
$$ LANGUAGE plpgsql;

ALTER FUNCTION gc_public.copy_elevation OWNER TO gc_invoker;
