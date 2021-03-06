
<<LOOP
    TYPE (system, detail, configuration)
    PARENT (NULL, system, detail)
    PREFIX (NULL, '__DT__', '__CT__')
>>

    -- OPTIONS

    DROP FUNCTION IF EXISTS generate_<<TYPE>>_option_path;

    CREATE OR REPLACE FUNCTION gc_protected.generate_<<TYPE>>_option_path()
    RETURNS TRIGGER AS $$
    BEGIN

        IF NEW.path IS NOT NULL AND NEW.path <> OLD.path THEN
            RAISE EXCEPTION 'Cannot directly update generated column: <<TYPE>>_option.path. Received %', NEW.path;
        END IF;

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

        NEW.system_id := COALESCE(
            NEW.system_id,
            OLD.system_id,
            subltree(NEW.path, 0, 1)::TEXT::INTEGER
        );

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

        IF NEW.option_name IS NOT NULL AND NEW.option_name <> OLD.option_name THEN
            RAISE EXCEPTION 'Cannot directly update generated column: <<TYPE>>_option_value.option_name. Received %', NEW.option_name;
        END IF;

        IF NEW.path IS NOT NULL AND NEW.path <> OLD.path THEN
            RAISE EXCEPTION 'Cannot directly update generated column: <<TYPE>>_option_value.path. Received %', NEW.path;
        END IF;

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

        NEW.system_id := COALESCE(
            NEW.system_id,
            OLD.system_id,
            subltree(NEW.path, 0, 1)::TEXT::INTEGER
        );

        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER generate_<<TYPE>>_option_value_path
    BEFORE INSERT OR UPDATE ON <<TYPE>>_option_values
    FOR EACH ROW EXECUTE FUNCTION generate_<<TYPE>>_option_value_path();

    -- TYPES

    <<ONLY TYPE (detail, configuration)>>

        DROP FUNCTION IF EXISTS generate_<<PARENT>>_<<TYPE>>_path;

        CREATE OR REPLACE FUNCTION gc_protected.generate_<<PARENT>>_<<TYPE>>_path()
        RETURNS TRIGGER AS $$
        BEGIN

            <<ONLY TYPE (configuration)>>
                IF COALESCE(
                    NEW.parent_detail_option_value_path,
                    OLD.parent_detail_option_value_path,
                    NEW.parent_system_detail_path,
                    OLD.parent_system_detail_path
                ) IS NULL THEN
                    RAISE EXCEPTION 'No parent path: %, %, %', COALESCE(NEW.system_id, OLD.system_id), COALESCE(NEW.configuration_type, OLD.configuration_type), COALESCE(NEW.optional, OLD.optional);
                END IF;
            <<END ONLY>>

            IF NEW.path IS NOT NULL AND NEW.path <> OLD.path THEN
                RAISE EXCEPTION 'Cannot directly update generated column: <<PARENT>>_<<TYPE>>.path. Received %', NEW.path;
            END IF;

            NEW.path := COALESCE(
                NEW.parent_<<PARENT>>_option_value_path,
                OLD.parent_<<PARENT>>_option_value_path,
                <<ONLY TYPE (detail)>>
                    NEW.system_id::TEXT::LTREE,
                    OLD.system_id::TEXT::LTREE,
                <<END ONLY>>
                <<ONLY TYPE (configuration)>>
                    NEW.parent_system_detail_path,
                    OLD.parent_system_detail_path,
                <<END ONLY>>
                NEW.system_id::TEXT::LTREE,
                OLD.system_id::TEXT::LTREE
            ) || <<PREFIX>> || COALESCE(
                NEW.<<TYPE>>_type,
                OLD.<<TYPE>>_type
            )::TEXT;

            NEW.system_id := COALESCE(
                NEW.system_id,
                OLD.system_id,
                subltree(NEW.path, 0, 1)::TEXT::INTEGER
            );

            IF NEW.path IS NULL THEN
                RAISE EXCEPTION '<<PARENT>> PATH IS NULL: %', COALESCE(
                    NEW.parent_<<PARENT>>_option_value_path,
                    OLD.parent_<<PARENT>>_option_value_path
                    <<ONLY TYPE (configuration)>>
                        , NEW.parent_system_detail_path
                    <<END ONLY>>
                );
            END IF;

            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER generate_<<PARENT>>_<<TYPE>>_path
        BEFORE INSERT OR UPDATE ON <<PARENT>>_<<TYPE>>s
        FOR EACH ROW EXECUTE FUNCTION generate_<<PARENT>>_<<TYPE>>_path();
    
    <<END ONLY>>

<<END LOOP>>
