

<<LOOP
    TYPE (
        system,
        system_detail,
        detail_configuration,
        system_option_value,
        detail_option_value,
        configuration_option_value
    )
    CHILD_TYPE_A (
        system_option,
        detail_option,
        configuration_option,
        system_option,
        detail_option,
        configuration_option
    )
    CHILD_TYPE_B (
        system_detail,
        detail_configuration,
        configuration_part,
        system_detail,
        detail_configuration,
        configuration_part
    )
    ALTERNATE_PARENT_TYPE (
        system_option_value,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL
    )
    COLUMN_TYPE (
        INTEGER,
        LTREE,
        LTREE,
        LTREE,
        LTREE,
        LTREE
    )
>>

    DROP FUNCTION IF EXISTS get_<<TYPE>>_child_type;

    CREATE OR REPLACE FUNCTION gc_data.get_<<TYPE>>_child_type(
        parent_path
        <<ONLY TYPE (system_detail, detail_configuration, system_option_value, detail_option_value, configuration_option_value)>>
            LTREE
        <<END ONLY>>
        <<ONLY TYPE (system)>>
            INTEGER
        <<END ONLY>>
    )
    RETURNS TEXT AS $$
    DECLARE
        is_type_a BOOLEAN;
        is_type_b BOOLEAN;
    BEGIN
        is_type_a := EXISTS (
            SELECT * FROM <<CHILD_TYPE_A>>s a
            <<ONLY TYPE (system_detail, detail_configuration, system_option_value, detail_option_value, configuration_option_value)>>
                WHERE a.parent_<<TYPE>>_path = parent_path
            <<END ONLY>>
            <<ONLY TYPE (system)>>
                WHERE a.parent_<<ALTERNATE_PARENT_TYPE>>_path IS NULL
                AND a.system_id = parent_path
            <<END ONLY>>
        );
        
        is_type_b := EXISTS (
            SELECT * FROM <<CHILD_TYPE_B>>s b
            <<ONLY TYPE (system_detail, detail_configuration, system_option_value, detail_option_value, configuration_option_value)>>
                WHERE b.parent_<<TYPE>>_path = parent_path
            <<END ONLY>>
            <<ONLY TYPE (system)>>
                WHERE b.parent_<<ALTERNATE_PARENT_TYPE>>_path IS NULL
                AND b.system_id = parent_path
            <<END ONLY>>
        );
        
        IF is_type_a AND is_type_b THEN

            RAISE EXCEPTION '<<TYPE>> % cannot contain both recursive <<CHILD_TYPE_A>> and <<CHILD_TYPE_B>>', parent_path;

        ELSIF is_type_a THEN RETURN '<<CHILD_TYPE_A>>';

        ELSIF is_type_b THEN RETURN '<<CHILD_TYPE_B>>';

        ELSE RETURN NULL;

        END IF;

    END;
    $$ LANGUAGE plpgsql STABLE;

<<END LOOP>>
