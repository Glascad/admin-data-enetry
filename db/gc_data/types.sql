
-- VALUES

<<LOOP TYPE (configuration, detail, system)>>

CREATE TYPE
gc_data.entire_<<TYPE>>_option_value AS (
    name OPTION_VALUE_NAME,
    parent_<<TYPE>>_option_path LTREE,
    new_parent_<<TYPE>>_option_path LTREE
);

<<END LOOP>>

-- OPTIONS

<<LOOP TYPE (configuration, detail, system)>>

CREATE TYPE
gc_data.entire_<<TYPE>>_option AS (
    name OPTION_NAME,
    default_<<TYPE>>_option_value OPTION_VALUE_NAME,
    parent_<<TYPE>>_option_value_path LTREE,
    new_parent_<<TYPE>>_option_value_path LTREE
    <<ONLY TYPE (configuration, detail_type)>>
        , parent_system_<<TYPE>>_path LTREE
        , new_parent_system_<<TYPE>>_path LTREE
    <<END ONLY>>
);

<<END LOOP>>

-- TYPES

<<LOOP
    TYPE (configuration, detail)
    PARENT (detail, system)
>>

CREATE TYPE
gc_data.entire_system_<<TYPE>> AS (
    <<TYPE>>_type CONFIGURATION_TYPE,
    parent_<<PARENT>>_option_value_path LTREE,
    new_parent_<<PARENT>>_option_value_path LTREE
    <<ONLY TYPE (configuration)>>
        , optional BOOLEAN
    <<END ONLY>>
);

<<END LOOP>>


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
