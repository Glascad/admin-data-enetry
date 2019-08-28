
-- FUTURE
-- CREATE TABLE
-- gc_data.configurations (
--     id SERIAL PRIMARY KEY,
--     configuration_type_id INTEGER REFERENCES configuration_types,
--     infill_pocket_type_id INTEGER REFERENCES infill_pocket_types,
--     infill_size INTEGER REFERENCES infill_sizes,
--     brake_metal BOOLEAN,
--     sightline FLOAT,
--     complete BOOLEAN,
--     completed_at TIMESTAMP
-- );

-- FUTURE
-- CREATE TABLE
-- gc_data.configuration_transformations (
--     id SERIAL PRIMARY KEY,
--     detail_type_id INTEGER REFERENCES detail_types,
--     configuration_id INTEGER REFERENCES configurations,
--     configuration_transform FLOAT[3][3],
--     detail_transform FLOAT[3][3],
--     center_point FLOAT[2],
--     direction FLOAT,
--     range NUMRANGE
-- );

-- FUTURE
-- CREATE TABLE
-- gc_data.configuration_parts (
--     id SERIAL PRIMARY KEY,
--     configuration_id INTEGER REFERENCES configurations,
--     linetype_id INTEGER REFERENCES linetypes,
--     part_orientation_id INTEGER REFERENCES part_orientations,
--     transform FLOAT[3][3]
-- );


-- tie to enumeration
-- CREATE TABLE
-- gc_data.configuration_option_values (
--     configuration_id INTEGER REFERENCES configurations,
--     option_value_id INTEGER REFERENCES option_values,
--     PRIMARY KEY (configuration_id, option_value_id)
-- );