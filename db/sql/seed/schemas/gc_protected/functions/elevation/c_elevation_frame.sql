
DROP FUNCTION IF EXISTS create_entire_elevation_frame;

CREATE OR REPLACE FUNCTION gc_protected.create_entire_elevation_frame(
    elevation_frame ENTIRE_ELEVATION_FRAME,
    elevation_id INTEGER
) RETURNS ELEVATION_FRAMES AS $$
DECLARE
    ef ALIAS FOR elevation_frame;
    eid ALIAS FOR elevation_id;
    uef ELEVATION_FRAMES;
    cdfid INTEGER;
BEGIN

    INSERT INTO elevation_frames (
        elevation_id,
        vertical,
        placement
    ) VALUES (
        eid,
        ef.vertical,
        ef.placement
    )
    RETURNING * INTO uef;

    -- UPDATE EXISTING DETAILS
    IF ef.container_detail_ids IS NOT NULL THEN
        UPDATE container_details cd
            SET elevation_frame_id = uef.id
        WHERE cd.elevation_id = eid
        AND cd.id IN (
            SELECT * FROM UNNEST(ef.container_detail_ids)
        );
    END IF;

    RETURN uef;

END;
$$ LANGUAGE plpgsql;
