
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

-- OPTION GROUPS
CREATE TYPE
gc_data.ENTIRE_OPTION_GROUP AS (
    system_option_value_path LTREE,
    name OPTION_NAME
);

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
    paths_to_delete LTREE[],
    option_groups_to_delete ENTIRE_OPTION_GROUP[],
    new_option_groups ENTIRE_OPTION_GROUP[]
    <<LOOP
        TYPE (
            configuration_option_value,
            configuration_option,
            system_configuration,
            detail_option_value,
            detail_option,
            system_detail,
            system_option_value,
            system_option
        )
    >>
        , <<TYPE>>s ENTIRE_<<TYPE>>[]
        , new_<<TYPE>>s NEW_<<TYPE>>[]
    <<END LOOP>>
);
