
CREATE TYPE
coordinate (
    x FLOAT,
    y FLOAT
);

CREATE TYPE
entire_option_value AS (
    id INTEGER,
    system_option_id INTEGER,
    name TEXT,
    value FLOAT,
    value_order INTEGER,
    mirror_from_option_value_id INTEGER
);

CREATE TYPE
entire_system_option AS (
    id INTEGER,
    system_id INTEGER,
    name TEXT,
    presentation_level INTEGER,
    override_level INTEGER,
    option_order INTEGER,
    option_values entire_option_value[],
    option_value_ids_to_delete INTEGER[],
    configuration_type_ids INTEGER[],
    configuration_type_ids_to_delete INTEGER[]
);

CREATE TYPE
entire_system_configuration_override AS (
    system_id INTEGER,
    system_type_id INTEGER,
    detail_type_id INTEGER,
    configuration_type_id INTEGER,
    required_override BOOLEAN,
    mirrorable_override BOOLEAN,
    presentation_level_override INTEGER,
    override_level_override INTEGER
);

CREATE TYPE
entire_system AS (
    -- SYSTEM INFO
    id INTEGER,
    manufacturer_id INTEGER,
    system_type_id INTEGER,
    name TEXT,
    depth FLOAT,
    default_glass_size FLOAT,
    default_glass_bite FLOAT,
    default_sightline FLOAT,
    top_gap FLOAT,
    bottom_gap FLOAT,
    side_gap FLOAT,
    meeting_stile_gap FLOAT,
    inset FLOAT,
    glass_gap FLOAT,
    shim_size FLOAT,
    front_inset BOOLEAN,
    system_tag_ids INTEGER[],
    system_tag_ids_to_delete INTEGER[],
    -- GLAZING INFO
    infill_sizes FLOAT[],
    infill_sizes_to_delete FLOAT[],
    infill_pocket_type_ids INTEGER[],
    infill_pocket_type_ids_to_delete INTEGER[],
    infill_pocket_sizes FLOAT[],
    infill_pocket_sizes_to_delete FLOAT[],
    -- VALID TYPES
    invalid_configuration_type_ids INTEGER[],
    invalid_configuration_type_ids_to_delete INTEGER[],
    configuration_overrides entire_system_configuration_override[],
    configuration_overrides_to_delete entire_system_configuration_override[],
    -- OPTIONS
    system_options entire_system_option[],
    system_option_ids_to_delete INTEGER[]
);

CREATE TYPE
elevation AS (
    rough_opening COORDINATE,
    starting_bay_quantity INTEGER,
    finished_floor_height INTEGER,
    
)


-- CREATE TYPE
-- entire_lite AS (
--     id INTEGER,
--     elevation_id INTEGER,
--     horizontal_daylight_opening FLOAT,
--     vertical_daylight_opening FLOAT,
--     infill_material TEXT,
--     left_lite_id INTEGER,
--     right_lite_id INTEGER,
--     top_lite_id INTEGER,
--     bottom_lite_id INTEGER,
--     lite_option_value_ids INTEGER[],
--     left_frame entire_frame,
--     right_frame entire_frame,
--     top_frame entire_frame,
--     top_frame entire_frame
--     -- left_frame_option_value_ids INTEGER[],
--     -- right_frame_option_value_ids INTEGER[],
--     -- top_frame_option_value_ids INTEGER[],
--     -- bottom_frame_option_value_ids INTEGER[]
--     glass_bite_override FLOAT,
--     glass_size_override FLOAT
--     -- other dimension overrides here
-- );

-- CREATE TYPE
-- entire_frame AS (
--     -- id INTEGER,
--     -- left_lite_id INTEGER,
--     -- right_lite_id INTEGER,
--     -- top_lite_id INTEGER,
--     -- bottom_lite_id INTEGER,
--     detail_type_id INTEGER,
--     option_value_ids INTEGER[],
--     -- non-required configuration types
--     configuration_type_ids INTEGER[],
--     depth_override FLOAT,
--     sightline_override FLOAT
--     -- other dimension overrides here
-- );

-- CREATE TYPE
-- entire_elevation AS (
--     id INTEGER,
--     name TEXT,
--     horizontal_rough_opening FLOAT,
--     vertical_rough_opening FLOAT,
--     finished_floor_offset FLOAT,
--     lites entire_lite[],
-- );
