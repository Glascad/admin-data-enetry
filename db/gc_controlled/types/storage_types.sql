
CREATE TYPE
gc_controlled.coordinate AS (
    x FLOAT,
    y FLOAT
);

CREATE TYPE
gc_controlled.svg_path_command_letter AS ENUM (
    'M', -- 'm',
    'L', -- 'l',
    'H', -- 'h',
    'V', -- 'v',
    'Z', -- 'z',
    'C', -- 'c',
    'S', -- 's',
    'Q', -- 'q',
    'A' -- , 'a'
);

-- CREATE TYPE
-- linetype AS ENUM (
--     'SOLID'
-- );

-- CREATE TYPE
-- line_weight AS ENUM (
--     'NORMAL'
-- );

-- CREATE TYPE
-- line_color AS ENUM (
--     'BLACK'
-- );

CREATE TYPE
gc_controlled.svg_path_command AS (
    command SVG_PATH_COMMAND_LETTER,
    arguments FLOAT[]
);

CREATE TYPE
gc_controlled.svg_path AS (
    commands SVG_PATH_COMMAND[] -- ,
    -- linetype LINETYPE,
    -- line_weight LINE_WEIGHT,
    -- line_color LINE_COLOR
);

CREATE TYPE
gc_controlled.matrix AS (
    a FLOAT, b FLOAT, c FLOAT,
    d FLOAT, e FLOAT, f FLOAT,
    g FLOAT, h FLOAT, i FLOAT
);

CREATE TYPE
gc_controlled.orientation AS ENUM (
    'FRONT',
    'BACK',
    'TOP',
    'BOTTOM',
    'LEFT',
    'RIGHT'
);
