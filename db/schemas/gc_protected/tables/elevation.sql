
-- ELEVATIONS

CREATE TABLE
gc_protected.elevations (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects NOT NULL,
    system_set_id INTEGER REFERENCES system_sets NOT NULL,
    name VARCHAR(50) NOT NULL,
    rough_opening DIMENSIONS NOT NULL,
    finished_floor_height FLOAT DEFAULT 0 NOT NULL,
    -- sightline FLOAT,
    preview VARCHAR(25000),
    last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_updated_by INTEGER REFERENCES users,
    UNIQUE (project_id, name),
    FOREIGN KEY (
        project_id,
        system_set_id
    )
    REFERENCES system_sets (
        project_id,
        id
    ),
    CONSTRAINT valid_rough_opening CHECK (
        validate_rectangle(((0, 0), rough_opening)::RECTANGLE)
    )
);

CREATE TABLE
gc_protected.elevation_containers (
    id SERIAL PRIMARY KEY,
    elevation_id INTEGER REFERENCES elevations NOT NULL,
    original BOOLEAN DEFAULT FALSE NOT NULL,
    contents VARCHAR(50),
    daylight_opening RECTANGLE NOT NULL, -- <-- should be not null?
    -- custom_rough_opening BOOLEAN DEFAULT FALSE,
    UNIQUE (elevation_id, id),
    CONSTRAINT dlo_valid_rectangle CHECK (
        validate_rectangle(daylight_opening)
    )
);

CREATE TABLE
gc_protected.elevation_frames (
    id SERIAL PRIMARY KEY,
    elevation_id INTEGER REFERENCES elevations NOT NULL,
    vertical BOOLEAN NOT NULL,
    placement RECTANGLE NOT NULL,
    UNIQUE (elevation_id, id),
    CONSTRAINT frame_valid_placement CHECK (
        validate_rectangle(placement)
    )
);

CREATE TABLE
gc_protected.container_details (
    id SERIAL PRIMARY KEY,
    elevation_id INTEGER REFERENCES elevations NOT NULL,
    first_container_id INTEGER REFERENCES elevation_containers,
    second_container_id INTEGER REFERENCES elevation_containers,
    elevation_frame_id INTEGER REFERENCES elevation_frames INITIALLY DEFERRED,
    vertical BOOLEAN NOT NULL,
    placement RECTANGLE NOT NULL,
    UNIQUE (first_container_id, second_container_id),
    FOREIGN KEY (
        elevation_id,
        first_container_id
    ) REFERENCES elevation_containers (
        elevation_id,
        id
    ),
    FOREIGN KEY (
        elevation_id,
        second_container_id
    ) REFERENCES elevation_containers (
        elevation_id,
        id
    ),
    CONSTRAINT detail_references_at_least_one_container CHECK (
        first_container_id IS NOT NULL
        OR
        second_container_id IS NOT NULL
    ),
    CONSTRAINT detail_valid_placement CHECK (
        validate_rectangle(placement)
    )
);
