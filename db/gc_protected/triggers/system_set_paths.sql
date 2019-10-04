
-- OPTION GROUP VALUES

CREATE OR REPLACE FUNCTION generate_system_set_option_group_value_path()
RETURNS TRIGGER AS $$
DECLARE
BEGIN

    SELECT system_option_value_path FROM system_sets ss
    INTO NEW.system_set_system_option_value_path
    WHERE ss.id = COALESCE(NEW.system_set_id, OLD.system_set_id);

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_system_set_option_group_value_path
BEFORE INSERT OR UPDATE ON system_set_option_group_values
FOR EACH ROW EXECUTE FUNCTION generate_system_set_option_group_value_path();



-- DETAIL OPTION VALUES

DROP FUNCTION IF EXISTS generate_system_set_detail_option_value_path;

CREATE OR REPLACE FUNCTION gc_protected.generate_system_set_detail_option_value_path()
RETURNS TRIGGER AS $$
BEGIN

    SELECT system_option_value_path FROM system_sets ss
    INTO NEW.system_option_value_path
    WHERE ss.id = COALESCE(NEW.system_set_id, OLD.system_set_id);


    IF NEW.system_option_value_path IS NULL THEN

        RAISE EXCEPTION 'Cannot create system set detail option value because the system set system option value is not an ancestor of %', NEW.detail_option_value_path;

    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_system_set_detail_option_value_path
BEFORE INSERT OR UPDATE ON system_set_detail_option_values
FOR EACH ROW EXECUTE FUNCTION generate_system_set_detail_option_value_path();

-- CONFIGURATION OPTION VALUES

CREATE OR REPLACE FUNCTION gc_protected.generate_system_set_configuration_option_value_path()
RETURNS TRIGGER AS $$
DECLARE
BEGIN

    SELECT detail_option_value_path FROM system_set_detail_option_values ssdov
    INTO NEW.detail_option_value_path
    WHERE ssdov.system_set_id = COALESCE(NEW.system_set_id, OLD.system_set_id)
    AND ssdov.detail_option_value_path @> COALESCE(
        NEW.configuration_option_value_path,
        OLD.configuration_option_value_path
    );

    IF NEW.detail_option_value_path IS NULL THEN

        RAISE EXCEPTION 'Cannot create system set configuration option value because there is no system set detail option value ancestor of %', NEW.configuration_option_value_path;

    END IF;

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_system_set_configuration_option_value_path
BEFORE INSERT OR UPDATE ON system_set_configuration_option_values
FOR EACH ROW EXECUTE FUNCTION generate_system_set_configuration_option_value_path();
