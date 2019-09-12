
CREATE TYPE
gc_public.entire_bug_report AS (
    id INTEGER,
    username TEXT,
    location TEXT,
    report TEXT,
    state JSONB,
    timestamp TIMESTAMP
);

-- CREATE TYPE
-- gc_public.name_output AS (
--     id INTEGER,
--     name TEXT
-- );

-- CREATE TYPE
-- gc_public.type_output AS (
--     id INTEGER,
--     type TEXT
-- );

-- CREATE TYPE
-- gc_public.tag_output AS (
--     id INTEGER,
--     tag TEXT
-- );

-- CREATE TYPE
-- gc_public.configuration_type_output AS (
--     id INTEGER,
--     type TEXT,
--     door BOOLEAN,
--     required BOOLEAN,
--     mirrorable BOOLEAN,
--     presentation_level PRESENTATION_LEVEL,
--     override_level PRESENTATION_LEVEL
-- );

-- CREATE TYPE
-- gc_public.system_configuration_type_output AS (
--     invalid BOOLEAN,
--     configuration_type CONFIGURATION_TYPE_OUTPUT,
--     system_type_default CONFIGURATION_TYPE_OUTPUT
-- );

-- CREATE TYPE
-- gc_public.system_set_configuration_type_output AS (
--     selected BOOLEAN,
--     system_default SYSTEM_CONFIGURATION_TYPE_OUTPUT,
--     detail_types DETAIL_TYPE[]
-- );

-- -- COMMENT ON TABLE -- public.detail_types -- IS '@name dt';

-- -- CREATE TYPE
-- -- gc_public.detail_type AS (
-- --     id INTEGER,
-- --     type TEXT,
-- --     entrance BOOLEAN,
-- --     vertical BOOLEAN
-- -- );

-- -- COMMENT ON TYPE detail_type IS '@name _detailType';

-- CREATE TYPE
-- gc_public.detail_type_output AS (
--     detail_type DETAIL_TYPE,
--     configuration_types CONFIGURATION_TYPE_OUTPUT[]
-- );

-- CREATE TYPE
-- gc_public.system_detail_type_output AS (
--     detail_type DETAIL_TYPE,
--     configuration_types SYSTEM_CONFIGURATION_TYPE_OUTPUT[]
-- );

-- CREATE TYPE
-- gc_public.system_set_detail_type_output AS (
--     detail_type DETAIL_TYPE,
--     configuration_types SYSTEM_SET_CONFIGURATION_TYPE_OUTPUT[]
-- );

-- -- CREATE TYPE
-- -- gc_public.system_type_output AS (
-- --     id INTEGER,
-- --     type TEXT,
-- --     detail_types DETAIL_TYPE_OUTPUT[]
-- -- );

-- CREATE TYPE
-- gc_public.option_value_output AS (
--     id INTEGER,
--     name VARCHAR,
--     value FLOAT,
--     value_order INTEGER
-- );

-- -- COMMENT ON TABLE -- public.system_options -- IS '@name so';

-- CREATE TYPE
-- gc_public.system_option AS (
--     id INTEGER,
--     name TEXT,
--     option_order INTEGER,
--     presentation_level PRESENTATION_LEVEL,
--     override_level PRESENTATION_LEVEL
-- );

-- COMMENT ON TYPE system_option IS '@name _systemOption';

-- CREATE TYPE
-- gc_public.system_option_output AS (
--     system_option SYSTEM_OPTION,
--     option_values OPTION_VALUE_OUTPUT[]
-- );

-- CREATE TYPE
-- gc_public.system_set_option_output AS (
--     selected_value_id INTEGER,
--     system_option SYSTEM_OPTION,
--     option_values OPTION_VALUE_OUTPUT[]
-- );

-- -- COMMENT ON TABLE -- public.systems -- IS '@name sys';

-- CREATE TYPE
-- gc_public.system AS (
--     id INTEGER,
--     name TEXT,
--     depth FLOAT,
--     default_glass_size FLOAT,
--     default_glass_bite FLOAT,
--     default_sightline FLOAT,
--     top_gap FLOAT,
--     bottom_gap FLOAT,
--     side_gap FLOAT,
--     meeting_stile_gap FLOAT,
--     inset FLOAT,
--     glass_gap FLOAT,
--     shim_size FLOAT,
--     front_inset BOOLEAN,
--     manufacturer NAME_OUTPUT,
--     system_type TYPE_OUTPUT,
--     system_tags TAG_OUTPUT[],
--     infill_sizes FLOAT[],
--     infill_pocket_sizes FLOAT[],
--     infill_pocket_types TYPE_OUTPUT[]
-- );

-- COMMENT ON TYPE system IS '@name _system';

-- CREATE TYPE
-- gc_public.system_output AS (
--     system SYSTEM,
--     system_options SYSTEM_OPTION_OUTPUT[],
--     detail_types SYSTEM_DETAIL_TYPE_OUTPUT[]
-- );

-- CREATE TYPE
-- gc_public.system_set_output AS (
--     id INTEGER,
--     system SYSTEM,
--     infill_size INTEGER,
--     system_options SYSTEM_SET_OPTION_OUTPUT[],
--     detail_type_configuration_types SYSTEM_SET_DETAIL_TYPE_OUTPUT[],
--     configuration_type SYSTEM_SET_CONFIGURATION_TYPE_OUTPUT[]
-- );
