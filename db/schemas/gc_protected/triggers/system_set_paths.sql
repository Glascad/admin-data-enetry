
<<LOOP
    TYPE (detail, configuration)
    PARENT (system, detail)
>>

    DROP FUNCTION IF EXISTS generate_system_set_<<TYPE>>_option_value_path;

    CREATE OR REPLACE FUNCTION gc_protected.generate_system_set_<<TYPE>>_option_value_path()
    RETURNS TRIGGER AS $$
    BEGIN

        
        NEW.<<PARENT>>_option_value_path := get_<<PARENT>>_option_value_subpath(COALESCE(
            NEW.<<TYPE>>_option_value_path,
            OLD.<<TYPE>>_option_value_path
        ));

        RETURN NEW;

    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER generate_system_set_<<TYPE>>_option_value_path
    BEFORE INSERT OR UPDATE ON system_set_<<TYPE>>_option_values
    FOR EACH ROW EXECUTE FUNCTION generate_system_set_<<TYPE>>_option_value_path();

<<END LOOP>>
