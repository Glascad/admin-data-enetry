
CREATE TABLE
gc_data.manufacturers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE
gc_data.parts (
    id SERIAL PRIMARY KEY,
    manufacturer_id INTEGER REFERENCES manufacturers NOT NULL,
    part_number VARCHAR(100) NOT NULL,
    paths SVG_PATH[] NOT NULL,
    orientation ORIENTATION DEFAULT 'FRONT' NOT NULL,
    UNIQUE (manufacturer_id, part_number),
    -- for foreign keys
    UNIQUE (id, manufacturer_id)
);


-- CREATE TABLE
-- gc_data.extra_part_paths (
--     id SERIAL PRIMARY KEY,
--     part_id INTEGER REFERENCES parts NOT NULL,
--     orientation ORIENTATION NOT NULL,
--     paths SVG_PATH[] NOT NULL,
--     UNIQUE (part_id, orientation),
--     -- for foreign keys
--     UNIQUE (id, orientation)
-- );
