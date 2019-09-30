
-- update values when an option is added to a group

CREATE OR REPLACE FUNCTION gc_protected.check_option_group_values()
RETURNS TRIGGER AS $$
DECLARE
    doid INTEGER := COALESCE(NEW.id, OLD.id);
    ogid INTEGER := NEW.option_group_id;
    -- other option id
    odoid INTEGER;
    dovs OPTION_VALUE_NAME[];
    odovs OPTION_VALUE_NAME[];
    missing OPTION_VALUE_NAME;
    extra OPTION_VALUE_NAME;
BEGIN

    IF ogid IS NOT NULL THEN

        -- get another option that matches the same group
        SELECT _do.id FROM detail_options _do
        INTO odoid
        WHERE _do.option_group_id = ogid
        AND _do.id <> doid
        LIMIT 1;

        IF odoid IS NOT NULL THEN

            -- get values of current option
            SELECT ARRAY_AGG(name ORDER BY name) FROM detail_option_values sov
            INTO dovs
            WHERE sov.parent_detail_option_id = doid;

            -- get values of other option
            SELECT ARRAY_AGG(name ORDER BY name) FROM detail_option_values sov
            INTO odovs
            WHERE sov.parent_detail_option_id = odoid;

            IF dovs <> odovs THEN

                -- get extra option value name
                SELECT vn FROM UNNEST(dovs) vn
                INTO extra
                WHERE vn NOT IN (
                    SELECT ovn FROM UNNEST(odovs) ovn
                )
                LIMIT 1;

                -- get missing option value name
                SELECT ovn FROM UNNEST(odovs) ovn
                INTO missing
                WHERE ovn NOT IN (
                    SELECT vn FROM UNNEST(dovs) vn
                )
                LIMIT 1;

                IF extra IS NOT NULL THEN
                    RAISE EXCEPTION 'Detail option % cannot be added to option group % because it contains an extra value %', doid, ogid, extra;
                END IF;

                IF missing IS NOT NULL THEN
                    RAISE EXCEPTION 'Detail option % cannot be added to option group % because it is missing value %', doid, ogid, missing;
                END IF;

            END IF;

        END IF;

    END IF;

END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION gc_protected.update_detail_option_group_values()
RETURNS TRIGGER AS $$
DECLARE
BEGIN

    IF ogid THEN

        UPDATE detail_option_values sov SET
            option_group_id = ogid
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
