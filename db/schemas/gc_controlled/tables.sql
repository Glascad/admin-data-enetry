
CREATE TABLE
gc_controlled.system_types (
    type SYSTEM_TYPE PRIMARY KEY
);

INSERT INTO system_types
(type)
SELECT UNNEST(ENUM_RANGE(NULL::SYSTEM_TYPE));

CREATE TABLE
gc_controlled.valid_system_options (
    name SYSTEM_OPTION_NAME PRIMARY KEY
);

INSERT INTO valid_system_options
(name)
SELECT UNNEST(ENUM_RANGE(NULL::SYSTEM_OPTION_NAME));

CREATE TABLE
gc_controlled.valid_option_values (
    option_name SYSTEM_OPTION_NAME REFERENCES valid_system_options,
    value_name OPTION_VALUE_NAME,
    PRIMARY KEY (option_name, value_name),
    UNIQUE (option_name, value_name)
);

INSERT INTO valid_option_values
(option_name, value_name)
VALUES
('GLAZING', 'INSIDE'),
('GLAZING', 'OUTSIDE'),
('STOPS', 'UP'),
('STOPS', 'DOWN'),
('JOINERY', 'SCREW_SPLINE'),
('JOINERY', 'SHEAR_BLOCK'),
('JOINERY', 'STICK');

CREATE TABLE
gc_controlled.ordered_presentation_levels (
    value INTEGER UNIQUE,
    level PRESENTATION_LEVEL PRIMARY KEY
);

INSERT INTO ordered_presentation_levels
(value, level)
VALUES
(5, 'SYSTEM'),
(4, 'ELEVATION'),
(3, 'LITE'),
(2, 'FRAME'),
(1, 'DETAIL');
