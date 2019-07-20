
-- ELEVATIONS

CREATE TABLE
gc_protected.elevations (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects NOT NULL,
    system_set_id INTEGER REFERENCES system_sets,
    name VARCHAR(50) NOT NULL,
    rough_opening COORDINATE NOT NULL,
    finished_floor_height FLOAT DEFAULT 0,
    sightline FLOAT,
    preview VARCHAR(25000),
    last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_updated_by INTEGER REFERENCES users.users
);

CREATE TABLE
gc_protected.elevation_containers (
    id SERIAL PRIMARY KEY,
    elevation_id INTEGER REFERENCES elevations,
    original BOOLEAN DEFAULT FALSE,
    contents VARCHAR(50),
    daylight_opening COORDINATE,
    custom_rough_opening BOOLEAN DEFAULT FALSE
);

CREATE TABLE
gc_protected.container_details (
    id SERIAL PRIMARY KEY,
    elevation_id INTEGER REFERENCES elevations,
    first_container_id INTEGER REFERENCES elevation_containers,
    second_container_id INTEGER REFERENCES elevation_containers,
    vertical BOOLEAN,
    UNIQUE (first_container_id, second_container_id, vertical)
);

CREATE TABLE
gc_protected.detail_option_values (
    id SERIAL PRIMARY KEY,
    container_detail_id INTEGER REFERENCES container_details,
    option_value_id INTEGER REFERENCES option_values
);
