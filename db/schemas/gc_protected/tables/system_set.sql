
CREATE TABLE
gc_protected.system_sets (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects,
    system_id INTEGER REFERENCES systems,
    system_type SYSTEM_TYPE,
    infill_size FLOAT,
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
    system_set_id INTEGER,
    system_id INTEGER,
    system_type SYSTEM_TYPE,
    system_option_id INTEGER REFERENCES system_options,
    option_value_id INTEGER REFERENCES option_values,
    PRIMARY KEY (system_id, system_option_id),
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
        system_option_id
    )
    REFERENCES system_options (
        system_id,
        id
    ),
    FOREIGN KEY (
        system_option_id,
        option_value_id
    )
    REFERENCES option_values (
        system_option_id,
        id
    )
);

CREATE TABLE
gc_protected.system_set_detail_type_configuration_types (
    system_set_id INTEGER,
    system_id INTEGER,
    system_type SYSTEM_TYPE,
    detail_type DETAIL_TYPE,
    configuration_type CONFIGURATION_TYPE,
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
