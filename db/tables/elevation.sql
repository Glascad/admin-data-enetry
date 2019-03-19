
-- ELEVATIONS

DROP TABLE IF EXISTS detail_option_values;
DROP TABLE IF EXISTS container_details;
DROP TABLE IF EXISTS elevation_containers;
DROP TABLE IF EXISTS elevations;

CREATE TABLE
elevations (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects,
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
    bottom_left_offset COORDINATE
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

INSERT INTO elevations (
    name,
    rough_opening,
    finished_floor_offset
)
VALUES (
    'TEST',
    ROW(360,360),
    0
);

INSERT INTO elevation_containers (
    elevation_id,
    original,
    contents,
    daylight_opening
)
VALUES (
    1,
    true,
    'GLASS',
    ROW(165, 165)
), (
    1,
    false,
    'GLASS',
    ROW(165,165)
), (
    1,
    false,
    'GLASS',
    ROW(165,165)
), (
    1,
    false,
    'GLASS',
    ROW(165,165)
);

INSERT INTO container_details (
    elevation_id,
    vertical,
    first_container_id,
    second_container_id
)
VALUES
(1, true, null, 1),
(1, true, 1, 3),
(1, true, 3, null),
(1, true, null, 2),
(1, true, 2, 4),
(1, true, 4, null),
(1, false, null, 1),
(1, false, 1, 2),
(1, false, 2, null),
(1, false, null, 3),
(1, false, 3, 4),
(1, false, 4, null);
