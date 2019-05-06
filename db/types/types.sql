
CREATE TYPE
id_pair AS (
    id INTEGER,
    fake_id INTEGER
);

CREATE TYPE
coordinate AS (
    x FLOAT,
    y FLOAT
);

CREATE TYPE
presentation_level AS ENUM (
    'system',
    'elevation',
    'lite',
    'frame',
    'detail'
);
