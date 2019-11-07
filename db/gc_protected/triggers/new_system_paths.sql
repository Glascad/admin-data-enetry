
<<LOOP
    TYPE (system, detail, configuration, part)
    TYPE_SUFFIX (NULL, type, type, id)
    PARENT (NULL, system, detail, configuration)
    GRANDPARENT (NULL, NULL, system, detail)
    PREFIX (NULL, '__DT__', '__CT__', '__PT')
>>

    <<ONLY TYPE (system, detail, configuration)>>

        -- OPTIONS

        DROP FUNCTION IF EXISTS generate_<<TYPE>>_option_path;

        CREATE OR REPLACE FUNCTION gc_protected.generate_<<TYPE>>_option_path()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.path := COALESCE(
                NEW.parent_<<TYPE>>_option_value_path,
                <<ONLY TYPE (system)>>
                    NEW.system_id::TEXT::LTREE,
                <<END ONLY>>
                <<ONLY TYPE (detail, configuration)>>
                    NEW.parent_<<PARENT>>_<<TYPE>>_path,
                <<END ONLY>>
                OLD.parent_<<TYPE>>_option_value_path,
                <<ONLY TYPE (system)>>
                    OLD.system_id::TEXT::LTREE
                <<END ONLY>>
                <<ONLY TYPE (detail, configuration)>>
                    OLD.parent_<<PARENT>>_<<TYPE>>_path
                <<END ONLY>>
            ) || COALESCE(
                NEW.name,
                OLD.name
            )::TEXT;

            NEW.system_id := subltree(NEW.path, 0, 1)::TEXT::INTEGER;

            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER generate_<<TYPE>>_option_path
        BEFORE INSERT OR UPDATE ON <<TYPE>>_options
        FOR EACH ROW EXECUTE FUNCTION generate_<<TYPE>>_option_path();

        -- VALUES

        DROP FUNCTION IF EXISTS generate_<<TYPE>>_option_value_path;

        CREATE OR REPLACE FUNCTION gc_protected.generate_<<TYPE>>_option_value_path()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.option_name := subpath(
                COALESCE(
                    NEW.parent_<<TYPE>>_option_path,
                    OLD.parent_<<TYPE>>_option_path
                ),
                -1
            )::TEXT::OPTION_NAME;

            NEW.path := COALESCE(
                NEW.parent_<<TYPE>>_option_path,
                OLD.parent_<<TYPE>>_option_path
            ) || COALESCE(
                NEW.name,
                OLD.name
            )::TEXT;

            NEW.system_id := subltree(NEW.path, 0, 1)::TEXT::INTEGER;

            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER generate_<<TYPE>>_option_value_path
        BEFORE INSERT OR UPDATE ON <<TYPE>>_option_values
        FOR EACH ROW EXECUTE FUNCTION generate_<<TYPE>>_option_value_path();

    <<END ONLY>>

    -- TYPES

    <<ONLY TYPE (detail, configuration, part)>>

        DROP FUNCTION IF EXISTS generate_<<PARENT>>_<<TYPE>>_path;

        CREATE OR REPLACE FUNCTION gc_protected.generate_<<PARENT>>_<<TYPE>>_path()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.path := COALESCE(
                NEW.parent_<<PARENT>>_option_value_path,
                <<ONLY TYPE (configuration, part)>>
                    NEW.parent_<<GRANDPARENT>>_<<PARENT>>_path,
                    OLD.parent_<<GRANDPARENT>>_<<PARENT>>_path,
                <<END ONLY>>
                OLD.parent_<<PARENT>>_option_value_path
            ) || (
            <<PREFIX>>
            <<ONLY TYPE (part)>>
                || COALESCE(NEW.id, OLD.id) || '__'
            <<END ONLY>>
            ) ||
            COALESCE(
                NEW.<<TYPE>>_<<TYPE_SUFFIX>>,
                OLD.<<TYPE>>_<<TYPE_SUFFIX>>
            )::TEXT;

            NEW.system_id := subltree(NEW.path, 0, 1)::TEXT::INTEGER;

            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER generate_<<PARENT>>_<<TYPE>>_path
        BEFORE INSERT OR UPDATE ON <<PARENT>>_<<TYPE>>s
        FOR EACH ROW EXECUTE FUNCTION generate_<<PARENT>>_<<TYPE>>_path();
    
    <<END ONLY>>

<<END LOOP>>
