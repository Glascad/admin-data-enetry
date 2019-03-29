
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
