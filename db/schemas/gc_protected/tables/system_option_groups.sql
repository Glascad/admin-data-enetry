
-- OPTION GROUPS

CREATE TABLE
gc_protected.option_groups (
    id SERIAL PRIMARY KEY,
    name OPTION_NAME REFERENCES valid_options NOT NULL,
    UNIQUE (id, name)
);

CREATE TABLE
gc_protected.option_group_values (
    option_group_id INTEGER REFERENCES option_groups,
    option_name OPTION_NAME REFERENCES valid_options NOT NULL,
    name OPTION_VALUE_NAME NOT NULL,
    FOREIGN KEY (
        option_group_id,
        option_name
    ) REFERENCES option_groups (
        id,
        name
    ),
    FOREIGN KEY (
        option_name,
        name
    ) REFERENCES valid_option_values (
        option_name,
        name
    )
);

ALTER TABLE system_options
ADD COLUMN option_group_id INTEGER REFERENCES option_groups;

ALTER TABLE detail_options
ADD COLUMN option_group_id INTEGER REFERENCES option_groups;

ALTER TABLE configuration_options
ADD COLUMN option_group_id INTEGER REFERENCES option_groups;



ALTER TABLE system_option_values
ADD COLUMN option_group_id INTEGER REFERENCES option_groups,
ADD COLUMN option_group_value_id INTEGER REFERENCES option_group_values;

ALTER TABLE detail_option_values
ADD COLUMN option_group_id INTEGER REFERENCES option_groups,
ADD COLUMN option_group_value_id INTEGER REFERENCES option_group_values;

ALTER TABLE configuration_option_values
ADD COLUMN option_group_id INTEGER REFERENCES option_groups,
ADD COLUMN option_group_value_id INTEGER REFERENCES option_group_values;



ALTER TABLE system_option_values
ADD FOREIGN KEY ();

ALTER TABLE detail_option_values
ADD FOREIGN KEY ();

ALTER TABLE configuration_option_values
ADD FOREIGN KEY ();


