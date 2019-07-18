
CREATE TABLE
systems (
    id SERIAL PRIMARY KEY,
    manufacturer_id INTEGER REFERENCES manufacturers,
    system_type_id INTEGER REFERENCES system_types,
    name VARCHAR(50),
    depth FLOAT,
    default_glass_size FLOAT,
    default_glass_bite FLOAT,
    default_sightline FLOAT,
    top_gap FLOAT,
    bottom_gap FLOAT,
    side_gap FLOAT,
    meeting_stile_gap FLOAT,
    inset FLOAT,
    glass_gap FLOAT,
    shim_size FLOAT,
    front_inset BOOLEAN,
    UNIQUE (
        id,
        system_type_id
    )
);

-- FUTURE
-- CREATE TABLE
-- system_infill_sizes (
--     system_id INTEGER REFERENCES systems,
--     infill_size FLOAT REFERENCES infill_sizes,
--     PRIMARY KEY (system_id, infill_size)
-- );

-- FUTURE
-- CREATE TABLE
-- system_system_tags (
--     system_id INTEGER REFERENCES systems,
--     system_tag_id INTEGER REFERENCES system_tags,
--     PRIMARY KEY (system_id, system_tag_id)
-- );


-- ENUMERATE (tie to enumeration)
-- CREATE TABLE
-- system_options (
--     id SERIAL PRIMARY KEY,
--     system_id INTEGER REFERENCES systems,
--     name VARCHAR(50),
--     presentation_level PRESENTATION_LEVEL,
--     override_level PRESENTATION_LEVEL,
--     option_order INTEGER,
--     UNIQUE (id, system_id)
-- );

-- ENUMERATE (tie to enumeration)
-- CREATE TABLE
-- option_values (
--     id SERIAL PRIMARY KEY,
--     system_option_id INTEGER REFERENCES system_options,
--     name VARCHAR(50),
--     value FLOAT,
--     value_order INTEGER,
--     UNIQUE (id, system_option_id)
-- );

-- ALTER TABLE
-- option_values
-- ADD COLUMN
-- mirror_from_option_value_id INTEGER REFERENCES option_values;

-- DELETE ???
-- CREATE TABLE
-- option_combinations (
--     id SERIAL PRIMARY KEY,
--     system_id INTEGER REFERENCES systems,
--     invalid BOOLEAN,
--     depth_override FLOAT,
--     glass_size_override FLOAT,
--     glass_bite_override FLOAT,
--     sightline_override FLOAT,
--     top_gap_override FLOAT,
--     bottom_gap_override FLOAT,
--     side_gap_override FLOAT,
--     meeting_stile_gap_override FLOAT,
--     glass_gap_override FLOAT,
--     shim_size_override FLOAT,
--     inset_override FLOAT,
--     front_inset_override BOOLEAN
-- );



-- DELETE ???
-- CREATE TABLE
-- option_combination_option_values (
--     option_combination_id INTEGER REFERENCES option_combinations,
--     option_value_id INTEGER REFERENCES option_values,
--     PRIMARY KEY (option_combination_id, option_value_id)
-- );

-- DELETE ???
-- CREATE TABLE
-- option_combination_configuration_types (
--     option_combination_id INTEGER REFERENCES option_combinations,
--     configuration_type_id INTEGER REFERENCES configuration_types,
--     PRIMARY KEY (option_combination_id, configuration_type_id)
-- );

-- tie to enumeration
-- CREATE TABLE
-- system_option_configuration_types (
--     system_option_id INTEGER REFERENCES system_options,
--     configuration_type_id INTEGER REFERENCES configuration_types,
--     PRIMARY KEY (system_option_id, configuration_type_id)
-- );



-- FUTURE
-- CREATE TABLE
-- system_infill_pocket_types (
--     system_id INTEGER REFERENCES systems,
--     infill_pocket_type_id INTEGER REFERENCES infill_pocket_types,
--     PRIMARY KEY (system_id, infill_pocket_type_id)
-- );

-- FUTURE
-- CREATE TABLE
-- system_infill_pocket_sizes (
--     system_id INTEGER REFERENCES systems,
--     infill_pocket_size FLOAT REFERENCES infill_pocket_sizes,
--     PRIMARY KEY (system_id, infill_pocket_size)
-- );

-- tie to enumeration
-- CREATE TABLE
-- invalid_system_configuration_types (
--     system_id INTEGER REFERENCES systems,
--     invalid_configuration_type_id INTEGER REFERENCES configuration_types,
--     PRIMARY KEY (system_id, invalid_configuration_type_id)
-- );

-- tie to enumeration
-- CREATE TABLE
-- system_type_detail_type_configuration_types (
--     id SERIAL PRIMARY KEY,
--     system_type_id INTEGER REFERENCES system_types,
--     detail_type_id INTEGER REFERENCES detail_types,
--     configuration_type_id INTEGER REFERENCES configuration_types,
--     required BOOLEAN,
--     mirrorable BOOLEAN,
--     presentation_level PRESENTATION_LEVEL,
--     override_level PRESENTATION_LEVEL,
--     UNIQUE (system_type_id, detail_type_id, configuration_type_id)
-- );

-- tie to enumeration
-- CREATE TABLE
-- system_configuration_overrides (
--     system_id INTEGER REFERENCES systems,
--     system_type_id INTEGER,
--     detail_type_id INTEGER,
--     configuration_type_id INTEGER,
--     required_override BOOLEAN,
--     mirrorable_override BOOLEAN,
--     presentation_level_override PRESENTATION_LEVEL,
--     override_level_override PRESENTATION_LEVEL,
--     PRIMARY KEY (system_id, detail_type_id, configuration_type_id),
--     FOREIGN KEY (
--         system_type_id, 
--         detail_type_id, 
--         configuration_type_id
--     )
--     REFERENCES system_type_detail_type_configuration_types (
--         system_type_id,
--         detail_type_id,
--         configuration_type_id
--     )
-- );
