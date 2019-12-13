
-- OGVs

DROP FUNCTION IF EXISTS check_system_set_missing_option_group_values;

CREATE OR REPLACE FUNCTION gc_protected.check_system_set_missing_option_group_values()
RETURNS TRIGGER AS $$
DECLARE
    message TEXT := TG_ARGV[0];
    ssid INTEGER;
    sid INTEGER;
    ogv RECORD;
BEGIN

    IF TG_TABLE_NAME = 'system_sets' THEN
        ssid := COALESCE(NEW.id, OLD.id);
    ELSE
        ssid := COALESCE(NEW.system_set_id, OLD.system_set_id);
    END IF;

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
DROP FUNCTION IF EXISTS check_system_set_missing_details;

CREATE OR REPLACE FUNCTION gc_protected.check_system_set_missing_details()
RETURNS TRIGGER AS $$
DECLARE
    message TEXT := TG_ARGV[0];
    ssid INTEGER;
    sid INTEGER;
    sovp LTREE;
    dt RECORD;
BEGIN


    IF TG_TABLE_NAME = 'system_sets' THEN
        ssid := COALESCE(NEW.id, OLD.id);
    ELSE
        ssid := COALESCE(NEW.system_set_id, OLD.system_set_id);
    END IF;

    SELECT system_id, system_option_value_path FROM system_sets ss
    INTO sid, sovp
    WHERE ss.id = ssid;

    FOR dt IN (
        SELECT ssds.detail_type AS selected_detail, sds.detail_type AS detail_type
        FROM system_details sds
        FULL OUTER JOIN system_set_details ssds
        ON ssds.detail_type = sds.detail_type
        WHERE sds.system_id = ssid
        AND sds.parent_system_option_value_path = sovp
    ) LOOP

        IF dt.selected_detail IS NULL THEN

            RAISE EXCEPTION '% for detail type % in system set %', message, dt.detail_type, ssid;
        
        END IF;

    END LOOP;

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER check_system_set_missing_details
AFTER INSERT OR UPDATE OF system_id, system_option_value_path ON system_sets
INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION check_system_set_missing_details('Missing detail');

CREATE CONSTRAINT TRIGGER cannot_delete_system_set_detail
AFTER DELETE ON system_set_details
INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION check_system_set_missing_details('Cannot delete detail');



-- required SSCs
DROP FUNCTION IF EXISTS check_system_set_missing_configurations;

CREATE OR REPLACE FUNCTION gc_protected.check_system_set_missing_configurations()
RETURNS TRIGGER AS $$
DECLARE
    message TEXT := TG_ARGV[0];
    ssid INTEGER := COALESCE(NEW.system_set_id, OLD.system_set_id);
    ptp LTREE;
    povp LTREE;
    sovp LTREE;
    ct RECORD;
BEGIN

    IF TG_TABLE_NAME = 'system_set_details' THEN

        ptp := COALESCE(NEW.system_detail_path, OLD.system_detail_path);
        povp := COALESCE(NEW.detail_option_value_path, OLD.detail_option_value_path);

    ELSE

        ptp := COALESCE(NEW.parent_system_detail_path, OLD.parent_system_detail_path);
        povp := COALESCE(NEW.parent_detail_option_value_path, OLD.parent_detail_option_value_path);

    END IF;

    FOR ct IN (
        SELECT sscs.configuration_type AS selected_configuration, dcs.configuration_type AS configuration_type
        FROM detail_configurations dcs
        FULL OUTER JOIN system_set_configurations sscs
        ON sscs.configuration_type = dcs.configuration_type
        AND sscs.detail_type = get_detail_type_from_path(dcs.path)
        WHERE (
            dcs.parent_system_detail_path = ptp
            OR
            dcs.parent_detail_option_value_path = povp
        )
        AND dcs.optional = FALSE
    ) LOOP

        IF ct.selected_configuration IS NULL THEN

            RAISE EXCEPTION '% for configuration type % in system set detail % in system set %', message, ct.configuration_type, COALESCE(ptp, povp), ssid;
        
        END IF;

    END LOOP;

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER check_system_set_missing_configurations
AFTER INSERT OR UPDATE OF system_detail_path, detail_option_value_path ON system_set_details
INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION check_system_set_missing_configurations('Missing configuration');

CREATE CONSTRAINT TRIGGER cannot_delete_system_set_configuration
AFTER DELETE ON system_set_configurations
INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION check_system_set_missing_configurations('Cannot delete configuration');
