
-- ELEVATION

CREATE TYPE
gc_public.entire_elevation_container AS (
    id INTEGER,
    fake_id INTEGER,
    original BOOLEAN,
    contents TEXT,
    daylight_opening COORDINATE,
    custom_rough_opening BOOLEAN
);

CREATE TYPE
gc_public.entire_container_detail AS (
    id INTEGER,
    vertical BOOLEAN,
    first_container_id INTEGER,
    first_container_fake_id INTEGER,
    second_container_id INTEGER,
    second_container_fake_id INTEGER
);

CREATE TYPE
gc_public.entire_elevation AS (
    id INTEGER,
    project_id INTEGER,
    system_set_id INTEGER,
    name TEXT,
    rough_opening COORDINATE,
    finished_floor_height FLOAT,
    containers ENTIRE_ELEVATION_CONTAINER[],
    container_ids_to_delete INTEGER[],
    details ENTIRE_CONTAINER_DETAIL[],
    detail_ids_to_delete INTEGER[],
    sightline FLOAT,
    preview TEXT
);



-- SYSTEM SET

CREATE TYPE
gc_public.option_value_pair AS (
    option_name OPTION_NAME,
    name OPTION_VALUE_NAME
);

CREATE TYPE
gc_public.entire_system_set_node AS (
    old_path LTREE,
    new_path LTREE
);

CREATE TYPE
gc_public.entire_system_set AS (
    id INTEGER,
    system_id INTEGER,
    project_id INTEGER,
    name VARCHAR(50),
    system_option_value_path LTREE,
    option_group_values OPTION_VALUE_PAIR[],
    detail_option_values ENTIRE_SYSTEM_SET_NODE[],
    configuration_option_values ENTIRE_SYSTEM_SET_NODE[]
);



-- PROJECT

CREATE TYPE
gc_public.entire_project AS (
    id INTEGER,
    name TEXT,
    default_elevation JSONB
);
