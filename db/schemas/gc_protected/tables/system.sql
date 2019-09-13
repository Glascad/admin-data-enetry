
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
    system_id INTEGER REFERENCES systems ON DELETE CASCADE INITIALLY DEFERRED NOT NULL,
    name OPTION_NAME REFERENCES valid_options NOT NULL,
    -- for foreign keys
    UNIQUE (id, system_id, name)
);

CREATE TABLE
gc_protected.system_option_values (
    id SERIAL PRIMARY KEY,
    system_id INTEGER REFERENCES systems ON DELETE CASCADE INITIALLY DEFERRED NOT NULL,
    parent_system_option_id INTEGER REFERENCES system_options ON DELETE CASCADE INITIALLY DEFERRED NOT NULL,
    option_name OPTION_NAME NOT NULL,
    name OPTION_VALUE_NAME NOT NULL,
    -- flag indicating whether the children are options (TRUE) or details (FALSE)
    is_recursive BOOLEAN DEFAULT FALSE NOT NULL,
    raised_option_names OPTION_NAME[],
    raised_configuration_types CONFIGURATION_TYPE[],
    -- only one of each value per option
    UNIQUE (parent_system_option_id, name),
    -- for foreign keys
    UNIQUE (id, system_id),
    UNIQUE (id, parent_system_option_id),
    UNIQUE (id, is_recursive),
    -- must reference option within correct system
    FOREIGN KEY (
        system_id,
        parent_system_option_id,
        option_name
    )
    REFERENCES system_options (
        system_id,
        id,
        name
    )
    ON DELETE CASCADE INITIALLY DEFERRED,
    -- must reference valid option value for option name
    FOREIGN KEY (option_name, name)
    REFERENCES valid_option_values (option_name, name)
    ON DELETE CASCADE INITIALLY DEFERRED
);

-- DETAIL TYPES

CREATE TABLE
gc_protected.system_details (
    id SERIAL PRIMARY KEY,
    system_id INTEGER REFERENCES systems ON DELETE CASCADE INITIALLY DEFERRED NOT NULL,
    parent_system_option_value_id INTEGER REFERENCES system_option_values ON DELETE CASCADE INITIALLY DEFERRED NOT NULL,
    detail_type DETAIL_TYPE REFERENCES detail_types NOT NULL,
    is_recursive BOOLEAN DEFAULT FALSE NOT NULL,
    -- only one of each detail type per option value
    UNIQUE (parent_system_option_value_id, detail_type),
    -- for foreign keys
    UNIQUE (id, system_id),
    -- must reference value within correct system
    FOREIGN KEY (
        system_id,
        parent_system_option_value_id
    )
    REFERENCES system_option_values (
        system_id,
        id
    )
    ON DELETE CASCADE INITIALLY DEFERRED
);

-- DETAIL OPTIONS

CREATE TABLE
gc_protected.detail_options (
    id SERIAL PRIMARY KEY,
    -- UNIQUE because only one parent option is allowed under each detail type
    parent_system_detail_id INTEGER REFERENCES system_details ON DELETE CASCADE INITIALLY DEFERRED,
    system_id INTEGER REFERENCES systems ON DELETE CASCADE INITIALLY DEFERRED NOT NULL,
    name OPTION_NAME REFERENCES valid_options NOT NULL,
    -- only one of each option within each detail
    UNIQUE (parent_system_detail_id, name),
    -- for foreign keys
    UNIQUE (id, system_id, name),
    -- must reference detail type in correct system
    FOREIGN KEY (
        system_id,
        parent_system_detail_id
    )
    REFERENCES system_details (
        system_id,
        id
    )
    ON DELETE CASCADE INITIALLY DEFERRED
);

CREATE TABLE
gc_protected.detail_option_values (
    id SERIAL PRIMARY KEY,
    system_id INTEGER REFERENCES systems ON DELETE CASCADE INITIALLY DEFERRED NOT NULL,
    -- parent_system_detail_id INTEGER REFERENCES system_details ON DELETE CASCADE INITIALLY DEFERRED NOT NULL,
    parent_detail_option_id INTEGER REFERENCES detail_options ON DELETE CASCADE INITIALLY DEFERRED NOT NULL,
    option_name OPTION_NAME,
    name OPTION_VALUE_NAME,
    is_recursive BOOLEAN DEFAULT FALSE NOT NULL,
    -- only one of each value per option
    UNIQUE (parent_detail_option_id, name),
    -- for foreign keys
    UNIQUE (id, parent_detail_option_id),
    -- MAYBE FUTURE
    -- raised_option_names OPTION_NAME[],
    -- raised_configuration_types CONFIGURATION_TYPE[],
    --
    -- for foreign keys
    UNIQUE (system_id, id),
    UNIQUE (id, is_recursive),
    -- must reference option in correct system
    FOREIGN KEY (
        system_id,
        parent_detail_option_id,
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

-- CONFIGURATION TYPES

CREATE TABLE
gc_protected.system_configuration_types (
    id SERIAL PRIMARY KEY,
    system_id INTEGER REFERENCES systems ON DELETE CASCADE INITIALLY DEFERRED NOT NULL,
    parent_detail_option_value_id INTEGER REFERENCES detail_option_values ON DELETE CASCADE INITIALLY DEFERRED NOT NULL,
    configuration_type CONFIGURATION_TYPE REFERENCES configuration_types NOT NULL,
    is_recursive BOOLEAN DEFAULT FALSE NOT NULL,
    optional BOOLEAN DEFAULT FALSE NOT NULL,
    transform MATRIX,
    -- only one of each configuration type per option value
    UNIQUE (parent_detail_option_value_id, configuration_type),
    -- for foreign keys
    UNIQUE (id, system_id),
    -- must reference value within correct system
    FOREIGN KEY (
        system_id,
        parent_detail_option_value_id
    )
    REFERENCES detail_option_values (
        system_id,
        id
    )
    ON DELETE CASCADE INITIALLY DEFERRED
);

-- CONFIGURATION OPTIONS

CREATE TABLE
gc_protected.configuration_options (
    id SERIAL PRIMARY KEY,
    system_id INTEGER REFERENCES systems ON DELETE CASCADE INITIALLY DEFERRED NOT NULL,
    -- UNIQUE because only one parent option is allowed beneath each configuration type
    parent_system_configuration_type_id INTEGER REFERENCES system_configuration_types ON DELETE CASCADE INITIALLY DEFERRED UNIQUE NOT NULL,
    name OPTION_NAME REFERENCES valid_options NOT NULL,
    -- only one of each option within each configuration
    UNIQUE (parent_system_configuration_type_id, name),
    -- for foreign keys
    UNIQUE (id, system_id, name),
    -- must reference configuration type in correct system
    FOREIGN KEY (
        system_id,
        parent_system_configuration_type_id
    )
    REFERENCES system_configuration_types (
        system_id,
        id
    )
    ON DELETE CASCADE INITIALLY DEFERRED
);

CREATE TABLE
gc_protected.configuration_option_values (
    id SERIAL PRIMARY KEY,
    system_id INTEGER REFERENCES systems ON DELETE CASCADE INITIALLY DEFERRED NOT NULL,
    parent_configuration_option_id INTEGER REFERENCES configuration_options ON DELETE CASCADE INITIALLY DEFERRED NOT NULL,
    option_name OPTION_NAME,
    name OPTION_VALUE_NAME,
    is_recursive BOOLEAN DEFAULT FALSE NOT NULL,
    -- only one of each value per option
    UNIQUE (parent_configuration_option_id, name),
    -- for foreign keys
    UNIQUE (id, is_recursive),
    UNIQUE (id, parent_configuration_option_id),
    -- MAYBE FUTURE
    -- raised_option_names OPTION_NAME[],
    -- raised_configuration_types CONFIGURATION_TYPE[],
    --
    -- for foreign keys
    UNIQUE (system_id, id),
    -- must reference option in correct system
    FOREIGN KEY (
        system_id,
        parent_configuration_option_id,
        option_name
    )
    REFERENCES configuration_options (
        system_id,
        id,
        name
    )
    ON DELETE CASCADE INITIALLY DEFERRED,
    -- must reference valid option value for option name
    FOREIGN KEY (option_name, name)
    REFERENCES valid_option_values (option_name, name)
    ON DELETE CASCADE INITIALLY DEFERRED
);


CREATE TABLE
gc_protected.configuration_parts (
    id SERIAL PRIMARY KEY,
    configuration_option_value_id INTEGER REFERENCES configuration_option_values,
    is_recursive BOOLEAN DEFAULT FALSE NOT NULL,
    transform MATRIX NOT NULL,
    part_id INTEGER REFERENCES parts,
    part_orientation ORIENTATION,
    extra_part_path_id INTEGER REFERENCES extra_part_paths,
    extra_part_path_orientation ORIENTATION,
    FOREIGN KEY (part_id, part_orientation)
    REFERENCES parts (id, orientation),
    FOREIGN KEY (extra_part_path_id, extra_part_path_orientation)
    REFERENCES extra_part_paths (id, orientation),
    -- no identically placed itentical parts in the same configuration
    UNIQUE (configuration_option_value_id, part_id, part_orientation, transform),
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
