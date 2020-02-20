DROP FUNCTION IF EXISTS copy_elevation;

CREATE OR REPLACE FUNCTION gc_public.copy_elevation(
    elevation_id INTEGER,
    new_name TEXT
) RETURNS elevations AS $$
DECLARE
    eid ALIAS FOR elevation_id;
    e RECORD;
    ne RECORD;
    ef RECORD;
    ec RECORD;
    pid INTEGER;
    ecid INTEGER;
    efid INTEGER;
    cdid INTEGER;
    cd RECORD;
    ecid_pairs ID_PAIR[];
    efid_pairs ID_PAIR[];
    cdids INTEGER[];
    ecids INTEGER[];
    efids INTEGER[];
BEGIN

    SET search_path = gc_public, gc_protected, gc_controlled, gc_utils, gc_data, pg_temp_1, pg_toast, pg_toast_temp_1;

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
            preview
        ) VALUES (
            new_name,
            e.rough_opening,
            e.finished_floor_height,
            e.project_id,
            e.system_set_id,
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
                daylight_opening
            ) VALUES (
                ne.id,
                ec.original,
                ec.contents,
                ec.daylight_opening
            ) RETURNING id INTO ecid;

            ecid_pairs := ecid_pairs || (
                ecid, -- NEW/REAL ID
                ec.id -- OLD/FAKE ID
            )::ID_PAIR;
        END LOOP;

        -- CREATE ELEVATION FRAMES
        FOR ef IN (
            SELECT * FROM elevation_frames
            WHERE elevation_frames.elevation_id = eid
        ) LOOP
            INSERT INTO elevation_frames (
                elevation_id,
                vertical,
                placement
            ) VALUES (
                ne.id,
                ef.vertical,
                ef.placement
            ) RETURNING id INTO efid;

            efid_pairs := efid_pairs || (
                efid, -- new/real id
                ef.id -- old/fake id
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
                elevation_frame_id,
                vertical,
                placement
            ) VALUES (
                ne.id,
                get_real_id(ecid_pairs, cd.first_container_id, TRUE),
                get_real_id(ecid_pairs, cd.second_container_id, TRUE),
                get_real_id(efid_pairs, cd.elevation_frame_id, TRUE),
                cd.vertical,
                cd.placement
            ) RETURNING id INTO cdid;

            cdids := cdids || cdid;
        END LOOP;

        RETURN ne;

    END IF;
END;
$$ LANGUAGE plpgsql STRICT SECURITY DEFINER;

ALTER FUNCTION gc_public.copy_elevation OWNER TO gc_invoker;
