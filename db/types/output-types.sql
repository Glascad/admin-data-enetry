DROP TYPE IF EXISTS name_output CASCADE;
DROP TYPE IF EXISTS type_output CASCADE;
DROP TYPE IF EXISTS tag_output CASCADE;
DROP TYPE IF EXISTS configuration_type_output CASCADE;
DROP TYPE IF EXISTS system_configuration_type_output CASCADE;
DROP TYPE IF EXISTS system_set_configuration_type_output CASCADE;
DROP TYPE IF EXISTS detail_type CASCADE;
DROP TYPE IF EXISTS detail_type_output CASCADE;
DROP TYPE IF EXISTS system_detail_type_output CASCADE;
DROP TYPE IF EXISTS system_set_detail_type_output CASCADE;
DROP TYPE IF EXISTS system_type_output CASCADE;
DROP TYPE IF EXISTS option_value_output CASCADE;
DROP TYPE IF EXISTS system_option CASCADE;
DROP TYPE IF EXISTS system_option_output CASCADE;
DROP TYPE IF EXISTS system_set_option_output CASCADE;
DROP TYPE IF EXISTS system CASCADE;
DROP TYPE IF EXISTS system_output CASCADE;
DROP TYPE IF EXISTS system_set_output CASCADE;

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
    door BOOLEAN,
    required BOOLEAN,
    mirrorable BOOLEAN,
    presentation_level PRESENTATION_LEVEL,
    override_level PRESENTATION_LEVEL
);

CREATE TYPE
system_configuration_type_output AS (
    invalid BOOLEAN,
    configuration_type CONFIGURATION_TYPE_OUTPUT,
    system_type_default CONFIGURATION_TYPE_OUTPUT
);

CREATE TYPE
system_set_configuration_type_output AS (
    selected BOOLEAN,
    system_default SYSTEM_CONFIGURATION_TYPE_OUTPUT
);

-- COMMENT ON TABLE -- public.detail_types -- IS '@name dt';

CREATE TYPE
detail_type AS (
    id INTEGER,
    type TEXT,
    entrance BOOLEAN,
    vertical BOOLEAN
);

COMMENT ON TYPE detail_type IS '@name _detailType';

CREATE TYPE
detail_type_output AS (
    detail_type DETAIL_TYPE,
    configuration_types CONFIGURATION_TYPE_OUTPUT[]
);

CREATE TYPE
system_detail_type_output AS (
    detail_type DETAIL_TYPE,
    configuration_types SYSTEM_CONFIGURATION_TYPE_OUTPUT[]
);

CREATE TYPE
system_set_detail_type_output AS (
    detail_type DETAIL_TYPE,
    configuration_types SYSTEM_SET_CONFIGURATION_TYPE_OUTPUT[]
);

CREATE TYPE
system_type_output AS (
    id INTEGER,
    type TEXT,
    detail_types DETAIL_TYPE_OUTPUT[]
);

CREATE TYPE
option_value_output AS (
    id INTEGER,
    name VARCHAR,
    value FLOAT,
    value_order INTEGER
);

-- COMMENT ON TABLE -- public.system_options -- IS '@name so';

CREATE TYPE
system_option AS (
    id INTEGER,
    name TEXT,
    option_order INTEGER,
    presentation_level PRESENTATION_LEVEL,
    override_level PRESENTATION_LEVEL
);

COMMENT ON TYPE system_option IS '@name _systemOption';

CREATE TYPE
system_option_output AS (
    system_option SYSTEM_OPTION,
    option_values OPTION_VALUE_OUTPUT[]
);

CREATE TYPE
system_set_option_output AS (
    selected_value_id INTEGER,
    system_option SYSTEM_OPTION,
    option_values OPTION_VALUE_OUTPUT[]
);

-- COMMENT ON TABLE -- public.systems -- IS '@name sys';

CREATE TYPE
system AS (
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
    infill_pocket_sizes FLOAT[],
    infill_pocket_types TYPE_OUTPUT[]
);

COMMENT ON TYPE system IS '@name _system';

CREATE TYPE
system_output AS (
    system SYSTEM,
    system_options SYSTEM_OPTION_OUTPUT[],
    detail_types SYSTEM_DETAIL_TYPE_OUTPUT[]
);

CREATE TYPE
system_set_output AS (
    id INTEGER,
    system SYSTEM,
    infill_size INTEGER,
    system_options SYSTEM_SET_OPTION_OUTPUT[],
    detail_types SYSTEM_SET_DETAIL_TYPE_OUTPUT[]
);
