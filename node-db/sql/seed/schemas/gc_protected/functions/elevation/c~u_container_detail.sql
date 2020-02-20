DROP FUNCTION IF EXISTS create_or_update_container_detail;

CREATE OR REPLACE FUNCTION gc_protected.create_or_update_container_detail(
    container_detail ENTIRE_CONTAINER_DETAIL,
    cid_pairs ID_PAIR[],
    fid_pairs ID_PAIR[],
    elevation_id INTEGER
) RETURNS CONTAINER_DETAILS AS $$
DECLARE
    pid INTEGER;
    cd ALIAS FOR container_detail;
    eid ALIAS FOR elevation_id;
    ucd CONTAINER_DETAILS;
BEGIN

    -- CHECK CURRENT USER
    SELECT project_id FROM elevations INTO pid
    WHERE id = eid;

    -- IF UNAUTHORIZED
    IF pid NOT IN (
        SELECT id FROM projects
        WHERE owner_id = get_current_user_id()
    ) THEN

        RAISE EXCEPTION 'Elevation not owned by user %', get_current_user_id();

    -- IF AUTHORIZED
    ELSE

        IF cd.id IS NULL THEN
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
                    get_real_id(cid_pairs, cd.first_container_fake_id, TRUE)
                ),
                COALESCE(
                    cd.second_container_id,
                    get_real_id(cid_pairs, cd.second_container_fake_id, TRUE)
                ),
                get_real_id(fid_pairs, cd.fake_id, TRUE),
                cd.vertical,
                cd.placement
            )
            RETURNING * INTO ucd;
        ELSE
            UPDATE container_details SET
                placement = COALESCE(
                    cd.placement,
                    container_details.placement
                ),
                first_container_id = COALESCE(
                    cd.first_container_id,
                    get_real_id(cid_pairs, cd.first_container_fake_id, TRUE),
                    container_details.first_container_id
                ),
                second_container_id = COALESCE(
                    cd.second_container_id,
                    get_real_id(cid_pairs, cd.second_container_fake_id, TRUE),
                    container_details.second_container_id
                ),
                elevation_frame_id = COALESCE(
                    get_real_id(fid_pairs, cd.fake_id, TRUE),
                    container_details.elevation_frame_id
                )
            WHERE container_details.id = cd.id
            AND container_details.elevation_id = eid
            RETURNING * INTO ucd;
        END IF;

        RETURN ucd;
    END IF;
END;
$$ LANGUAGE plpgsql;
