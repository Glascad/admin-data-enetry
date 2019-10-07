
CREATE TABLE
gc_protected.system_sets (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects NOT NULL,
    system_id INTEGER REFERENCES systems NOT NULL,
    system_option_value_path LTREE REFERENCES system_option_values INITIALLY DEFERRED NOT NULL,
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
    system_set_id INTEGER REFERENCES system_sets NOT NULL,
    system_set_system_option_value_path LTREE REFERENCES system_option_values NOT NULL,
    option_group_system_option_value_path LTREE NOT NULL,
    option_name OPTION_NAME NOT NULL,
    name OPTION_VALUE_NAME NOT NULL,
    FOREIGN KEY (
        system_set_id,
        system_set_system_option_value_path
    )
    REFERENCES system_sets (
        id,
        system_option_value_path
    )
    ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED,
    FOREIGN KEY (
        option_group_system_option_value_path,
        option_name
    )
    REFERENCES option_groups (
        system_option_value_path,
        name
    ),
    FOREIGN KEY (
        option_name,
        name
    )
    REFERENCES valid_option_values (
        option_name,
        name
    ),
    CHECK (
        system_set_system_option_value_path @> option_group_system_option_value_path
        OR
        option_group_system_option_value_path @> system_set_system_option_value_path
    )
);

CREATE TABLE
gc_protected.system_set_detail_option_values (
    id SERIAL PRIMARY KEY,
    system_set_id INTEGER REFERENCES system_sets NOT NULL,
    system_option_value_path LTREE REFERENCES system_option_values INITIALLY DEFERRED NOT NULL,
    detail_option_value_path LTREE REFERENCES detail_option_values INITIALLY DEFERRED NOT NULL,
    UNIQUE (system_set_id, detail_option_value_path),
    UNIQUE (id, detail_option_value_path),
    FOREIGN KEY (
        system_set_id,
        system_option_value_path
    )
    REFERENCES system_sets (
        id,
        system_option_value_path
    )
    ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED,
    CHECK (
        system_option_value_path @> detail_option_value_path
    ),
    -- only one dov per detail type per system set
    EXCLUDE USING gist (
        system_set_id WITH =,
        get_detail_type_from_path(detail_option_value_path) WITH =
    )
);

CREATE TABLE
gc_protected.system_set_configuration_option_values (
    id SERIAL PRIMARY KEY,
    system_set_id INTEGER REFERENCES system_sets NOT NULL,
    detail_option_value_path LTREE REFERENCES detail_option_values INITIALLY DEFERRED NOT NULL,
    configuration_option_value_path LTREE REFERENCES configuration_option_values INITIALLY DEFERRED NOT NULL,
    FOREIGN KEY (
        system_set_id,
        detail_option_value_path
    )
    REFERENCES system_set_detail_option_values (
        system_set_id,
        detail_option_value_path
    )
    ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED,
    CHECK (
        detail_option_value_path @> configuration_option_value_path
    ),
    -- only one cov per configuration type per detail type per system set
    EXCLUDE USING gist (
        system_set_id WITH =,
        get_detail_type_from_path(detail_option_value_path) WITH =,
        get_configuration_type_from_path(configuration_option_value_path) WITH =
    )
);
