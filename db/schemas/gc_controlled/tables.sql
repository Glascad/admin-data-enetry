
CREATE TABLE
gc_controlled.valid_system_options (
    option_name SYSTEM_OPTION_NAME PRIMARY KEY
);

INSERT INTO valid_system_options
(option_name)
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
('glazing', 'inside'),
('glazing', 'outside'),
('stops', 'up'),
('stops', 'down'),
('joinery', 'screw-spline'),
('joinery', 'shear-block'),
('joinery', 'stick');

CREATE TABLE
gc_controlled.ordered_presentation_levels (
    value INTEGER UNIQUE,
    level PRESENTATION_LEVEL PRIMARY KEY
);

INSERT INTO ordered_presentation_levels
(value, level)
VALUES
(5, 'system'),
(4, 'elevation'),
(3, 'lite'),
(2, 'frame'),
(1, 'detail');
