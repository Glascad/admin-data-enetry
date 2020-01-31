DROP FUNCTION IF EXISTS update_entire_elevation;

CREATE OR REPLACE FUNCTION gc_public.update_entire_elevation(elevation ENTIRE_ELEVATION)
RETURNS ELEVATIONS AS $$
DECLARE
    -- OWNER
    pid INTEGER;
    uid INTEGER;
    -- ELEVATION
    e ALIAS FOR elevation;
    -- LOOP
    ec ENTIRE_ELEVATION_CONTAINER;
    cd ENTIRE_CONTAINER_DETAIL;
    ___ INTEGER;
    real_id INTEGER;
    id_pairs ID_PAIR[];
    frame_id_pairs ID_PAIR[];
    ef ENTIRE_ELEVATION_FRAME;
    cdid INTEGER;
    -- OUT
    ue ELEVATIONS%ROWTYPE;
BEGIN

    SET search_path = gc_public,gc_protected,gc_controlled,gc_utils,gc_data,pg_temp_1,pg_toast,pg_toast_temp_1;

    -- CHECK CURRENT USER
    IF e.id IS NOT NULL THEN
        SELECT project_id FROM elevations INTO pid
        WHERE id = e.id;
    ELSE
        pid := e.project_id;
    END IF;

    -- IF NOT AUTHORIZED
    IF pid NOT IN (
        SELECT id FROM projects
        WHERE owner_id = get_current_user_id()
    ) THEN

        RAISE EXCEPTION 'Elevation not owned by user %', get_current_user_id();

    -- IF AUTHORIZED
    ELSE

        SELECT * FROM create_or_update_elevation(e) INTO ue;

        -- CREATE OR UPDATE CONTAINERS
        IF e.containers IS NOT NULL THEN
            FOREACH ec IN ARRAY e.containers LOOP
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

        IF e.frames IS NOT NULL THEN
            -- DELETE FRAMES
            DELETE FROM elevation_frames
            WHERE elevation_id = e.id;

            real_id := NULL;

            FOREACH ef IN ARRAY e.frames LOOP
                -- CREATE FRAMES & UPDATE EXISTING DETAILS
                SELECT id FROM create_entire_elevation_frame(ef, ue.id) INTO real_id;

                -- GET REAL IDS & PAIR WITH DETAIL FAKE IDS
                IF ef.container_detail_fake_ids IS NOT NULL THEN
                    FOREACH cdid IN ARRAY ef.container_detail_fake_ids LOOP
                        frame_id_pairs := frame_id_pairs || ROW(real_id, cdid)::ID_PAIR;
                    END LOOP;
                END IF;
            END LOOP;

        END IF; 

        -- CREATE OR UPDATE DETAILS
        IF e.details IS NOT NULL THEN
            FOREACH cd IN ARRAY e.details LOOP
                SELECT id FROM create_or_update_container_detail(cd, id_pairs, frame_id_pairs, ue.id) INTO ___;
            END LOOP;
        END IF;

        -- DELETE CONTAINERS
        DELETE FROM elevation_containers
        WHERE elevation_id = e.id
        AND id IN (
            SELECT * FROM UNNEST (e.container_ids_to_delete)
        );

        RETURN ue;

    END IF;
END;
$$ LANGUAGE plpgsql STRICT SECURITY DEFINER;

ALTER FUNCTION gc_public.update_entire_elevation OWNER TO gc_invoker;
