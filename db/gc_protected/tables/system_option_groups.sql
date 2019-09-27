
-- OPTION GROUPS

CREATE TABLE
gc_protected.option_groups (
    id SERIAL PRIMARY KEY,
    system_id INTEGER REFERENCES systems NOT NULL,
    name OPTION_NAME REFERENCES valid_options NOT NULL,
    UNIQUE(system_id, name),
    UNIQUE (id, name)
);

CREATE TABLE
gc_protected.option_group_values (
    id SERIAL PRIMARY KEY,
    system_id INTEGER REFERENCES systems NOT NULL,
    option_name OPTION_NAME REFERENCES valid_options NOT NULL,
    name OPTION_VALUE_NAME NOT NULL,
    UNIQUE (id, system_id),
    UNIQUE (name, system_id),
    UNIQUE (id, name),
    UNIQUE (system_id, name, option_name),
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



-- -- OPTIONS

-- ALTER TABLE system_options
-- ADD COLUMN option_group_id INTEGER REFERENCES option_groups;

-- ALTER TABLE detail_options
-- ADD COLUMN option_group_id INTEGER REFERENCES option_groups;

-- ALTER TABLE configuration_options
-- ADD COLUMN option_group_id INTEGER REFERENCES option_groups;



-- ALTER TABLE system_options
-- ADD FOREIGN KEY (
--     option_group_id,
--     name
-- )
-- REFERENCES option_groups (
--     id,
--     name
-- );

-- ALTER TABLE detail_options
-- ADD FOREIGN KEY (
--     option_group_id,
--     name
-- )
-- REFERENCES option_groups (
--     id,
--     name
-- );

-- ALTER TABLE configuration_options
-- ADD FOREIGN KEY (
--     option_group_id,
--     name
-- )
-- REFERENCES option_groups (
--     id,
--     name
-- );



-- -- VALUES

-- ALTER TABLE system_option_values
-- ADD COLUMN option_group_id INTEGER REFERENCES option_groups;

-- ALTER TABLE detail_option_values
-- ADD COLUMN option_group_id INTEGER REFERENCES option_groups;

-- ALTER TABLE configuration_option_values
-- ADD COLUMN option_group_id INTEGER REFERENCES option_groups;




-- ALTER TABLE system_option_values
-- ADD FOREIGN KEY (
--     system_id,
--     option_group_id,
--     option_name,
--     name
-- )
-- REFERENCES option_group_values (
--     system_id,
--     id,
--     option_name,
--     name
-- )
-- INITIALLY DEFERRED;

-- ALTER TABLE detail_option_values
-- ADD FOREIGN KEY (
--     system_id,
--     option_group_id,
--     option_name,
--     name
-- )
-- REFERENCES option_group_values (
--     system_id,
--     id,
--     option_name,
--     name
-- )
-- INITIALLY DEFERRED;

-- ALTER TABLE configuration_option_values
-- ADD FOREIGN KEY (
--     system_id,
--     option_group_id,
--     option_name,
--     name
-- )
-- REFERENCES option_group_values (
--     system_id,
--     id,
--     option_name,
--     name
-- )
-- INITIALLY DEFERRED;
