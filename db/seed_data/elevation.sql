
DO $create_elevation$ DECLARE ___ INTEGER; BEGIN

<<LOOP ID (1, 3) >>

    SET LOCAL jwt.claims.user_id TO <<ID>>;

    SELECT 1 FROM update_entire_elevation((
        -- id INTEGER,
        NULL,
        -- project_id INTEGER,
        <<ID>>,
        -- system_set_id INTEGER,
        <<ID>>,
        -- name TEXT,
        'Sample Elevation',
        -- rough_opening DIMENSIONS,
        (400, 200),
        -- finished_floor_height FLOAT,
        0,
        -- containers ENTIRE_ELEVATION_CONTAINER[],
        ARRAY[(
            -- id INTEGER,
            NULL,
            -- fake_id INTEGER,
            1,
            -- original BOOLEAN,
            TRUE,
            -- contents TEXT,
            NULL,
            -- daylight_opening RECTANGLE,
            (
                -- origin
                (2, 2),
                -- dimensions
                (197, 196)
            )
            -- -- custom_rough_opening BOOLEAN
        ), (
            NULL,
            2,
            FALSE,
            NULL,
            (
                (201, 2),
                (197, 196)
            )
        )]::ENTIRE_ELEVATION_CONTAINER[],
        -- container_ids_to_delete INTEGER[],
        NULL,
        -- details ENTIRE_CONTAINER_DETAIL[],
        ARRAY[(
            -- id INTEGER,
            NULL,
            -- fake_id INTEGER,
            3,
            -- vertical BOOLEAN,
            FALSE,
            -- placement RECTANGLE
            (
                (2, 0),
                (197, 2)
            ),
            -- first_container_id INTEGER,
            NULL,
            -- first_container_fake_id INTEGER,
            NULL,
            -- second_container_id INTEGER,
            NULL,
            -- second_container_fake_id INTEGER
            1
        ), (
            NULL,
            4,
            FALSE,
            (
                (2, 198),
                (197, 2)
            ),
            NULL,
            1,
            NULL,
            NULL
        ), (
            NULL,
            5,
            FALSE,
            (
                (201, 0),
                (197, 2)
            ),
            NULL,
            NULL,
            NULL,
            2
        ), (
            NULL,
            6,
            FALSE,
            (
                (201, 198),
                (197, 2)
            ),
            NULL,
            2,
            NULL,
            NULL
        ), (
            NULL,
            7,
            TRUE,
            (
                (0, 2),
                (2, 196)
            ),
            NULL,
            NULL,
            NULL,
            1
        ), (
            NULL,
            8,
            TRUE,
            (
                (199, 2),
                (2, 196)
            ),
            NULL,
            1,
            NULL,
            2
        ), (
            NULL,
            9,
            TRUE,
            (
                (398, 2),
                (2, 196)
            ),
            NULL,
            2,
            NULL,
            NULL
        )]::ENTIRE_CONTAINER_DETAIL[],
        -- detail_ids_to_delete INTEGER[],
        NULL,
        --frames ENTIRE_ELEVATION_FRAME[],
        ARRAY[(
            -- vertical BOOLEAN,
            FALSE,
            -- placement RECTANGLE,
            (
                (2, 0),
                (197, 2)
            ),
            -- container_detail_ids INTEGER[]
            NULL,
            -- container_detail_fake_ids INTEGER[]
            ARRAY[3]
        ), (
            FALSE,
            (
                (2, 198),
                (197, 2)
            ),
            NULL,
            ARRAY[4]
        ), (
            FALSE,
            (
                (201, 0),
                (197, 2)
            ),
            NULL,
            ARRAY[5]
        ), (
            FALSE,
            (
                (201, 198),
                (197, 2)
            ),
            NULL,
            ARRAY[6]
        ), (
            TRUE,
            (
                (0, 0),
                (2, 200)
            ),
            NULL,
            ARRAY[7]
        ), (
            TRUE,
            (
                (199, 0),
                (2, 200)
            ),
            NULL,
            ARRAY[8]
        ), (
            TRUE,
            (
                (398, 0),
                (2, 200)
            ),
            NULL,
            ARRAY[9]
        )]::ENTIRE_ELEVATION_FRAME[],
        -- sightline FLOAT,
        -- preview TEXT
        NULL
    )::ENTIRE_ELEVATION) INTO ___;

    SET LOCAL jwt.claims.user_id TO 0;

<<END LOOP>>

END $create_elevation$;
