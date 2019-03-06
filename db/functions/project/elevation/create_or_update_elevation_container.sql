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
            bottom_or_left_offset
        ) VALUES (
            eid,
            ec.original,
            ec.contents,
            ec.daylight_opening,
            ec.bottom_or_left_offset
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
            bottom_or_left_offset = CASE
                WHEN ec.bottom_or_left_offset IS NOT NULL
                    THEN ec.bottom_or_left_offset
                ELSE elevation_containers.bottom_or_left_offset END
        WHERE elevation_containers.elevation_id = eid
        AND elevation_containers.id = ec.id
        RETURNING *;
    END IF;
END;
$$ LANGUAGE plpgsql;
