
CREATE TABLE
gc_data.configurations (
    id SERIAL PRIMARY KEY

    -- configuration_type_id INTEGER REFERENCES configuration_types,
    -- infill_pocket_type_id INTEGER REFERENCES infill_pocket_types,
    -- infill_size INTEGER REFERENCES infill_sizes,
    -- brake_metal BOOLEAN,
    -- sightline FLOAT,
    -- complete BOOLEAN,
    -- completed_at TIMESTAMP
);

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


CREATE TABLE
gc_data.configuration_parts (
    id SERIAL PRIMARY KEY,
    configuration_id INTEGER REFERENCES configurations,
    transform MATRIX NOT NULL,
    part_id INTEGER REFERENCES parts,
    part_orientation ORIENTATION,
    extra_part_path_id INTEGER REFERENCES extra_part_paths,
    extra_part_path_orientation ORIENTATION,
    FOREIGN KEY (part_id, part_orientation)
    REFERENCES parts (id, orientation),
    FOREIGN KEY (extra_part_path_id, extra_part_path_orientation)
    REFERENCES extra_part_paths (id, orientation),
    UNIQUE (configuration_id, part_id, part_orientation),
    CHECK (
        (
            part_id IS NOT NULL
            AND
            part_orientation IS NOT NULL
            AND
            extra_part_path_id IS NULL
            AND
            extra_part_path_orientation IS NULL
        ) OR (
            part_id IS NULL
            AND
            part_orientation IS NULL
            AND
            extra_part_path_id IS NOT NULL
            AND
            extra_part_path_orientation IS NOT NULL
        )
    )
    -- linetype_id INTEGER REFERENCES linetypes,
    -- part_orientation_id INTEGER REFERENCES part_orientations,
    -- transform FLOAT[3][3]
);


-- tie to enumeration
-- CREATE TABLE
-- gc_data.configuration_option_values (
--     configuration_id INTEGER REFERENCES configurations,
--     option_value_id INTEGER REFERENCES option_values,
--     PRIMARY KEY (configuration_id, option_value_id)
-- );