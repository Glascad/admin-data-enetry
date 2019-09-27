
-- update values when an option is added to a group

CREATE OR REPLACE FUNCTION gc_protected.check_system_option_group_values()
RETURNS TRIGGER AS $$
BEGIN

    IF NEW.option_group_id THEN

        IF EXISTS (
            SELECT * FROM system_options so
            WHERE so.option_group_id = NEW.option_group_id
            -- SELECT * FROM system_option_values sov
            -- WHERE sov.parent_system_option_path = COALESCE(
            --     NEW.path,
            --     OLD.path
            -- )
        ) THEN

            -- compare all option values against other item to make sure they all match
            -- meaning, all values present under one option are present under the other

        END IF;

    END IF;

END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION gc_protected.update_system_option_group_values()
RETURNS TRIGGER AS $$
DECLARE
BEGIN

    IF NEW.option_group_id THEN

        UPDATE system_option_values sov SET
            option_group_id = NEW.option_group_id
        WHERE sov.parent_system_option_path = COALESCE(
            NEW.path,
            OLD.path
        );

    END IF;

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_system_option_group_values
AFTER UPDATE ON system_options
FOR EACH ROW EXECUTE FUNCTION update_system_option_group_values();



CREATE OR REPLACE FUNCTION gc_protected.check_detail_option_group_values()
RETURNS TRIGGER AS $$
BEGIN

    IF NEW.option_group_id THEN

        IF EXISTS (
            SELECT * FROM detail_options _do
            WHERE _do.option_group_id = NEW.option_group_id
            -- SELECT * FROM detail_option_values dov
            -- WHERE dov.parent_detail_option_path = COALESCE(
            --     NEW.path,
            --     OLD.path
            -- )
        ) THEN

            -- compare all option values against other item to make sure they all match
            -- meaning, all values present under one option are present under the other

        END IF;

    END IF;

END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION gc_protected.update_detail_option_group_values()
RETURNS TRIGGER AS $$
DECLARE
BEGIN

    IF NEW.option_group_id THEN

        UPDATE detail_option_values sov SET
            option_group_id = NEW.option_group_id
        WHERE sov.parent_detail_option_path = COALESCE(
            NEW.path,
            OLD.path
        );

    END IF;

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_detail_option_group_values
AFTER UPDATE ON detail_options
FOR EACH ROW EXECUTE FUNCTION update_detail_option_group_values();



CREATE OR REPLACE FUNCTION gc_protected.check_configuration_option_group_values()
RETURNS TRIGGER AS $$
BEGIN

    IF NEW.option_group_id THEN

        IF EXISTS (
            SELECT * FROM configuration_options co
            WHERE co.option_group_id = NEW.option_group_id
            -- SELECT * FROM configuration_option_values cov
            -- WHERE cov.parent_configuration_option_path = COALESCE(
            --     NEW.option_path,
            --     OLD.path
            -- )
        ) THEN

            -- compare all option values against other item to make sure they all match
            -- meaning, all values present under one option are present under the other

        END IF;

    END IF;

END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION gc_protected.update_configuration_option_group_values()
RETURNS TRIGGER AS $$
DECLARE
BEGIN

    IF NEW.option_group_id THEN

        UPDATE configuration_option_values sov SET
            option_group_id = NEW.option_group_id
        WHERE sov.parent_configuration_option_path = COALESCE(
            NEW.path,
            OLD.path
        );

    END IF;

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_configuration_option_group_values
AFTER UPDATE ON configuration_options
FOR EACH ROW EXECUTE FUNCTION update_configuration_option_group_values();



-- add option group to value on create or update when added to an option within a group

CREATE OR REPLACE FUNCTION gc_protected.add_system_option_value_group()
RETURNS TRIGGER AS $$
BEGIN

    SELECT option_group_id FROM system_options so
    INTO NEW.option_group_id
    WHERE so.path = COALESCE(
        NEW.parent_system_option_path,
        OLD.parent_system_option_path
    );

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER add_system_option_value_group
BEFORE INSERT OR UPDATE ON system_option_values
FOR EACH ROW EXECUTE FUNCTION add_system_option_value_group();



CREATE OR REPLACE FUNCTION gc_protected.add_detail_option_value_group()
RETURNS TRIGGER AS $$
BEGIN

    SELECT option_group_id FROM detail_options _do
    INTO NEW.option_group_id
    WHERE _do.path = COALESCE(
        NEW.parent_detail_option_path,
        OLD.parent_detail_option_path
    );

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER add_detail_option_value_group
BEFORE INSERT OR UPDATE ON detail_option_values
FOR EACH ROW EXECUTE FUNCTION add_detail_option_value_group();



CREATE OR REPLACE FUNCTION gc_protected.add_configuration_option_value_group()
RETURNS TRIGGER AS $$
BEGIN

    SELECT option_group_id FROM configuration_options co
    INTO NEW.option_group_id
    WHERE co.path = COALESCE(
        NEW.parent_configuration_option_path,
        OLD.parent_configuration_option_path
    );

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER add_configuration_option_value_group
BEFORE INSERT OR UPDATE ON configuration_option_values
FOR EACH ROW EXECUTE FUNCTION add_configuration_option_value_group();
