
-- VALUES

<<LOOP TYPE (configuration, detail, system)>>

    CREATE TYPE
    gc_data.NEW_<<TYPE>>_OPTION_VALUE AS (
        name OPTION_VALUE_NAME,
        parent_<<TYPE>>_option_path LTREE
    );

    CREATE TYPE
    gc_data.ENTIRE_<<TYPE>>_OPTION_VALUE AS (
        -- identification
        path LTREE,
        -- update
        update NEW_<<TYPE>>_OPTION_VALUE
    );

<<END LOOP>>

-- OPTIONS

<<LOOP TYPE (configuration, detail, system)>>

    CREATE TYPE
    gc_data.NEW_<<TYPE>>_OPTION AS (
        name OPTION_NAME,
        default_<<TYPE>>_option_value OPTION_VALUE_NAME,
        parent_<<TYPE>>_option_value_path LTREE
        <<ONLY TYPE (configuration, detail)>>
            , parent_system_<<TYPE>>_path LTREE
        <<END ONLY>>
    );

    CREATE TYPE
    gc_data.ENTIRE_<<TYPE>>_OPTION AS (
        -- identification
        path LTREE,
        -- update
        update NEW_<<TYPE>>_OPTION
    );

<<END LOOP>>

-- TYPES

<<LOOP
    TYPE (configuration, detail)
    PARENT (detail, system)
>>

    CREATE TYPE
    gc_data.NEW_SYSTEM_<<TYPE>> AS (
        <<TYPE>>_type <<TYPE>>_TYPE,
        parent_<<PARENT>>_option_value_path LTREE
        <<ONLY TYPE (configuration)>>
            , optional BOOLEAN
        <<END ONLY>>
    );

    CREATE TYPE
    gc_data.ENTIRE_SYSTEM_<<TYPE>> AS (
        -- identification
        path LTREE,
        -- update
        update NEW_SYSTEM_<<TYPE>>
    );

<<END LOOP>>


CREATE TYPE
gc_data.ENTIRE_SYSTEM AS (
    id INTEGER,
    name TEXT,
    system_type SYSTEM_TYPE,
    manufacturer_id INTEGER,
    paths_to_delete LTREE[]
    <<LOOP TYPE (configuration, detail, system)>>
        -- options
        , <<TYPE>>_options ENTIRE_<<TYPE>>_OPTION[]
        , new_<<TYPE>>_options NEW_<<TYPE>>_OPTION[]
        -- values
        , <<TYPE>>_option_values ENTIRE_<<TYPE>>_OPTION_VALUE[]
        , new_<<TYPE>>_option_values NEW_<<TYPE>>_OPTION_VALUE[]
        -- types
        <<ONLY TYPE (configuration, detail)>>
            , system_<<TYPE>>s ENTIRE_SYSTEM_<<TYPE>>[]
            , new_system_<<TYPE>>s NEW_SYSTEM_<<TYPE>>[]
        <<END ONLY>>
    <<END LOOP>>
);
