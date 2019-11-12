
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

<<LOOP 
    TYPE (configuration, detail, system)
    PARENT (detail, system, NULL)
>>

    CREATE TYPE
    gc_data.NEW_<<TYPE>>_OPTION AS (
        name OPTION_NAME,
        default_<<TYPE>>_option_value OPTION_VALUE_NAME,
        parent_<<TYPE>>_option_value_path LTREE
        <<ONLY TYPE (configuration, detail)>>
            , parent_<<PARENT>>_<<TYPE>>_path LTREE
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
    TYPE (part, configuration, detail)
    PARENT (configuration, detail, system)
    GRANDPARENT (detail, system, NULL)
>>

    CREATE TYPE
    gc_data.NEW_<<PARENT>>_<<TYPE>> AS (
        <<ONLY TYPE (configuration, detail)>>
            <<TYPE>>_type <<TYPE>>_TYPE,
        <<END ONLY>>
        parent_<<PARENT>>_option_value_path LTREE
        <<ONLY TYPE (part, configuration)>>
            parent_<<GRANDPARENT>>_<<PARENT>>_path LTREE
            <<ONLY TYPE (configuration)>>
                , optional BOOLEAN
            <<END ONLY>>
            <<ONLY TYPE (part)>>
                transform MATRIX,
                part_id INTEGER,
                part_orientation ORIENTATION,
                extra_part_path_id INTEGER,
                extra_part_path_orientation ORIENTATION
            <<END ONLY>>
        <<END ONLY>>
    );

    CREATE TYPE
    gc_data.ENTIRE_<<PARENT>>_<<TYPE>> AS (
        -- identification
        <<ONLY TYPE (configuration, detail)>>
            path LTREE,
        <<END ONLY>>
        <<ONLY TYPE (part)>>
            id INTEGER,
        <<END ONLY>>
        -- update
        update NEW_<<PARENT>>_<<TYPE>>
    );

<<END LOOP>>


CREATE TYPE
gc_data.ENTIRE_SYSTEM AS (
    id INTEGER,
    name TEXT,
    system_type SYSTEM_TYPE,
    manufacturer_id INTEGER,
    paths_to_delete LTREE[],
    option_groups_to_delete OPTION_NAME[],
    new_option_groups OPTION_NAME[],
    configuration_part_ids_to_delete INTEGER[]
    <<LOOP
        TYPE (
            configuration_part,
            configuration_option_value,
            configuration_option,
            detail_configuration,
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
