
-- VALUES

<<LOOP TYPE (configuration, detail, system)>>

CREATE TYPE
gc_data.entire_<<TYPE>>_option_value AS (
    name OPTION_VALUE_NAME,
    parent_<<TYPE>>_option_path LTREE
);

<<END LOOP>>



-- OPTIONS

<<LOOP TYPE (configuration, detail)>>

CREATE TYPE
gc_data.entire_<<TYPE>>_option AS (
    name OPTION_NAME,
    default_<<TYPE>>_option_value OPTION_VALUE_NAME,
    parent_<<TYPE>>_option_value_path LTREE,
    parent_system_<<TYPE>>_path LTREE
);

<<END LOOP>>

CREATE TYPE
gc_data.entire_system_option AS (
    name OPTION_NAME,
    default_system_option_value OPTION_VALUE_NAME,
    parent_system_option_value_path LTREE
);

-- TYPES

CREATE TYPE
gc_data.entire_system_configuration AS (
    configuration_type CONFIGURATION_TYPE,
    optional BOOLEAN,
    parent_detail_option_value_path LTREE
);

CREATE TYPE
gc_data.entire_system_detail AS (
    detail_type DETAIL_TYPE,
    parent_system_option_value_path LTREE
);

CREATE TYPE
gc_data.entire_system AS (
    name TEXT,
    system_type SYSTEM_TYPE

    <<LOOP TYPE (system, detail, configuration)>>
        , <<TYPE>>_options ENTIRE_<<TYPE>>_OPTION[]
        , <<TYPE>>_option_values ENTIRE_<<TYPE>>_OPTION_VALUE[]
        
        , <<TYPE>>_option_paths_to_delete LTREE[]
        , <<TYPE>>_option_value_paths_to_delete LTREE[]
    <<END LOOP>>

    <<LOOP TYPE (detail, configuration)>>
        , system_<<TYPE>> ENTIRE_SYSTEM_<<TYPE>>[]
        , system<<TYPE>>_paths_to_delete LTREE[]
    <<END LOOP>>

);
