DROP FUNCTION IF EXISTS update_elevation_container_details;

CREATE OR REPLACE FUNCTION update_elevation_container_details(
    details ENTIRE_CONTAINER_DETAIL[],
    id_pairs ID_PAIR[],
    elevation_id INTEGER
) RETURNS INTEGER AS $$
DECLARE
    eid ALIAS FOR elevation_id;
BEGIN

    DROP TABLE IF EXISTS temp_real_ids;
    CREATE TEMPORARY TABLE
    temp_real_ids (
        id INTEGER,
        fake_id INTEGER
    );

    INSERT INTO temp_real_ids (
        id,
        fake_id
    )
    SELECT * FROM UNNEST (id_pairs);

    FOREACH d IN ARRAY details
    LOOP
        IF d.id IS NOT NULL
        THEN
            UPDATE container_details
            SET

            WHERE id = ()
        ELSE
            INSERT INTO container_details
        END IF;
    END LOOP;

    DROP TABLE temp_real_ids;

    RETURN 1;
END;
$$ LANGUAGE plpgsql;
