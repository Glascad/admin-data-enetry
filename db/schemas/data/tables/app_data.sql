
CREATE TABLE
manufacturers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

-- FUTURE
-- CREATE TABLE
-- system_tags (
--     id SERIAL PRIMARY KEY,
--     tag VARCHAR(50)
-- );


-- DELETE
-- CREATE TABLE
-- infill_sizes (
--     size FLOAT PRIMARY KEY
-- );


-- DELETE ???
-- CREATE TABLE
-- line_weights (
--     name VARCHAR(50),
--     weight FLOAT PRIMARY KEY
-- );

-- DELETE ???
-- CREATE TABLE
-- linetypes (
--     id SERIAL PRIMARY KEY,
--     line_weight INTEGER REFERENCES line_weights,
--     name VARCHAR(50),
--     pattern VARCHAR(50)
-- );


-- ENUMERATE
-- CREATE TABLE
-- orientations (
--     id SERIAL PRIMARY KEY,
--     orientation VARCHAR(50)
-- );

-- FUTURE
-- CREATE TABLE
-- part_types (
--     id SERIAL PRIMARY KEY,
--     type VARCHAR(50)
-- );

-- FUTURE
-- CREATE TABLE
-- part_tags (
--     id SERIAL PRIMARY KEY,
--     tag VARCHAR(50)
-- );

-- FUTURE
-- CREATE TABLE
-- infill_pocket_types (
--     id SERIAL PRIMARY KEY,
--     type VARCHAR(50),
--     description VARCHAR(5000),
--     captured BOOLEAN
-- );

-- FUTURE
-- CREATE TABLE
-- infill_pocket_sizes (
--     size FLOAT PRIMARY KEY
-- );

-- FUTURE
-- CREATE TABLE
-- fastener_types (
--     id SERIAL PRIMARY KEY,
--     type VARCHAR(50)
-- );

-- FUTURE
-- CREATE TABLE
-- fastener_head_types (
--     id SERIAL PRIMARY KEY,
--     type VARCHAR(50)
-- );

-- FUTURE
-- CREATE TABLE
-- thread_representations (
--     id SERIAL PRIMARY KEY,
--     type VARCHAR(50)
-- );


-- FUTURE
-- CREATE TABLE
-- parts (
--     id SERIAL PRIMARY KEY,
--     manufacturer_id INTEGER REFERENCES manufacturers,
--     system_id INTEGER REFERENCES systems,
--     fastener_type_id INTEGER REFERENCES fastener_types,
--     fastener_head_type_id INTEGER REFERENCES fastener_head_types,
--     thread_representation_id INTEGER REFERENCES thread_representations,
--     name VARCHAR(50),
--     part_number VARCHAR(50),
--     system_agnostic BOOLEAN,
--     pocket_count INTEGER,
--     door BOOLEAN,
--     diameter FLOAT,
--     length FLOAT
-- );

-- FUTURE
-- CREATE TABLE
-- part_orientations (
--     id SERIAL PRIMARY KEY,
--     part_id INTEGER REFERENCES parts,
--     orientation_id INTEGER REFERENCES orientations,
--     path VARCHAR(25000),
--     UNIQUE(part_id, orientation_id)
-- );

-- FUTURE
-- CREATE TABLE
-- thermal_pocket_types (
--     id SERIAL PRIMARY KEY,
--     path VARCHAR(10000)
-- );

-- FUTURE
-- CREATE TABLE
-- thermal_pockets (
--     id SERIAL PRIMARY KEY,
--     part_orientation_id INTEGER REFERENCES part_orientations,
--     thermal_pocket_type_id INTEGER REFERENCES thermal_pocket_types,
--     transform FLOAT[3][3]
-- );

-- FUTURE
-- CREATE TABLE
-- brake_metal_pockets (
--     id SERIAL PRIMARY KEY,
--     part_orientation_id INTEGER REFERENCES part_orientations,
--     angle FLOAT,
--     back FLOAT,
--     inside FLOAT,
--     outside FLOAT
-- );



-- FUTURE
-- CREATE TABLE
-- fastener_locations (
--     id SERIAL PRIMARY KEY,
--     part_orientation_id INTEGER REFERENCES part_orientations,
--     orientation_id INTEGER REFERENCES orientations,
--     transform fLOAT[3][3]
-- );

-- FUTURE
-- CREATE TABLE
-- infill_pocket_locations (
--     id SERIAL PRIMARY KEY,
--     part_orientation_id INTEGER REFERENCES part_orientations,
--     transform FLOAT[3][3]
-- );

-- FUTURE
-- CREATE TABLE
-- part_part_types (
--     part_id INTEGER REFERENCES parts,
--     part_type_id INTEGER REFERENCES part_types,
--     PRIMARY KEY (part_id, part_type_id)
-- );

-- FUTURE
-- CREATE TABLE
-- part_part_tags (
--     part_id INTEGER REFERENCES parts,
--     part_tag_id INTEGER REFERENCES part_tags,
--     PRIMARY KEY (part_id, part_tag_id)
-- );



-- FUTURE
-- CREATE TABLE
-- configuration_type_part_types (
--     configuration_type_id INTEGER REFERENCES configuration_types,
--     part_type_id INTEGER REFERENCES part_types,
--     PRIMARY KEY (configuration_type_id, part_type_id)
-- );




-- FUTURE
-- CREATE TABLE
-- configuration_name_override (
--     manufacturer_id INTEGER REFERENCES manufacturers,
--     configuration_type_id INTEGER REFERENCES configuration_types,
--     name_override VARCHAR(50),
--     PRIMARY KEY (manufacturer_id, configuration_type_id)
-- );
