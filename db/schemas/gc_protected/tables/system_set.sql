
CREATE TABLE
gc_protected.system_sets (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects NOT NULL,
    system_id INTEGER REFERENCES systems NOT NULL,
    system_type SYSTEM_TYPE NOT NULL,
    name VARCHAR(50),
    -- infill_size FLOAT,
    FOREIGN KEY (
        system_id,
        system_type
    )
    REFERENCES systems (
        id,
        system_type
    ),
    -- FOREIGN KEY (
    --     system_id,
    --     infill_size
    -- )
    -- REFERENCES system_infill_sizes (
    --     system_id,
    --     infill_size
    -- ),
    UNIQUE (id, system_id, system_type)
);

CREATE TABLE
gc_protected.system_set_option_values (
    system_set_id INTEGER REFERENCES system_sets NOT NULL,
    system_id INTEGER REFERENCES systems NOT NULL,
    system_type SYSTEM_TYPE NOT NULL,
    option_name SYSTEM_OPTION_NAME REFERENCES valid_system_options NOT NULL,
    name OPTION_VALUE_NAME NOT NULL,
    PRIMARY KEY (system_set_id, option_name),
    FOREIGN KEY (
        system_set_id,
        system_id,
        system_type
    )
    REFERENCES system_sets (
        id,
        system_id,
        system_type
    ),
    FOREIGN KEY (
        system_id,
        option_name
    )
    REFERENCES system_options (
        system_id,
        name
    ),
    FOREIGN KEY (
        system_id,
        option_name,
        name
    )
    REFERENCES option_values (
        system_id,
        option_name,
        name
    )
);

CREATE TABLE
gc_protected.system_set_detail_type_configuration_types (
    system_set_id INTEGER REFERENCES system_sets NOT NULL,
    system_id INTEGER REFERENCES systems NOT NULL,
    system_type SYSTEM_TYPE NOT NULL,
    detail_type DETAIL_TYPE NOT NULL,
    configuration_type CONFIGURATION_TYPE NOT NULL,
    PRIMARY KEY (system_id, detail_type, configuration_type),
    FOREIGN KEY (
        system_set_id,
        system_id,
        system_type
    )
    REFERENCES system_sets (
        id,
        system_id,
        system_type
    )
);

-- FUTURE
-- CREATE TABLE
-- gc_protected.system_set_infill_sizes (
--     system_set_id INTEGER,
--     system_id INTEGER,
--     infill_size FLOAT,
--     PRIMARY KEY (system_id, infill_size)
-- );
