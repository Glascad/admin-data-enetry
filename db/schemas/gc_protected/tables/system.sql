
CREATE TABLE
gc_protected.systems (
    manufacturer_id INTEGER REFERENCES manufacturers NOT NULL,
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    system_type SYSTEM_TYPE REFERENCES system_types NOT NULL
);


-- SYSTEM OPTIONS

CREATE TABLE
gc_protected.system_options (
    system_id INTEGER REFERENCES systems, -- beginning of path
    parent_system_option_value_path LTREE, -- references system_option_values
    path LTREE PRIMARY KEY,
    name OPTION_NAME REFERENCES valid_options NOT NULL,
    UNIQUE (path, name),
    CHECK (
        either_or(
            parent_system_option_value_path IS NULL,
            system_id IS NULL
        )
    ),
    CHECK (
        path = COALESCE(
            parent_system_option_value_path,
            system_id::TEXT::LTREE
        ) || name::TEXT
    )
);

CREATE TABLE
gc_protected.system_option_values (
    parent_system_option_path LTREE REFERENCES system_options ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED NOT NULL,
    path LTREE PRIMARY KEY,
    option_name OPTION_NAME NOT NULL,
    name OPTION_VALUE_NAME NOT NULL,
    child_type CHILD_TYPE DEFAULT 'DETAIL' NOT NULL,
    FOREIGN KEY (
        parent_system_option_path,
        option_name
    )
    REFERENCES system_options (
        path,
        name
    )
    ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED,
    FOREIGN KEY (
        option_name, 
        name
    )
    REFERENCES valid_option_values (
        option_name,
        name
    ),
    CHECK (
        path = parent_system_option_path || name::TEXT
    )
);

ALTER TABLE system_options
ADD FOREIGN KEY (parent_system_option_value_path)
REFERENCES system_option_values
ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED;


-- DETAIL TYPES

CREATE TABLE
gc_protected.system_details (
    parent_system_option_value_path LTREE REFERENCES system_option_values ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED NOT NULL,
    path LTREE PRIMARY KEY,
    detail_type DETAIL_TYPE NOT NULL,
    CHECK (
        path = parent_system_option_value_path || detail_type::TEXT
    )
);

-- DETAIL OPTIONS

CREATE TABLE
gc_protected.detail_options (
    parent_system_detail_path LTREE REFERENCES system_details ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED,
    parent_detail_option_value_path LTREE,
    path LTREE PRIMARY KEY,
    name OPTION_NAME REFERENCES valid_options NOT NULL,
    UNIQUE (path, name),
    CHECK (
        either_or(
            parent_system_detail_path IS NULL,
            parent_detail_option_value_path IS NULL
        )
    ),
    CHECK (
        path = COALESCE(
            parent_system_detail_path,
            parent_detail_option_value_path
        ) || name::TEXT
    )
);

CREATE TABLE
gc_protected.detail_option_values (
    parent_detail_option_path LTREE REFERENCES detail_options ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED NOT NULL,
    path LTREE PRIMARY KEY,
    option_name OPTION_NAME NOT NULL,
    name OPTION_VALUE_NAME NOT NULL,
    child_type CHILD_TYPE DEFAULT 'CONFIGURATION' NOT NULL,
    FOREIGN KEY (
        parent_detail_option_path,
        option_name
    )
    REFERENCES detail_options (
        path,
        name
    )
    ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED,
    FOREIGN KEY (
        option_name, 
        name
    )
    REFERENCES valid_option_values (
        option_name,
        name
    ),
    CHECK (
        path = parent_detail_option_path || name::TEXT
    )
);

ALTER TABLE detail_options
ADD FOREIGN KEY (parent_detail_option_value_path)
REFERENCES detail_option_values
ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED;

-- CONFIGURATION TYPES

CREATE TABLE
gc_protected.system_configurations (
    parent_detail_option_value_path LTREE REFERENCES detail_option_values ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED NOT NULL,
    path LTREE PRIMARY KEY,
    configuration_type CONFIGURATION_TYPE NOT NULL,
    optional BOOLEAN DEFAULT FALSE NOT NULL,
    transform MATRIX NOT NULL,
    CHECK (
        path = parent_detail_option_value_path || configuration_type::TEXT
    )
);

-- CONFIGURATION OPTIONS

CREATE TABLE
gc_protected.configuration_options (
    parent_system_configuration_path LTREE REFERENCES system_configurations ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED,
    parent_configuration_option_value_path LTREE,
    path LTREE PRIMARY KEY,
    name OPTION_NAME REFERENCES valid_options NOT NULL,
    UNIQUE (path, name),
    CHECK (
        either_or(
            parent_system_configuration_path IS NULL,
            parent_configuration_option_value_path IS NULL
        )
    ),
    CHECK (
        path = COALESCE(
            parent_system_configuration_path,
            parent_configuration_option_value_path
        ) || name::TEXT
    )
);

CREATE TABLE
gc_protected.configuration_option_values (
    parent_configuration_option_path LTREE REFERENCES configuration_options ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED NOT NULL,
    path LTREE PRIMARY KEY,
    option_name OPTION_NAME NOT NULL,
    name OPTION_VALUE_NAME NOT NULL,
    child_type CHILD_TYPE DEFAULT 'PART' NOT NULL,
    FOREIGN KEY (
        parent_configuration_option_path,
        option_name
    )
    REFERENCES configuration_options (
        path,
        name
    )
    ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED,
    FOREIGN KEY (
        option_name, 
        name
    )
    REFERENCES valid_option_values (
        option_name,
        name
    ),
    CHECK (
        path = parent_configuration_option_path || name::TEXT
    )
);

ALTER TABLE configuration_options
ADD FOREIGN KEY (parent_configuration_option_value_path)
REFERENCES configuration_option_values
ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED;

-- PARTS

CREATE TABLE
gc_protected.configuration_parts (
    parent_configuration_option_value_path LTREE REFERENCES configuration_option_values ON UPDATE CASCADE NOT NULL,
    transform MATRIX NOT NULL,
    part_id INTEGER REFERENCES parts,
    part_orientation ORIENTATION,
    extra_part_path_id INTEGER REFERENCES extra_part_paths,
    extra_part_path_orientation ORIENTATION,
    FOREIGN KEY (
        part_id,
        part_orientation
    )
    REFERENCES parts (
        id,
        orientation
    ),
    FOREIGN KEY (
        extra_part_path_id,
        extra_part_path_orientation
    )
    REFERENCES extra_part_paths (
        id,
        orientation
    )
);
