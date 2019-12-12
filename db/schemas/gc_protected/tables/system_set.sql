
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
    CONSTRAINT ss_maybe_sov CHECK (
        system_option_value_path IS NULL
        OR
        system_id = subltree(system_option_value_path, 0, 1)::TEXT::INTEGER
    -- ANTI PATTERN vvv
    -- ),
    -- CONSTRAINT ss_terminal_sov CHECK (
    --     (
    --         CASE WHEN system_option_value_path IS NULL THEN
    --             get_system_child_type(system_id::TEXT::LTREE)
    --         ELSE
    --             get_system_option_value_child_type(system_option_value_path)
    --         END
    --     ) = 'system_detail'
    )
);

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
gc_protected.system_set_details (
    system_set_id INTEGER REFERENCES system_sets NOT NULL,
    -- parent
    parent_system_option_value_path LTREE REFERENCES system_option_values,
    -- self
    detail_type DETAIL_TYPE NOT NULL,
    system_detail_path LTREE REFERENCES system_details,
    detail_option_value_path LTREE REFERENCES detail_option_values,
    -- keys/constraints
    PRIMARY KEY (system_set_id, detail_type),
    UNIQUE (system_set_id, detail_type),
    UNIQUE (system_set_id, detail_type, system_detail_path, detail_option_value_path),
    FOREIGN KEY (
        system_set_id,
        parent_system_option_value_path
    )
    REFERENCES system_sets (
        id,
        system_option_value_path
    )
    ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED,
    CONSTRAINT ssd_either_sd_or_dov CHECK (
        either_or(
            detail_option_value_path IS NULL,
            system_detail_path IS NULL
        )
    ),
    CONSTRAINT ssd_parent_matches CHECK (
        parent_system_option_value_path IS NULL
        OR
        parent_system_option_value_path @> COALESCE(
            detail_option_value_path,
            system_detail_path
        )
    ),
    CONSTRAINT ssd_correct_dt CHECK (
        detail_type = get_detail_type_from_path(
            COALESCE(
                detail_option_value_path,
                system_detail_path
            )
        )
    -- ANTI PATTERN
    -- ),
    -- CONSTRAINT ssd_terminal_sd_or_dov CHECK (
    --     (
    --         CASE WHEN detail_option_value_path IS NULL THEN
    --             get_system_detail_child_type(system_detail_path)
    --         ELSE
    --             get_detail_option_value_child_type(detail_option_value_path)
    --         END
    --     ) = 'detail_configuration'
    -- -- ),
    -- -- CONSTRAINT ssd_option_group_values CHECK (
        
    )
);

CREATE TABLE
gc_protected.system_set_configurations (
    system_set_id INTEGER REFERENCES system_sets NOT NULL,
    -- parent
    detail_type DETAIL_TYPE NOT NULL,
    parent_system_detail_path LTREE REFERENCES system_details,
    parent_detail_option_value_path LTREE REFERENCES detail_option_values,
    -- self
    configuration_type CONFIGURATION_TYPE NOT NULL,
    detail_configuration_path LTREE REFERENCES detail_configurations,
    configuration_option_value_path LTREE REFERENCES configuration_option_values,
    -- keys/constraints
    PRIMARY KEY (system_set_id, detail_type, configuration_type),
    FOREIGN KEY (
        system_set_id,
        detail_type
    )
    REFERENCES system_set_details (
        system_set_id,
        detail_type
    )
    ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED,
    FOREIGN KEY (
        system_set_id,
        detail_type,
        parent_system_detail_path,
        parent_detail_option_value_path
    )
    REFERENCES system_set_details (
        system_set_id,
        detail_type,
        system_detail_path,
        detail_option_value_path
    )
    ON UPDATE CASCADE ON DELETE CASCADE INITIALLY DEFERRED,
    CONSTRAINT ssc_parent_sd_or_dov CHECK (
        either_or(
            parent_system_detail_path IS NULL,
            parent_detail_option_value_path IS NULL
        )
    ),
    CONSTRAINT ssc_either_dc_or_cov CHECK (
        either_or(
            detail_configuration_path IS NULL,
            configuration_option_value_path IS NULL
        )
    ),
    CONSTRAINT ssc_parent_matches CHECK (
        COALESCE(
            parent_system_detail_path,
            parent_detail_option_value_path
        ) @> COALESCE(
            detail_configuration_path,
            configuration_option_value_path
        )
    ),
    CONSTRAINT ssc_correct_dt CHECK (
        detail_type = get_detail_type_from_path(
            COALESCE(
                detail_configuration_path,
                configuration_option_value_path
            )
        )
    ),
    CONSTRAINT ssc_correct_ct CHECK (
        configuration_type = get_configuration_type_from_path(
            COALESCE(
                detail_configuration_path,
                configuration_option_value_path
            )
        )
    -- ANTI PATTERN
    -- ),
    -- CONSTRAINT ssc_terminal_dc_or_cov CHECK (
    --     (
    --         CASE WHEN configuration_option_value_path IS NULL THEN
    --             get_detail_configuration_child_type(detail_configuration_path)
    --         ELSE
    --             get_configuration_option_value_child_type(configuration_option_value_path)
    --         END
    --     ) = 'configuration_part'
    )
);
