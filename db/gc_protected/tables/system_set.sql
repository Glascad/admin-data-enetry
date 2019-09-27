
CREATE TABLE
gc_protected.system_sets (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects NOT NULL,
    system_id INTEGER REFERENCES systems NOT NULL,
    system_option_value_path LTREE REFERENCES system_option_values NOT NULL,
    name VARCHAR(50),
    UNIQUE (id, system_option_value_path),
    UNIQUE (id, system_id),
    CHECK (
        system_id = subltree(system_option_value_path, 0, 1)::TEXT::INTEGER
    )
);

CREATE TABLE
gc_protected.system_set_option_group_values (
    id SERIAL PRIMARY KEY,
    system_id INTEGER REFERENCES systems NOT NULL,
    system_set_id INTEGER REFERENCES system_sets NOT NULL,
    option_name OPTION_NAME NOT NULL,
    name OPTION_VALUE_NAME NOT NULL,
    UNIQUE (system_set_id, option_name, name),
    FOREIGN KEY (
        system_set_id,
        system_id
    )
    REFERENCES system_sets (
        id,
        system_id
    ),
    FOREIGN KEY (
        system_id,
        option_name,
        name
    )
    REFERENCES option_group_values (
        system_id,
        option_name,
        name
    )
    INITIALLY DEFERRED
);

CREATE TABLE
gc_protected.system_set_detail_option_values (
    id SERIAL PRIMARY KEY,
    system_set_id INTEGER REFERENCES system_sets,
    system_option_value_path LTREE REFERENCES system_option_values NOT NULL,
    detail_option_value_path LTREE REFERENCES detail_option_values NOT NULL,
    UNIQUE (system_set_id, detail_option_value_path),
    UNIQUE (id, detail_option_value_path),
    FOREIGN KEY (
        system_set_id,
        system_option_value_path
    )
    REFERENCES system_sets (
        id,
        system_option_value_path
    ),
    CHECK (
        system_option_value_path @> detail_option_value_path
    )
);

CREATE TABLE
gc_protected.system_set_configuration_option_values (
    id SERIAL PRIMARY KEY,
    system_set_id INTEGER REFERENCES system_sets,
    detail_option_value_path LTREE REFERENCES detail_option_values NOT NULL,
    configuration_option_value_path LTREE REFERENCES configuration_option_values NOT NULL,
    FOREIGN KEY (
        system_set_id,
        detail_option_value_path
    )
    REFERENCES system_set_detail_option_values (
        system_set_id,
        detail_option_value_path
    ),
    CHECK (
        detail_option_value_path @> configuration_option_value_path
    )
);



--     system_id INTEGER REFERENCES systems NOT NULL,
--     option_name OPTION_NAME REFERENCES valid_options NOT NULL,
--     option_value_name OPTION_VALUE_NAME NOT NULL,
--     FOREIGN KEY (
--         option_name,
--         option_value_name
--     ) REFERENCES valid_option_values (
--         option_name,
--         name
--     ),
--     FOREIGN KEY (
--         system_id,
--         option_name
--     ) REFERENCES raised_option_names (
--         system_id,
--         option_name
--     )

-- CREATE TABLE
-- gc_protected.system_set_detail_option_values (
--     id SERIAL PRIMARY KEY,
--     system_set_id INTEGER REFERENCES system_sets NOT NULL,
--     system_id INTEGER REFERENCES systems NOT NULL,
--     detail_option_value_id INTEGER REFERENCES detail_option_values NOT NULL,
    
-- );

-- CREATE TABLE
-- gc_protected.system_sets (
--     id SERIAL PRIMARY KEY,
--     project_id INTEGER REFERENCES projects NOT NULL,
--     system_id INTEGER REFERENCES systems NOT NULL,
--     system_type SYSTEM_TYPE REFERENCES system_types NOT NULL,
--     name VARCHAR(50),
--     -- infill_size FLOAT,
--     FOREIGN KEY (
--         system_id,
--         system_type
--     )
--     REFERENCES systems (
--         id,
--         system_type
--     ),
--     -- FOREIGN KEY (
--     --     system_id,
--     --     infill_size
--     -- )
--     -- REFERENCES system_infill_sizes (
--     --     system_id,
--     --     infill_size
--     -- ),
--     UNIQUE (id, system_id),
--     UNIQUE (id, system_id, system_type)
-- );

-- CREATE TABLE
-- gc_protected.system_set_option_values (
--     system_set_id INTEGER REFERENCES system_sets NOT NULL,
--     system_id INTEGER REFERENCES systems NOT NULL,
--     -- system_type SYSTEM_TYPE NOT NULL,
--     option_name SYSTEM_OPTION_NAME REFERENCES valid_system_options NOT NULL,
--     name OPTION_VALUE_NAME NOT NULL,
--     PRIMARY KEY (system_set_id, option_name),
--     FOREIGN KEY (
--         system_set_id,
--         system_id
--         -- system_type
--     )
--     REFERENCES system_sets (
--         id,
--         system_id
--         -- system_type
--     ),
--     FOREIGN KEY (
--         system_id,
--         option_name
--     )
--     REFERENCES system_options (
--         system_id,
--         name
--     ),
--     FOREIGN KEY (
--         system_id,
--         option_name,
--         name
--     )
--     REFERENCES option_values (
--         system_id,
--         option_name,
--         name
--     )
-- );

-- COMMENT ON TABLE gc_protected.system_set_option_values IS 'Entries represent option values which have been selected within the system type - if no entry exists, then the default (first) option value is selected.';

-- CREATE TABLE
-- gc_protected.system_set_detail_type_configuration_types (
--     system_set_id INTEGER REFERENCES system_sets NOT NULL,
--     system_id INTEGER REFERENCES systems NOT NULL,
--     system_type SYSTEM_TYPE NOT NULL,
--     detail_type DETAIL_TYPE NOT NULL,
--     configuration_type CONFIGURATION_TYPE NOT NULL,
--     PRIMARY KEY (system_id, detail_type, configuration_type),
--     FOREIGN KEY (
--         system_set_id,
--         system_id,
--         system_type
--     )
--     REFERENCES system_sets (
--         id,
--         system_id,
--         system_type
--     ),
--     FOREIGN KEY (
--         system_type,
--         detail_type,
--         configuration_type
--     )
--     REFERENCES system_type_detail_type_configuration_types (
--         system_type,
--         detail_type,
--         configuration_type
--     )
-- );

-- COMMENT ON TABLE gc_protected.system_set_detail_type_configuration_types IS 'Entries represent optional configuration types which have been selected within each detail type within the system set - if no entry exists, the optional configuration type is excluded - entries must only reference optional configuration types, however this is not yet enforced.';

-- -- FUTURE
-- -- CREATE TABLE
-- -- gc_protected.system_set_infill_sizes (
-- --     system_set_id INTEGER,
-- --     system_id INTEGER,
-- --     infill_size FLOAT,
-- --     PRIMARY KEY (system_id, infill_size)
-- -- );
