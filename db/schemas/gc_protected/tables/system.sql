

CREATE TABLE
gc_protected.systems (
    id SERIAL PRIMARY KEY,
    manufacturer_id INTEGER REFERENCES manufacturers NOT NULL,
    system_type SYSTEM_TYPE REFERENCES system_types NOT NULL,
    name VARCHAR(50) NOT NULL,
    -- depth FLOAT,
    -- default_glass_size FLOAT,
    -- default_glass_bite FLOAT,
    -- default_sightline FLOAT,
    -- top_gap FLOAT,
    -- bottom_gap FLOAT,
    -- side_gap FLOAT,
    -- meeting_stile_gap FLOAT,
    -- inset FLOAT,
    -- glass_gap FLOAT,
    -- shim_size FLOAT,
    -- front_inset BOOLEAN,
    UNIQUE (
        id,
        system_type
    ),
    UNIQUE (
        name,
        manufacturer_id
    )
);

-- FUTURE
-- CREATE TABLE
-- gc_protected.system_infill_sizes (
--     system_id INTEGER REFERENCES systems,
--     infill_size FLOAT REFERENCES infill_sizes,
--     PRIMARY KEY (system_id, infill_size)
-- );

-- FUTURE
-- CREATE TABLE
-- gc_protected.system_system_tags (
--     system_id INTEGER REFERENCES systems,
--     system_tag_id INTEGER REFERENCES system_tags,
--     PRIMARY KEY (system_id, system_tag_id)
-- );


-- ENUMERATE (tie to enumeration)
CREATE TABLE
gc_protected.system_options (
    system_id INTEGER REFERENCES systems NOT NULL,
    name SYSTEM_OPTION_NAME REFERENCES valid_system_options NOT NULL,
    -- presentation_level PRESENTATION_LEVEL REFERENCES ordered_presentation_levels,
    -- override_level PRESENTATION_LEVEL REFERENCES ordered_presentation_levels,
    -- option_order INTEGER,
    PRIMARY KEY (name, system_id),
    UNIQUE (name, system_id)
);

-- ENUMERATE (tie to enumeration)
CREATE TABLE
gc_protected.option_values (
    system_id INTEGER REFERENCES systems NOT NULL,
    option_name SYSTEM_OPTION_NAME REFERENCES valid_system_options NOT NULL,
    name OPTION_VALUE_NAME NOT NULL,
    value FLOAT,
    -- value_order INTEGER,
    PRIMARY KEY (system_id, option_name, name),
    UNIQUE (system_id, option_name, name),
    FOREIGN KEY (system_id, option_name)
    REFERENCES system_options (system_id, name),
    FOREIGN KEY (option_name, name)
    REFERENCES valid_option_values (option_name, name)
);

-- ALTER TABLE
-- option_values
-- ADD COLUMN
-- mirror_from_option_value_id INTEGER REFERENCES option_values;

-- DELETE ???
-- CREATE TABLE
-- gc_protected.option_combinations (
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
-- gc_protected.option_combination_option_values (
--     option_combination_id INTEGER REFERENCES option_combinations,
--     option_value_id INTEGER REFERENCES option_values,
--     PRIMARY KEY (option_combination_id, option_value_id)
-- );

-- DELETE ???
-- CREATE TABLE
-- gc_protected.option_combination_configuration_types (
--     option_combination_id INTEGER REFERENCES option_combinations,
--     configuration_type INTEGER REFERENCES configuration_types,
--     PRIMARY KEY (option_combination_id, configuration_type)
-- );

-- tie to enumeration
-- CREATE TABLE
-- gc_protected.system_option_configuration_types (
--     system_option_id INTEGER REFERENCES system_options,
--     configuration_type CONFIGURATION_TYPE,
--     PRIMARY KEY (system_option_id, configuration_type)
-- );



-- FUTURE
-- CREATE TABLE
-- gc_protected.system_infill_pocket_types (
--     system_id INTEGER REFERENCES systems,
--     infill_pocket_type_id INTEGER REFERENCES infill_pocket_types,
--     PRIMARY KEY (system_id, infill_pocket_type_id)
-- );

-- FUTURE
-- CREATE TABLE
-- gc_protected.system_infill_pocket_sizes (
--     system_id INTEGER REFERENCES systems,
--     infill_pocket_size FLOAT REFERENCES infill_pocket_sizes,
--     PRIMARY KEY (system_id, infill_pocket_size)
-- );

-- tie to enumeration
CREATE TABLE
gc_protected.invalid_system_configuration_types (
    system_id INTEGER REFERENCES systems NOT NULL,
    detail_type DETAIL_TYPE NOT NULL,
    invalid_configuration_type CONFIGURATION_TYPE NOT NULL,
    PRIMARY KEY (system_id, invalid_configuration_type)
);

-- tie to enumeration
CREATE TABLE
gc_protected.system_configuration_overrides (
    system_id INTEGER REFERENCES systems,
    system_type SYSTEM_TYPE REFERENCES system_types NOT NULL,
    detail_type DETAIL_TYPE NOT NULL,
    configuration_type CONFIGURATION_TYPE NOT NULL,
    required_override BOOLEAN,
    -- mirrorable_override BOOLEAN,
    -- presentation_level_override PRESENTATION_LEVEL REFERENCES ordered_presentation_levels,
    -- override_level_override PRESENTATION_LEVEL REFERENCES ordered_presentation_levels,
    PRIMARY KEY (
        system_id,
        detail_type,
        configuration_type
    ),
    FOREIGN KEY (
        system_type,
        detail_type,
        configuration_type
    )
    REFERENCES system_type_detail_type_configuration_types (
        system_type,
        detail_type,
        configuration_type
    )
);
