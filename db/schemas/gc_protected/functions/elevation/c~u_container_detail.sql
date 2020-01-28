DROP FUNCTION IF EXISTS create_or_update_container_detail;

CREATE OR REPLACE FUNCTION gc_protected.create_or_update_container_detail(
    container_detail ENTIRE_CONTAINER_DETAIL,
    id_pairs ID_PAIR[],
    frame_id_pairs ID_PAIR[],
    elevation_id INTEGER
) RETURNS SETOF CONTAINER_DETAILS AS $$
DECLARE
    pid INTEGER;
    cd ALIAS FOR container_detail;
    eid ALIAS FOR elevation_id;
BEGIN


    -- CHECK CURRENT USER

    SELECT project_id FROM elevations INTO pid
    WHERE id = eid;

    IF pid NOT IN (
        SELECT id FROM projects
        WHERE owner_id = get_current_user_id()
    ) THEN

        RAISE EXCEPTION 'Elevation not owned by user %', get_current_user_id();

    ELSE

        -- IF AUTHORIZED

        IF cd.id IS NULL THEN RETURN QUERY
            INSERT INTO container_details (
                elevation_id,
                first_container_id,
                second_container_id,
                elevation_frame_id,
                vertical,
                placement
            ) VALUES (
                eid,
                COALESCE(
                    cd.first_container_id,
                    get_real_id(id_pairs, cd.first_container_fake_id)
                ),
                COALESCE(
                    cd.second_container_id,
                    get_real_id(id_pairs, cd.second_container_fake_id)
                ),
                get_real_id(frame_id_pairs, cd.fake_id),
                cd.vertical,
                cd.placement
            )
            RETURNING *;
        ELSE RETURN QUERY
            UPDATE container_details SET
                first_container_id = COALESCE(
                    cd.first_container_id,
                    get_real_id(id_pairs, cd.first_container_fake_id)
                ),
                second_container_id = COALESCE(
                    cd.second_container_id,
                    get_real_id(id_pairs, cd.second_container_fake_id)
                ),
                elevation_frame_id = COALESCE(
                    get_real_id(frame_id_pairs, cd.fake_id),
                    container_details.elevation_frame_id
                ),
                placement = COALESCE(
                    cd.placement,
                    container_details.placement
                )
            WHERE container_details.id = cd.id
            AND container_details.vertical = cd.vertical
            AND container_details.elevation_id = eid
            RETURNING *;
        END IF;
    END IF;
END;
$$ LANGUAGE plpgsql;
