
-- ELEVATIONS

DROP TABLE IF EXISTS detail_option_values;
DROP TABLE IF EXISTS container_details;
DROP TABLE IF EXISTS elevation_containers;
DROP TABLE IF EXISTS elevations;

CREATE TABLE
elevations (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects,
    system_set_id INTEGER REFERENCES system_sets,
    name VARCHAR(50),
    rough_opening COORDINATE,
    finished_floor_height FLOAT
);

CREATE TABLE
elevation_containers (
    id SERIAL PRIMARY KEY,
    elevation_id INTEGER REFERENCES elevations,
    original BOOLEAN DEFAULT FALSE,
    contents VARCHAR(50),
    daylight_opening COORDINATE,
    custom_rough_opening BOOLEAN DEFAULT FALSE
);

CREATE TABLE
container_details (
    id SERIAL PRIMARY KEY,
    elevation_id INTEGER REFERENCES elevations,
    first_container_id INTEGER REFERENCES elevation_containers,
    second_container_id INTEGER REFERENCES elevation_containers,
    vertical BOOLEAN,
    UNIQUE (first_container_id, second_container_id, vertical)
);

CREATE TABLE
detail_option_values (
    id SERIAL PRIMARY KEY,
    container_detail_id INTEGER REFERENCES container_details,
    option_value_id INTEGER REFERENCES option_values
);
