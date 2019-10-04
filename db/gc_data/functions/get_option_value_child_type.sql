

<<LOOP
    TYPE (
        system,
        detail
    )
    CHILD (
        detail,
        configuration
    )
>>

    DROP FUNCTION IF EXISTS get_<<TYPE>>_option_value_child_type;

    CREATE OR REPLACE FUNCTION gc_data.get_<<TYPE>>_option_value_child_type(ov_path LTREE)
    RETURNS TEXT AS $$
    DECLARE
        is_option BOOLEAN;
        is_type BOOLEAN;
    BEGIN
        is_option := EXISTS (
            SELECT * FROM <<TYPE>>_options o
            WHERE o.parent_<<TYPE>>_option_value_path = ov_path
        );
        
        is_type := EXISTS (
            SELECT * FROM system_<<CHILD>>s st
            WHERE st.parent_<<TYPE>>_option_value_path = ov_path
        );
        
        IF is_option AND is_type THEN

            RAISE EXCEPTION 'Option value % cannot contain both recursive <<TYPE>> option and system <<CHILD>>', ov_path;

        ELSIF is_option THEN RETURN '<<TYPE>>_option';

        ELSIF is_type THEN RETURN 'system_<<CHILD>>';

        ELSE RETURN NULL;

        END IF;

    END;
    $$ LANGUAGE plpgsql STABLE;

<<END LOOP>>
