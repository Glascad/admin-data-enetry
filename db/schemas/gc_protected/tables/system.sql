

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


-- SYSTEM OPTIONS

CREATE TABLE
gc_protected.system_options (
    id SERIAL PRIMARY KEY,
    system_id INTEGER REFERENCES systems,
    name OPTION_NAME REFERENCES valid_options,
    -- for foreign keys
    UNIQUE (id, system_id, name)
);

CREATE TABLE
gc_protected.system_option_values (
    id SERIAL PRIMARY KEY,
    system_id INTEGER REFERENCES systems,
    system_option_id INTEGER REFERENCES system_options,
    option_name OPTION_NAME,
    name OPTION_VALUE_NAME,
    raised_option_names OPTION_NAME[],
    raised_configuration_types CONFIGURATION_TYPE[],
    -- for foreign keys
    UNIQUE (id, system_id),
    -- only one of each value per option
    UNIQUE (system_option_id, name),
    -- must reference option within correct system
    FOREIGN KEY (
        system_id,
        system_option_id,
        option_name
    )
    REFERENCES system_options (
        system_id,
        id,
        name
    ),
    -- must reference valid option value for option name
    FOREIGN KEY (option_name, name)
    REFERENCES valid_option_values (option_name, name)
);

-- recursion
ALTER TABLE gc_protected.system_options ADD COLUMN parent_system_option_value_id INTEGER REFERENCES system_option_values;

-- CREATE TABLE
-- gc_protected.raised_option_names (
--     system_id INTEGER REFERENCES systems,
--     option_name OPTION_NAME,
--     option_value_name OPTION_VALUE_NAME,
--     raised_option_name OPTION_NAME,

-- );

-- CREATE TABLE
-- gc_protected.raised_configuration_types (

-- );

-- DETAIL TYPES

CREATE TABLE
gc_protected.system_detail_types (
    id SERIAL PRIMARY KEY,
    system_id INTEGER REFERENCES systems,
    system_option_value_id INTEGER REFERENCES system_option_values,
    detail_type DETAIL_TYPE REFERENCES detail_types,
    -- for foreign keys
    UNIQUE (id, system_id),
    -- only one of each detail type per option value
    UNIQUE (system_option_value_id, detail_type),
    -- must reference value within correct system
    FOREIGN KEY (
        system_id,
        system_option_value_id
    )
    REFERENCES system_option_values (
        system_id,
        id
    )
);

-- DETAIL OPTIONS

CREATE TABLE
gc_protected.detail_options (
    id SERIAL PRIMARY KEY,
    system_detail_type_id INTEGER REFERENCES system_detail_types,
    system_id INTEGER REFERENCES systems,
    name OPTION_NAME REFERENCES valid_options,
    -- for foreign keys
    UNIQUE (id, system_id, name),
    -- only one of each option within each detail
    UNIQUE (system_detail_type_id, name),
    -- must reference detail type in correct system
    FOREIGN KEY (
        system_id,
        system_detail_type_id
    )
    REFERENCES system_detail_types (
        system_id,
        id
    )
);

CREATE TABLE
gc_protected.detail_option_values (
    id SERIAL PRIMARY KEY,
    system_id INTEGER REFERENCES systems,
    detail_option_id INTEGER REFERENCES detail_options,
    option_name OPTION_NAME,
    name OPTION_VALUE_NAME,
    -- MAYBE FUTURE
    -- raised_option_names OPTION_NAME[],
    -- raised_configuration_types CONFIGURATION_TYPE[],
    --
    -- for foreign keys
    UNIQUE (system_id, id),
    -- must reference option in correct system
    FOREIGN KEY (
        system_id,
        detail_option_id,
        option_name
    )
    REFERENCES detail_options (
        system_id,
        id,
        name
    ),
    -- must reference valid option value for option name
    FOREIGN KEY (option_name, name)
    REFERENCES valid_option_values (option_name, name)
);

-- recursion
ALTER TABLE gc_protected.detail_options ADD COLUMN parent_detail_option_value_id INTEGER REFERENCES detail_option_values;


-- CONFIGURATION TYPES

CREATE TABLE
gc_protected.system_configuration_types (
    id SERIAL PRIMARY KEY,
    system_id INTEGER REFERENCES systems,
    detail_option_value_id INTEGER REFERENCES detail_option_values,
    configuration_type CONFIGURATION_TYPE REFERENCES configuration_types,
    optional BOOLEAN DEFAULT FALSE,
    -- for foreign keys
    UNIQUE (id, system_id),
    -- only one of each detail type per option value
    UNIQUE (detail_option_value_id, configuration_type),
    -- must reference value within correct system
    FOREIGN KEY (
        system_id,
        detail_option_value_id
    )
    REFERENCES detail_option_values (
        system_id,
        id
    )
);

-- CONFIGURATION OPTIONS

CREATE TABLE
gc_protected.configuration_options (
    id SERIAL PRIMARY KEY,
    system_configuration_type_id INTEGER REFERENCES system_configuration_types,
    system_id INTEGER REFERENCES systems,
    name OPTION_NAME REFERENCES valid_options,
    -- for foreign keys
    UNIQUE (id, system_id, name),
    -- only one of each option within each configuration
    UNIQUE (system_configuration_type_id, name),
    -- must reference configuration type in correct system
    FOREIGN KEY (
        system_id,
        system_configuration_type_id
    )
    REFERENCES system_configuration_types (
        system_id,
        id
    )
);

CREATE TABLE
gc_protected.configuration_option_values (
    id SERIAL PRIMARY KEY,
    system_id INTEGER REFERENCES systems,
    configuration_option_id INTEGER REFERENCES configuration_options,
    option_name OPTION_NAME,
    name OPTION_VALUE_NAME,
    -- MAYBE FUTURE
    -- raised_option_names OPTION_NAME[],
    -- raised_configuration_types CONFIGURATION_TYPE[],
    --
    -- for foreign keys
    UNIQUE (system_id, id),
    -- must reference option in correct system
    FOREIGN KEY (
        system_id,
        configuration_option_id,
        option_name
    )
    REFERENCES configuration_options (
        system_id,
        id,
        name
    ),
    -- must reference valid option value for option name
    FOREIGN KEY (option_name, name)
    REFERENCES valid_option_values (option_name, name)
);

ALTER TABLE gc_protected.configuration_options ADD COLUMN parent_configuration_option_id INTEGER REFERENCES configuration_option_values;

-- CONFIGURATIONS

CREATE TABLE
gc_protected.configurations (
    id SERIAL PRIMARY KEY,
    system_id INTEGER REFERENCES SYSTEMS,
    configuration_option_value_id INTEGER REFERENCES configuration_option_values,
    configuration_type CONFIGURATION_TYPE REFERENCES configuration_types,
    -- only one of each configuration type per option value
    UNIQUE (configuration_option_value_id, configuration_type),
    -- must reference value within correct system
    FOREIGN KEY (
        system_id,
        configuration_option_value_id
    )
    REFERENCES configuration_option_values (
        system_id,
        id
    )
);
