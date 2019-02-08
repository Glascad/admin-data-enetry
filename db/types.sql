DROP TYPE IF EXISTS entire_option_value CASCADE;
DROP TYPE IF EXISTS entire_system_option CASCADE;
DROP TYPE IF EXISTS entire_invalid_system_configuration_type CASCADE;
DROP TYPE IF EXISTS entire_system_configuration_override CASCADE;
DROP TYPE IF EXISTS entire_system CASCADE;

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
    name VARCHAR(50),
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
    name VARCHAR(50),
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
