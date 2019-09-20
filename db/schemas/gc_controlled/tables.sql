
CREATE TABLE
gc_controlled.system_types (
    type SYSTEM_TYPE PRIMARY KEY
);

CREATE TABLE
gc_controlled.detail_types (
    type DETAIL_TYPE PRIMARY KEY
);

CREATE TABLE
gc_controlled.configuration_types (
    type CONFIGURATION_TYPE PRIMARY KEY
);

CREATE TABLE
gc_controlled.valid_options (
    name OPTION_NAME PRIMARY KEY
);

CREATE TABLE
gc_controlled.valid_option_values (
    option_name OPTION_NAME REFERENCES valid_options,
    name OPTION_VALUE_NAME,
    PRIMARY KEY (option_name, name),
    UNIQUE (option_name, name)
);

-- CREATE TABLE
-- gc_controlled.ordered_presentation_levels (
--     value INTEGER UNIQUE,
--     level PRESENTATION_LEVEL PRIMARY KEY
-- );
