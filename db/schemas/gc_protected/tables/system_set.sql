
CREATE TABLE
gc_protected.system_sets (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects NOT NULL,
    system_id INTEGER REFERENCES systems NOT NULL,
    -- must check this with constraint to require it when there are system option values in the system
    system_option_value_path LTREE REFERENCES system_option_values INITIALLY DEFERRED,
    name VARCHAR(50),
    UNIQUE (id, system_option_value_path),
    UNIQUE (id, system_id),
    UNIQUE (id, system_id, system_option_value_path),
    CHECK (
        system_id = subltree(system_option_value_path, 0, 1)::TEXT::INTEGER
    )
);

COMMENT ON TABLE gc_protected.system_sets IS '
    CREATE/UPDATE:
        exposed function = gc_public.(
            update_system_set
            check_system_set: 
        )
        hidden functions = gc_protected.(
            create_or_update_system_set
            create_or_update_or_delete_system_set_option_group_value
            create_or_update_or_delete_system_set_option_value
        )
';

CREATE TABLE
gc_protected.system_set_option_group_values (
    system_set_id INTEGER REFERENCES system_sets NOT NULL,
    system_id INTEGER REFERENCES systems NOT NULL,
    option_name OPTION_NAME NOT NULL,
    name OPTION_VALUE_NAME NOT NULL,
    PRIMARY KEY (system_set_id, option_name),
    FOREIGN KEY (
        system_set_id,
        system_id
    )
    REFERENCES system_sets (
        id,
        system_id
    )
    ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED,
    FOREIGN KEY (
        system_id,
        option_name
    )
    REFERENCES option_groups (
        system_id,
        name
    ),
    FOREIGN KEY (
        option_name,
        name
    )
    REFERENCES valid_option_values (
        option_name,
        name
    )
);

CREATE TABLE
gc_protected.system_set_detail_option_values (
    system_set_id INTEGER REFERENCES system_sets NOT NULL,
    -- must use trigger to constrain that 
    -- parent
    system_option_value_path LTREE REFERENCES system_option_values INITIALLY DEFERRED,
    -- self
    -- 
    detail_option_value_path LTREE REFERENCES detail_configurations(parent_detail_option_value_path) INITIALLY DEFERRED,
    system_detail_path LTREE REFERENCES detail_configurations(parent_detail_option_value_path) INITIALLY DEFERRED,
    PRIMARY KEY (system_set_id, detail_option_value_path),
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
        system_option_value_path @> COALESCE(
            detail_option_value_path,
            system_detail_path
        )
        AND either_or(
            detail_option_value_path IS NULL,
            system_detail_path IS NULL
        )
    ),
    -- only one dov per detail type per system set
    EXCLUDE USING gist (
        system_set_id WITH =,
        get_detail_type_from_path(detail_option_value_path) WITH =
    )
);

CREATE TABLE
gc_protected.system_set_configuration_option_values (
    system_set_id INTEGER REFERENCES system_sets NOT NULL,
    detail_option_value_path LTREE REFERENCES detail_option_values INITIALLY DEFERRED NOT NULL,
    configuration_option_value_path LTREE REFERENCES configuration_option_values INITIALLY DEFERRED NOT NULL,
    PRIMARY KEY (system_set_id, configuration_option_value_path),
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
