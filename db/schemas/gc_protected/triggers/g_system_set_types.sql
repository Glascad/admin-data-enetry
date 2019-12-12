
<<LOOP
    TYPE (detail, configuration)
    PARENT (system, detail)
>>

    DROP FUNCTION IF EXISTS generate_system_set_<<TYPE>>_type;

    CREATE OR REPLACE FUNCTION gc_protected.generate_system_set_<<TYPE>>_type()
    RETURNS TRIGGER AS $$
    BEGIN

        NEW.<<TYPE>>_type := get_<<TYPE>>_type_from_path(
            COALESCE(
                NEW.<<PARENT>>_<<TYPE>>_path,
                NEW.<<TYPE>>_option_value_path,
                OLD.<<PARENT>>_<<TYPE>>_path,
                OLD.<<TYPE>>_option_value_path
            )
        );

        <<ONLY TYPE (configuration)>>

            NEW.<<PARENT>>_type := get_<<PARENT>>_type_from_path(
                COALESCE(
                    NEW.<<PARENT>>_<<TYPE>>_path,
                    NEW.<<TYPE>>_option_value_path,
                    OLD.<<PARENT>>_<<TYPE>>_path,
                    OLD.<<TYPE>>_option_value_path
                )
            );

        <<END ONLY>>

        RETURN NEW;

    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER generate_system_set_<<TYPE>>_type
    BEFORE INSERT OR UPDATE ON system_set_<<TYPE>>s
    FOR EACH ROW EXECUTE FUNCTION generate_system_set_<<TYPE>>_type();

<<END LOOP>>
