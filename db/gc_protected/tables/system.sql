
CREATE TABLE
gc_protected.systems (
    manufacturer_id INTEGER REFERENCES manufacturers NOT NULL,
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    system_type SYSTEM_TYPE REFERENCES system_types NOT NULL,
    UNIQUE (id, manufacturer_id)
);


-- SYSTEM OPTIONS

CREATE TABLE
gc_protected.system_options (
    system_id INTEGER REFERENCES systems NOT NULL,
    -- references system_option_values
    parent_system_option_value_path LTREE,
    path LTREE PRIMARY KEY,
    name OPTION_NAME REFERENCES valid_options NOT NULL,
    default_system_option_value OPTION_VALUE_NAME NOT NULL,
    UNIQUE (path, name),
    CHECK (
        -- must belong to correct system
        (system_id || '.*')::LQUERY ~ path
        AND
        -- must not have duplicate options in the same path
        NOT (('*.' || name || '.*')::LQUERY ~ parent_system_option_value_path)
        AND
        -- must be unique (system_id, parent_system_option_value_path)
        -- with only one null parent_system_option_value_path
        path = COALESCE(
            parent_system_option_value_path,
            system_id::TEXT::LTREE
        ) || name::TEXT
    ),
    EXCLUDE USING gist (
        system_id WITH =,
        COALESCE(parent_system_option_value_path::TEXT, '') WITH =
    )
);


-- SYSTEM OPTION VALUES

CREATE TABLE
gc_protected.system_option_values (
    system_id INTEGER REFERENCES systems NOT NULL,
    parent_system_option_path LTREE REFERENCES system_options ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED NOT NULL,
    path LTREE PRIMARY KEY,
    option_name OPTION_NAME NOT NULL,
    name OPTION_VALUE_NAME NOT NULL,
    UNIQUE (parent_system_option_path, name),
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
        -- must belong to correct system
        (system_id || '.*')::LQUERY ~ path
        AND
        -- must have correct path
        path = parent_system_option_path || name::TEXT
    )
);

ALTER TABLE system_options
-- default
ADD CONSTRAINT default_system_option_value FOREIGN KEY (
    path,
    default_system_option_value
) 
REFERENCES system_option_values (
    parent_system_option_path,
    name
)
INITIALLY DEFERRED,
-- parent
ADD CONSTRAINT parent_system_option_value_path FOREIGN KEY (parent_system_option_value_path)
REFERENCES system_option_values
ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED;


-- OPTION GROUPS

CREATE TABLE
gc_protected.option_groups (
    system_id INTEGER REFERENCES systems NOT NULL,
    name OPTION_NAME REFERENCES valid_options NOT NULL,
    PRIMARY KEY (system_id, name)
);


-- DETAIL TYPES

CREATE TABLE
gc_protected.system_details (
    system_id INTEGER REFERENCES systems NOT NULL,
    parent_system_option_value_path LTREE REFERENCES system_option_values ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED,
    path LTREE PRIMARY KEY,
    detail_type DETAIL_TYPE NOT NULL,
    CHECK (
        -- must belong to correct system
        (system_id || '.*')::LQUERY ~ path
        AND
        -- must have correct path
        path = COALESCE(parent_system_option_value_path, system_id::TEXT::LTREE) || '__DT__' || detail_type::TEXT
    )
);


-- DETAIL OPTIONS

CREATE TABLE
gc_protected.detail_options (
    system_id INTEGER REFERENCES systems NOT NULL,
    parent_system_detail_path LTREE REFERENCES system_details ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED,
    parent_detail_option_value_path LTREE,
    path LTREE PRIMARY KEY,
    name OPTION_NAME REFERENCES valid_options NOT NULL,
    default_detail_option_value OPTION_VALUE_NAME NOT NULL,
    UNIQUE (path, name),
    CHECK (
        -- must belong to correct system
        (system_id || '.*')::LQUERY ~ path
        AND
        -- must have exactly one parent
        either_or(
            parent_system_detail_path IS NULL,
            parent_detail_option_value_path IS NULL
        )
        AND
        -- must not have duplicate options in the same path
        NOT (('*.' || name || '.*')::LQUERY ~ COALESCE(
            parent_system_detail_path,
            parent_detail_option_value_path
        ))
        AND
        -- must have correct path
        path = COALESCE(
            parent_system_detail_path,
            parent_detail_option_value_path
        ) || name::TEXT
    )
);


-- DETAIL OPTION VALUES

CREATE TABLE
gc_protected.detail_option_values (
    system_id INTEGER REFERENCES systems NOT NULL,
    parent_detail_option_path LTREE REFERENCES detail_options ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED NOT NULL,
    path LTREE PRIMARY KEY,
    option_name OPTION_NAME NOT NULL,
    name OPTION_VALUE_NAME NOT NULL,
    UNIQUE (parent_detail_option_path, name),
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
        -- must have correct system
        (system_id || '.*')::LQUERY ~ path
        AND
        -- must have correct path
        path = parent_detail_option_path || name::TEXT
    )
);

ALTER TABLE detail_options
-- default
ADD CONSTRAINT default_detail_option_value FOREIGN KEY (
    path,
    default_detail_option_value
)
REFERENCES detail_option_values (
    parent_detail_option_path,
    name
)
INITIALLY DEFERRED,
-- parent
ADD CONSTRAINT parent_detail_option_value_path FOREIGN KEY (parent_detail_option_value_path) REFERENCES detail_option_values
ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED;


-- CONFIGURATION TYPES

CREATE TABLE
gc_protected.detail_configurations (
    system_id INTEGER REFERENCES systems NOT NULL,
    parent_detail_option_value_path LTREE REFERENCES detail_option_values ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED,
    parent_system_detail_path LTREE REFERENCES system_details ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED,
    path LTREE PRIMARY KEY,
    configuration_type CONFIGURATION_TYPE NOT NULL,
    optional BOOLEAN DEFAULT FALSE NOT NULL,
    transform MATRIX,
    CHECK (
        -- must belong to correct system
        (system_id || '.*')::LQUERY ~ path
        AND
        -- must have exactly one parent
        either_or(
            parent_detail_option_value_path IS NULL,
            parent_system_detail_path IS NULL
        )
        AND
        -- must have correct path
        path = COALESCE(parent_detail_option_value_path, parent_system_detail_path) || '__CT__' || configuration_type::TEXT
    )
);


-- CONFIGURATION OPTIONS

CREATE TABLE
gc_protected.configuration_options (
    system_id INTEGER REFERENCES systems NOT NULL,
    parent_detail_configuration_path LTREE REFERENCES detail_configurations ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED,
    parent_configuration_option_value_path LTREE,
    path LTREE PRIMARY KEY,
    name OPTION_NAME REFERENCES valid_options NOT NULL,
    default_configuration_option_value OPTION_VALUE_NAME NOT NULL,
    UNIQUE (path, name),
    CHECK (
        TRUE
        AND
        -- must belong to correct system
        (system_id || '.*')::LQUERY ~ path
        AND
        -- must have exactly one parent
        either_or(
            parent_detail_configuration_path IS NULL,
            parent_configuration_option_value_path IS NULL
        )
        AND
        -- must not have duplicate options in the same path
        NOT (('*.' || name || '.*')::LQUERY ~ COALESCE(
            parent_detail_configuration_path,
            parent_configuration_option_value_path
        ))
        AND
        -- must have correct path
        path = COALESCE(
            parent_detail_configuration_path,
            parent_configuration_option_value_path
        ) || name::TEXT
    )
);


-- CONFIGURATION OPTION VALUES

CREATE TABLE
gc_protected.configuration_option_values (
    system_id INTEGER REFERENCES systems NOT NULL,
    parent_configuration_option_path LTREE REFERENCES configuration_options ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED NOT NULL,
    path LTREE PRIMARY KEY,
    option_name OPTION_NAME NOT NULL,
    name OPTION_VALUE_NAME NOT NULL,
    UNIQUE (parent_configuration_option_path, name),
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
        -- must belong to correct system
        (system_id || '.*')::LQUERY ~ path
        AND
        -- must have correct path
        path = parent_configuration_option_path || name::TEXT
    )
);

ALTER TABLE configuration_options
-- default
ADD CONSTRAINT default_configuration_option_value FOREIGN KEY (
    path,
    default_configuration_option_value
)
REFERENCES configuration_option_values (
    parent_configuration_option_path,
    name
)
INITIALLY DEFERRED,
-- parent
ADD CONSTRAINT parent_configuration_option_value_path FOREIGN KEY (parent_configuration_option_value_path) REFERENCES configuration_option_values
ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED;


-- PARTS

CREATE TABLE
gc_protected.configuration_parts (
    id SERIAL PRIMARY KEY,
    system_id INTEGER REFERENCES systems NOT NULL,
    parent_configuration_option_value_path LTREE REFERENCES configuration_option_values ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED,
    parent_detail_configuration_path LTREE REFERENCES detail_configurations ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED,
    transform MATRIX,
    part_id INTEGER REFERENCES parts NOT NULL,
    manufacturer_id INTEGER REFERENCES manufacturers NOT NULL,
    FOREIGN KEY (
        part_id,
        manufacturer_id
    )
    REFERENCES parts (
        id,
        manufacturer_id
    ),
    FOREIGN KEY (
        system_id,
        manufacturer_id
    )
    REFERENCES systems (
        id,
        manufacturer_id
    ),
    CHECK (
        either_or(
            parent_configuration_option_value_path IS NULL,
            parent_detail_configuration_path IS NULL
        )
        AND
        (system_id || '.*')::LQUERY ~ COALESCE(parent_configuration_option_value_path, parent_detail_configuration_path)
    )
);
