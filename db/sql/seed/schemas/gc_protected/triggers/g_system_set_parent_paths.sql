
<<LOOP
    TYPE (detail, configuration)
    PARENT (system, detail)
    GRANDPARENT (NULL, system)
>>

    DROP FUNCTION IF EXISTS generate_system_set_<<TYPE>>_parent_path;

    CREATE OR REPLACE FUNCTION gc_protected.generate_system_set_<<TYPE>>_parent_path()
    RETURNS TRIGGER AS $$
    DECLARE
        parent_ov LTREE;
        <<ONLY TYPE (configuration)>>
            parent_type LTREE;
        <<END ONLY>>
    BEGIN

        -- IF NEW.parent_<<PARENT>>_option_value_path IS NOT NULL THEN
        --     RAISE EXCEPTION 'Cannot directly update generated column: system_set_<<TYPE>>_option.parent_<<PARENT>>_option_value_path. Received %', NEW.parent_<<PARENT>>_option_value_path;
        -- END IF;

        parent_ov := get_<<PARENT>>_option_value_subpath(
            COALESCE(
                NEW.<<PARENT>>_<<TYPE>>_path,
                NEW.<<TYPE>>_option_value_path,
                OLD.<<PARENT>>_<<TYPE>>_path,
                OLD.<<TYPE>>_option_value_path
            )
        );

        <<ONLY TYPE (detail)>>

            NEW.parent_<<PARENT>>_option_value_path := parent_ov;

        <<END ONLY>>

        <<ONLY TYPE (configuration)>>

            -- IF NEW.parent_<<GRANDPARENT>>_<<PARENT>>_path IS NOT NULL THEN
            --     RAISE EXCEPTION 'Cannot directly update generated column: system_set_<<TYPE>>_option.parent_<<GRANDPARENT>>_<<PARENT>>_path. Received %', NEW.parent_<<GRANDPARENT>>_<<PARENT>>_path;
            -- END IF;

            parent_type := get_<<GRANDPARENT>>_<<PARENT>>_subpath(
                COALESCE(
                    NEW.<<PARENT>>_<<TYPE>>_path,
                    NEW.<<TYPE>>_option_value_path,
                    OLD.<<PARENT>>_<<TYPE>>_path,
                    OLD.<<TYPE>>_option_value_path
                )
            );

            -- if there are no values after the type in the path
            IF parent_type = parent_ov THEN

                NEW.parent_<<GRANDPARENT>>_<<PARENT>>_path := parent_type;

            ELSE

                NEW.parent_<<PARENT>>_option_value_path := parent_ov;

            END IF;

        <<END ONLY>>

        RETURN NEW;

    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER generate_system_set_<<TYPE>>_parent_path
    BEFORE INSERT OR UPDATE ON system_set_<<TYPE>>s
    FOR EACH ROW EXECUTE FUNCTION generate_system_set_<<TYPE>>_parent_path();

<<END LOOP>>
