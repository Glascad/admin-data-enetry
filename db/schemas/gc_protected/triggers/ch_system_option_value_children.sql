
-- CHECK CHILDREN OF EACH PARENT

<<LOOP
    VALUE (system_option_value, detail_option_value, configuration_option_value)
    TYPE (system, system_detail, detail_configuration)
    COLUMN (id, path, path)
>>

    <<LOOP
        ITEM (<<TYPE>>, <<VALUE>>)
        COL (<<COLUMN>>, path)
    >>

        DROP FUNCTION IF EXISTS check_<<ITEM>>_children;

        CREATE OR REPLACE FUNCTION gc_protected.check_<<ITEM>>_children()
        RETURNS TRIGGER AS $$
        DECLARE
            ___ INTEGER;
        BEGIN

            SELECT 1 FROM get_<<ITEM>>_child_type(COALESCE(NEW.<<COL>>, OLD.<<COL>>)) INTO ___;

            RETURN NEW;

        END;
        $$ LANGUAGE plpgsql;

        CREATE CONSTRAINT TRIGGER check_<<ITEM>>_children
        AFTER INSERT OR UPDATE ON <<ITEM>>s
        INITIALLY DEFERRED
        FOR EACH ROW EXECUTE FUNCTION check_<<ITEM>>_children();

    <<END LOOP>>

<<END LOOP>>



<<LOOP
    GRANDPARENT (NULL, NULL, system, system, detail, detail)
    PARENT (system, system, detail, detail, configuration, configuration)
    TYPE (option, detail, option, configuration, option, part)
>>

    DROP FUNCTION IF EXISTS check_<<PARENT>>_<<TYPE>>_siblings;

    CREATE OR REPLACE FUNCTION gc_protected.check_<<PARENT>>_<<TYPE>>_siblings()
    RETURNS TRIGGER AS $$
    DECLARE
        parent_ov_path LTREE;
        parent_t_path LTREE;
        sid INTEGER;
        ___ INTEGER;
    BEGIN

        parent_ov_path := COALESCE(NEW.parent_<<PARENT>>_option_value_path, OLD.parent_<<PARENT>>_option_value_path);
        <<ONLY GRANDPARENT (system, detail)>>
            parent_t_path := COALESCE(NEW.parent_<<GRANDPARENT>>_<<PARENT>>_path, OLD.parent_<<GRANDPARENT>>_<<PARENT>>_path);
        <<END ONLY>>
        <<ONLY GRANDPARENT (NULL)>>
            sid := COALESCE(NEW.system_id, OLD.system_id);
        <<END ONLY>>

        SELECT 1 FROM get_<<PARENT>>_option_value_child_type(parent_ov_path) INTO ___;
        <<ONLY GRANDPARENT (system, detail)>>
            SELECT 1 FROM get_<<GRANDPARENT>>_<<PARENT>>_child_type(parent_t_path) INTO ___;
        <<END ONLY>>
        <<ONLY GRANDPARENT (NULL)>>
            SELECT 1 FROM get_system_child_type(sid) INTO ___;
        <<END ONLY>>

        RETURN NEW;

    END;
    $$ LANGUAGE plpgsql;

    CREATE CONSTRAINT TRIGGER check_<<PARENT>>_<<TYPE>>_siblings
    AFTER INSERT OR UPDATE ON <<PARENT>>_<<TYPE>>s
    INITIALLY DEFERRED
    FOR EACH ROW EXECUTE FUNCTION check_<<PARENT>>_<<TYPE>>_siblings();

<<END LOOP>>
