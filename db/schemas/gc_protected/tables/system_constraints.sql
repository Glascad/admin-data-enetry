
-- System Options
ALTER TABLE gc_protected.system_options
ADD COLUMN parent_system_option_value_id INTEGER REFERENCES system_option_values ON DELETE CASCADE INITIALLY DEFERRED,
ADD COLUMN is_recursive BOOLEAN DEFAULT TRUE,
ADD COLUMN default_system_option_value_id INTEGER REFERENCES system_option_values INITIALLY DEFERRED NOT NULL;

-- cannot have two rows with the same system_id and NULL parent_system_option_value_ids
ALTER TABLE gc_protected.system_options
ADD CONSTRAINT single_parent_system_option EXCLUDE USING gist (
    system_id WITH =,
    COALESCE(parent_system_option_value_id, 0) WITH =
),
-- options must reference an option_value that IS recursive
ADD CONSTRAINT recursive_parent_system_option_value FOREIGN KEY (
    is_recursive,
    parent_system_option_value_id
) REFERENCES system_option_values (
    is_recursive,
    id
) INITIALLY DEFERRED,
ADD CONSTRAINT recursive_system_option CHECK (
    (
        parent_system_option_value_id IS NULL
        AND
        is_recursive = FALSE
    ) OR (
        parent_system_option_value_id IS NOT NULL
        AND
        is_recursive = TRUE
    )
),
ADD CONSTRAINT default_system_option_value_child FOREIGN KEY (
    id,
    default_system_option_value_id
) REFERENCES system_option_values (
    parent_system_option_id,
    id
) INITIALLY DEFERRED;

ALTER TABLE gc_protected.system_details
ADD CONSTRAINT non_recursive_parent_system_option_value FOREIGN KEY (
    is_recursive,
    parent_system_option_value_id
) REFERENCES system_option_values (
    is_recursive,
    id
) INITIALLY DEFERRED,
ADD CONSTRAINT non_recursive_system_detail CHECK (is_recursive = FALSE);

-- Detail Options
ALTER TABLE gc_protected.detail_options
ADD COLUMN parent_detail_option_value_id INTEGER REFERENCES detail_option_values ON DELETE CASCADE INITIALLY DEFERRED,
ADD COLUMN is_recursive BOOLEAN DEFAULT TRUE,
ADD COLUMN default_detail_option_value_id INTEGER REFERENCES detail_option_values INITIALLY DEFERRED NOT NULL;


-- cannot have two columns with the same parent_system_detail_id and NULL parent_detail_option_value_ids
ALTER TABLE gc_protected.detail_options
ADD CONSTRAINT single_parent_detail_option EXCLUDE USING gist (
    -- if parent_system_detail_id is EQUAL
    parent_system_detail_id WITH =,
    -- then parent_detail_option_value_id must be unique
    COALESCE(parent_detail_option_value_id, 0) WITH =
),
-- options must reference an option_value that IS recursive
ADD CONSTRAINT recursive_parent_detail_option_value FOREIGN KEY (
    is_recursive,
    parent_detail_option_value_id
) REFERENCES detail_option_values (
    is_recursive,
    id
) INITIALLY DEFERRED,
ADD CONSTRAINT parent_or_child_detail_option CHECK (
    (
        parent_detail_option_value_id IS NOT NULL
        OR
        parent_system_detail_id IS NOT NULL
    ) AND (
        parent_detail_option_value_id IS NULL
        OR
        parent_system_detail_id IS NULL
    )
),
ADD CONSTRAINT recursive_detail_option CHECK (
    (
        parent_detail_option_value_id IS NULL
        AND
        is_recursive = FALSE
    ) OR (
        parent_detail_option_value_id IS NOT NULL
        AND
        is_recursive = TRUE
    )
),
ADD CONSTRAINT default_detail_option_value_child FOREIGN KEY (
    id,
    default_detail_option_value_id
) REFERENCES detail_option_values (
    parent_detail_option_id,
    id
) INITIALLY DEFERRED;

ALTER TABLE gc_protected.system_configurations
ADD CONSTRAINT non_recursive_parent_detail_option_value FOREIGN KEY (
    is_recursive,
    parent_detail_option_value_id
) REFERENCES detail_option_values (
    is_recursive,
    id
) INITIALLY DEFERRED,
ADD CONSTRAINT non_recursive_system_configuration CHECK (is_recursive = FALSE);

-- Configuration Options
ALTER TABLE gc_protected.configuration_options
ADD COLUMN parent_configuration_option_value_id INTEGER REFERENCES configuration_option_values ON DELETE CASCADE INITIALLY DEFERRED,
ADD COLUMN is_recursive BOOLEAN DEFAULT TRUE,
ADD COLUMN default_configuration_option_value_id INTEGER REFERENCES configuration_option_values INITIALLY DEFERRED NOT NULL;

-- cannot have two columns with the same parent_system_configuration_id and NULL parent_configuration_option_value_ids
ALTER TABLE gc_protected.configuration_options
ADD CONSTRAINT single_parent_configuration_option EXCLUDE USING gist (
    -- if system_configuration_id is EQUAL
    parent_system_configuration_id WITH =,
    -- then parent_configuration_option_value_id must be unique
    COALESCE(parent_configuration_option_value_id, 0) WITH =
),
-- ADD CONSTRAINT parent_or_child_configuration_option CHECK (
--     (
--         parent_configuration_option_value_id IS NOT NULL
--         OR
--         parent_system_configuration_id IS NOT NULL
--     ) AND (
--         parent_configuration_option_value_id IS NULL
--         OR
--         parent_system_configuration_id IS NULL
--     )
-- ),
-- options must reference an option_value that IS recursive
-- ALTER TABLE gc_protected.configuration_options
ADD CONSTRAINT recursive_parent_configuration_option_value FOREIGN KEY (
    is_recursive,
    parent_configuration_option_value_id
) REFERENCES configuration_option_values (
    is_recursive,
    id
) INITIALLY DEFERRED,
ADD CONSTRAINT recursive_configuration_option CHECK (
    (
        parent_configuration_option_value_id IS NULL
        AND
        is_recursive = FALSE
    ) OR (
        parent_configuration_option_value_id IS NOT NULL
        AND
        is_recursive = TRUE
    )
),
ADD CONSTRAINT default_configuration_option_value_child FOREIGN KEY (
    id,
    default_configuration_option_value_id
) REFERENCES configuration_option_values (
    parent_configuration_option_id,
    id
) INITIALLY DEFERRED;

-- Configuration Parts
ALTER TABLE gc_protected.configuration_parts
ADD CONSTRAINT part_recursive_parent_configuration_option_value FOREIGN KEY (
    is_recursive,
    configuration_option_value_id
) REFERENCES configuration_option_values (
    is_recursive,
    id
) INITIALLY DEFERRED,
ADD CONSTRAINT recursive_configuration_option CHECK (is_recursive = FALSE);
