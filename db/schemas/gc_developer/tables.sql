
CREATE TABLE
gc_developer.valid_option_values (
    option_name SYSTEM_OPTION_NAME,
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
('stops', 'down');

CREATE TABLE ordered_presentation_levels (
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
