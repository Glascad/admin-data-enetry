
-- ELEVATION

CREATE TYPE
gc_public.entire_elevation_container AS (
    id INTEGER,
    fake_id INTEGER,
    original BOOLEAN,
    contents TEXT,
    daylight_opening RECTANGLE
    -- custom_rough_opening BOOLEAN
);

CREATE TYPE
gc_public.entire_elevation_frame AS (
    vertical BOOLEAN,
    placement RECTANGLE,
    container_detail_ids INTEGER[],
    container_detail_fake_ids INTEGER[]
);

CREATE TYPE
gc_public.entire_container_detail AS (
    id INTEGER,
    fake_id INTEGER,
    vertical BOOLEAN,
    placement RECTANGLE,
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
    rough_opening DIMENSIONS,
    finished_floor_height FLOAT,
    containers ENTIRE_ELEVATION_CONTAINER[],
    container_ids_to_delete INTEGER[],
    details ENTIRE_CONTAINER_DETAIL[],
    detail_ids_to_delete INTEGER[],
    frames ENTIRE_ELEVATION_FRAME[],
    -- sightline FLOAT,
    preview SVG_PATH[]
);



-- SYSTEM SET

CREATE TYPE
gc_public.option_value_pair AS (
    option_name OPTION_NAME,
    name OPTION_VALUE_NAME
);

CREATE TYPE
gc_public.detail_configuration_pair AS (
    detail_type DETAIL_TYPE,
    configuration_type CONFIGURATION_TYPE
);

<<LOOP
    TYPE (detail, configuration)
    PARENT (system, detail)
>>

    CREATE TYPE
    gc_public.entire_system_set_<<TYPE>> AS (
        <<PARENT>>_<<TYPE>>_path LTREE,
        <<TYPE>>_option_value_path LTREE
    );

<<END LOOP>>

CREATE TYPE
gc_public.entire_system_set AS (
    id INTEGER,
    system_id INTEGER,
    project_id INTEGER,
    name VARCHAR(50),
    system_option_value_path LTREE,
    option_group_values OPTION_VALUE_PAIR[],
    details ENTIRE_SYSTEM_SET_DETAIL[],
    configurations ENTIRE_SYSTEM_SET_CONFIGURATION[],
    optional_configurations_to_unselect DETAIL_CONFIGURATION_PAIR[]
);



-- PROJECT

CREATE TYPE
gc_public.entire_project AS (
    id INTEGER,
    name TEXT,
    default_elevation JSONB
);
