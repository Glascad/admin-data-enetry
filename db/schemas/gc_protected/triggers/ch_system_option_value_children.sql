
<<LOOP
    PARENT_TYPE (system, system_detail, detail_configuration)
    PARENT_OPTION (system_option, detail_option, configuration_option)
    CHILD_TYPE (system_detail, detail_configuration, configuration_part)
    CHILD_VALUE (system_option_value, detail_option_value, configuration_option_value)
>>

    <<LOOP PARENT (<<PARENT_TYPE>>, <<PARENT_OPTION>>)>>

        DROP FUNCTION IF EXISTS check_<<PARENT>>_children;

        CREATE OR REPLACE FUNCTION check_<<PARENT>>_children()
        RETURNS TRIGGER AS $$
        DECLARE
            ___ INTEGER;
        BEGIN

            SELECT 1 FROM get_<<PARENT>>_child_type() INTO ___;

        END;
        $$ LANGUAGE plpgsql;

        CREATE CONSTRAINT TRIGGER check_<<PARENT>>_children
        AFTER INSERT OR UPDATE OF path ON <<PARENT>>s
        INITIALLY DEFERRED
        FOR EACH ROW EXECUTE FUNCTION check_<<PARENT>>_children();

    <<END LOOP>>

    <<LOOP CHILD (<<CHILD_TYPE>>, <<CHILD_VALUE>>)>>
    
    <<END LOOP>>

<<END LOOP>>

<<LOOP
    VALUE (system_option_value, detail_option_value, configuration_option_value)
    TYPE (system_detail, detail_configuration, configuration_part)
    OPTION (system_option, detail_option, configuration_option)
>>

    <<LOOP
        SELF (<<TYPE>>, <<OPTION>>)
        OTHER (<<OPTION>>, <<TYPE>>)
    >>

        DROP FUNCTION IF EXISTS check_<<SELF>>_siblings;

        CREATE OR REPLACE FUNCTION gc_public.check_<<SELF>>_siblings()
        RETURNS TRIGGER AS $$
        DECLARE
            ___ INTEGER;
        BEGIN

            -- option values must not have duplicate kinds of children

            SELECT 1 FROM get_<<VALUE>>_child_type(
                COALESCE(
                    NEW.parent_<<VALUE>>_path,
                    OLD.parent_<<VALUE>>_path
                )
            ) INTO ___;

            -- SELECT ARRAY_AGG(get_system_child_type(t.id::TEXT::LTREE)) FROM systems t INTO ___ WHERE t.id = s.id;

            -- <<LOOP 
            --     TYPE (
            --         system_option_value,
            --         detail_option_value,
            --         system_detail,
            --         detail_configuration
            --     )
            -- >>

            --     -- this function throws an error if there are duplicate child types
            --     SELECT ARRAY_AGG(get_<<TYPE>>_child_type(t.path))
            --     FROM <<TYPE>>s t
            --     INTO ___
            --     WHERE t.system_id = s.id;

            -- <<END LOOP>>

            -- RETURN NEW;

        END;
        $$ LANGUAGE plpgsql;

        CREATE CONSTRAINT TRIGGER check_<<SELF>>_siblings
        AFTER INSERT OR UPDATE OF parent_<<VALUE>>_path OR DELETE ON <<SELF>>s
        INITIALLY DEFERRED
        FOR EACH ROW EXECUTE FUNCTION check_<<SELF>>_siblings();

    <<END LOOP>>

<<END LOOP>>
