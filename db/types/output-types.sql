DROP TYPE IF EXISTS name_output CASCADE;
DROP TYPE IF EXISTS type_output CASCADE;
DROP TYPE IF EXISTS tag_output CASCADE;
DROP TYPE IF EXISTS configuration_type_output CASCADE;
DROP TYPE IF EXISTS detail_type_output CASCADE;
DROP TYPE IF EXISTS system_type_output CASCADE;
DROP TYPE IF EXISTS system_configuration_type_output CASCADE;
DROP TYPE IF EXISTS option_value_output CASCADE;
DROP TYPE IF EXISTS system_option_output CASCADE;
DROP TYPE IF EXISTS system_output CASCADE;

CREATE TYPE
name_output AS (
    id INTEGER,
    name TEXT
);

CREATE TYPE
type_output AS (
    id INTEGER,
    type TEXT
);

CREATE TYPE
tag_output AS (
    id INTEGER,
    tag TEXT
);

CREATE TYPE
configuration_type_output AS (
    id INTEGER,
    type TEXT,
    required BOOLEAN,
    mirrorable BOOLEAN,
    presentation_level PRESENTATION_LEVEL,
    override_level PRESENTATION_LEVEL
);

CREATE TYPE
detail_type_output AS (
    id INTEGER,
    type TEXT,
    entrance BOOLEAN,
    vertical BOOLEAN,
    configuration_types CONFIGURATION_TYPE_OUTPUT[]
);

CREATE TYPE
system_type_output AS (
    id INTEGER,
    type TEXT,
    detail_types DETAIL_TYPE_OUTPUT[]
);

CREATE TYPE
system_configuration_type_output AS (
    id INTEGER,
    type TEXT,
    door BOOLEAN,
    invalid BOOLEAN,
    system_value CONFIGURATION_TYPE_OUTPUT,
    system_type_value CONFIGURATION_TYPE_OUTPUT
);

CREATE TYPE
option_value_output AS (
    id INTEGER,
    name VARCHAR,
    value FLOAT,
    value_order INTEGER
);

CREATE TYPE
system_option_output AS (
    id INTEGER,
    name TEXT,
    option_order INTEGER,
    presentation_level PRESENTATION_LEVEL,
    override_level PRESENTATION_LEVEL,
    values OPTION_VALUE_OUTPUT[]
);

CREATE TYPE
system_output AS (
    id INTEGER,
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
    manufacturer NAME_OUTPUT,
    system_type TYPE_OUTPUT,
    system_tags TAG_OUTPUT[],
    infill_sizes FLOAT[],
    system_options SYSTEM_OPTION_OUTPUT[],
    detail_types DETAIL_TYPE_OUTPUT[]
);
