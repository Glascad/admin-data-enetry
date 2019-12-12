
-- OGVs
DROP FUNCTION IF EXISTS check_system_set_missing_option_group_values;

CREATE OR REPLACE FUNCTION gc_protected.check_system_set_missing_option_group_values()
RETURNS TRIGGER AS $$
DECLARE
    message TEXT := TG_ARGV[0];
    ssid INTEGER := COALESCE(NEW.system_id, OLD.system_id);
    sid INTEGER;
    ogv RECORD;
BEGIN

    SELECT system_id FROM system_sets ss
    INTO sid
    WHERE ss.id = ssid;

     FOR ogv IN (
        SELECT ssogvs.name AS selected_value, ogs.name AS option_name
        FROM option_groups ogs
        FULL OUTER JOIN system_set_option_group_values ssogvs
        ON ssogvs.system_id = ogs.system_id
        AND ssogvs.option_name = ogs.name
        WHERE ogs.system_id = ssid
    ) LOOP

        IF ogv.selected_value IS NULL THEN

            RAISE EXCEPTION '% for option group % in system set %', message, ogv.option_name, ssid;
        
        END IF;

    END LOOP;

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER check_system_set_missing_option_group_values
AFTER INSERT OR UPDATE OF system_id ON system_sets
INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION check_system_set_missing_option_group_values('Missing option group value');

CREATE CONSTRAINT TRIGGER cannot_delete_option_group_value
AFTER DELETE ON system_set_option_group_values
INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION check_system_set_missing_option_group_values('Cannot delete option group value');

-- SDs

-- required SSCs
