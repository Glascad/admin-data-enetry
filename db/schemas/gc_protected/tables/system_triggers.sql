DROP FUNCTION IF EXISTS generate_system_option_path;
DROP FUNCTION IF EXISTS generate_system_option_value_path;
DROP FUNCTION IF EXISTS generate_system_detail_path;
DROP FUNCTION IF EXISTS generate_detail_option_path;
DROP FUNCTION IF EXISTS generate_detail_option_value_path;
DROP FUNCTION IF EXISTS generate_system_configuration_path;
DROP FUNCTION IF EXISTS generate_configuration_option_path;
DROP FUNCTION IF EXISTS generate_configuration_option_value_path;

CREATE OR REPLACE FUNCTION gc_protected.generate_system_option_path()
RETURNS TRIGGER AS $$
BEGIN
    NEW.path := COALESCE(
        NEW.parent_system_option_value_path,
        NEW.system_id::TEXT::LTREE,
        OLD.parent_system_option_value_path,
        OLD.system_id::TEXT::LTREE
    ) || COALESCE(
        NEW.name,
        OLD.name
    )::TEXT;

    NEW.system_id := subltree(NEW.path, 0, 1)::TEXT::INTEGER;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_system_option_path
BEFORE INSERT OR UPDATE ON system_options
FOR EACH ROW EXECUTE FUNCTION generate_system_option_path();

CREATE OR REPLACE FUNCTION gc_protected.generate_system_option_value_path()
RETURNS TRIGGER AS $$
BEGIN
    NEW.option_name := subpath(
        COALESCE(
            NEW.parent_system_option_path,
            OLD.parent_system_option_path
        ),
        -1
    )::TEXT::OPTION_NAME;

    -- RAISE EXCEPTION '`system_option_value`s `option_name` is %', NEW.option_name;

    NEW.path := COALESCE(
        NEW.parent_system_option_path,
        OLD.parent_system_option_path
    ) || COALESCE(
        NEW.name,
        OLD.name
    )::TEXT;

    NEW.system_id := subltree(NEW.path, 0, 1)::TEXT::INTEGER;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_system_option_value_path
BEFORE INSERT OR UPDATE ON system_option_values
FOR EACH ROW EXECUTE FUNCTION generate_system_option_value_path();

CREATE OR REPLACE FUNCTION gc_protected.generate_system_detail_path()
RETURNS TRIGGER AS $$
BEGIN
    NEW.path := COALESCE(
        NEW.parent_system_option_value_path,
        OLD.parent_system_option_value_path
    ) || COALESCE(
        NEW.detail_type,
        OLD.detail_type
    )::TEXT;

    NEW.system_id := subltree(NEW.path, 0, 1)::TEXT::INTEGER;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_system_detail_path
BEFORE INSERT OR UPDATE ON system_details
FOR EACH ROW EXECUTE FUNCTION generate_system_detail_path();

CREATE OR REPLACE FUNCTION gc_protected.generate_detail_option_path()
RETURNS TRIGGER AS $$
BEGIN
    NEW.path := COALESCE(
        NEW.parent_system_detail_path,
        NEW.parent_detail_option_value_path,
        OLD.parent_system_detail_path,
        OLD.parent_detail_option_value_path
    ) || COALESCE(
        NEW.name,
        OLD.name
    )::TEXT;

    NEW.system_id := subltree(NEW.path, 0, 1)::TEXT::INTEGER;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_detail_option_path
BEFORE INSERT OR UPDATE ON detail_options
FOR EACH ROW EXECUTE FUNCTION generate_detail_option_path();

CREATE OR REPLACE FUNCTION gc_protected.generate_detail_option_value_path()
RETURNS TRIGGER AS $$
BEGIN
    NEW.option_name := subpath(
        COALESCE(
            NEW.parent_detail_option_path,
            OLD.parent_detail_option_path
        ),
        -1
    )::TEXT::OPTION_NAME;

    NEW.path := COALESCE(
        NEW.parent_detail_option_path,
        OLD.parent_detail_option_path
    ) || COALESCE(
        NEW.name,
        OLD.name
    )::TEXT;

    NEW.system_id := subltree(NEW.path, 0, 1)::TEXT::INTEGER;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_detail_option_value_path
BEFORE INSERT OR UPDATE ON detail_option_values
FOR EACH ROW EXECUTE FUNCTION generate_detail_option_value_path();

CREATE OR REPLACE FUNCTION gc_protected.generate_system_configuration_path()
RETURNS TRIGGER AS $$
BEGIN
    NEW.path := COALESCE(
        NEW.parent_detail_option_value_path,
        OLD.parent_detail_option_value_path
    ) || COALESCE(
        NEW.configuration_type,
        OLD.configuration_type
    )::TEXT;

    NEW.system_id := subltree(NEW.path, 0, 1)::TEXT::INTEGER;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_system_configuration_path
BEFORE INSERT OR UPDATE ON system_configurations
FOR EACH ROW EXECUTE FUNCTION generate_system_configuration_path();

CREATE OR REPLACE FUNCTION gc_protected.generate_configuration_option_path()
RETURNS TRIGGER AS $$
BEGIN
    NEW.path := COALESCE(
        NEW.parent_system_configuration_path,
        NEW.parent_configuration_option_value_path,
        OLD.parent_system_configuration_path,
        OLD.parent_configuration_option_value_path
    ) || COALESCE(
        NEW.name,
        OLD.name
    )::TEXT;

    NEW.system_id := subltree(NEW.path, 0, 1)::TEXT::INTEGER;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_configuration_option_path
BEFORE INSERT OR UPDATE ON configuration_options
FOR EACH ROW EXECUTE FUNCTION generate_configuration_option_path();

CREATE OR REPLACE FUNCTION gc_protected.generate_configuration_option_value_path()
RETURNS TRIGGER AS $$
BEGIN
    NEW.option_name := subpath(
        COALESCE(
            NEW.parent_configuration_option_path,
            OLD.parent_configuration_option_path
        ),
        -1
    )::TEXT::OPTION_NAME;

    NEW.path := COALESCE(
        NEW.parent_configuration_option_path,
        OLD.parent_configuration_option_path
    ) || COALESCE(
        NEW.name,
        OLD.name
    )::TEXT;

    NEW.system_id := subltree(NEW.path, 0, 1)::TEXT::INTEGER;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_configuration_option_value_path
BEFORE INSERT OR UPDATE ON configuration_option_values
FOR EACH ROW EXECUTE FUNCTION generate_configuration_option_value_path();

