
CREATE OR REPLACE FUNCTION gc_protected.check_option_groups()
RETURNS TRIGGER AS $$
DECLARE
    new_path LTREE;
    new_name OPTION_NAME;
BEGIN

    IF NEW.system_option_value_path IS NOT NULL OR NEW.name IS NOT NULL THEN

        new_path := COALESCE(NEW.system_option_value_path, OLD.system_option_value_path);
        new_name := COALESCE(NEW.name, OLD.name);

        IF EXISTS (
            SELECT * FROM option_groups og
            WHERE og.name = new_name
            AND (
                og.system_option_value_path @> new_path
                OR
                og.system_option_value_path <@ new_path
            )
        ) THEN

            RAISE EXCEPTION 'Cannot create duplicate option group with path %, and name %', new_path, new_name;

        END IF;

    END IF;

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_option_groups
BEFORE INSERT OR UPDATE ON option_groups
FOR EACH ROW EXECUTE FUNCTION gc_protected.check_option_groups();
