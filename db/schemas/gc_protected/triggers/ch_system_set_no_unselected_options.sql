
-- SS - SOV
-- SSD - SD/DOV
-- SSC - DC/COV

<<LOOP
    TYPE (system, detail, configuration)
    PARENT_TYPE (NULL, system_detail, detail_configuration)
    OPTION_VALUE (system_option_value_path, detail_option_value_path, configuration_option_value_path)
    COLUMN_NAME (system_id, system_detail_path, detail_configuration_path)
    TABLE_NAME (system_sets, system_set_details, system_set_configurations)
>>

    DROP FUNCTION IF EXISTS check_system_set_no_unselected_<<TYPE>>_options;

    CREATE OR REPLACE FUNCTION gc_protected.check_system_set_no_unselected_<<TYPE>>_options()
    RETURNS TRIGGER AS $$
    DECLARE
        <<ONLY TYPE (system)>>
            sid INTEGER := COALESCE(
                NEW.system_id,
                OLD.system_id
            );
        <<END ONLY>>
        <<ONLY TYPE (detail, configuration)>>
            t LTREE := COALESCE(
                NEW.<<PARENT_TYPE>>_path,
                OLD.<<PARENT_TYPE>>_path
            );
        <<END ONLY>>
        ovp LTREE := COALESCE(
            NEW.<<OPTION_VALUE>>,
            OLD.<<OPTION_VALUE>>
        );
        extra_option LTREE;
    BEGIN

        SELECT path FROM <<TYPE>>_options o
        INTO extra_option
        <<ONLY TYPE (system)>>
            WHERE o.system_id = sid
        <<END ONLY>>
        <<ONLY TYPE (detail, configuration)>>
            WHERE o.parent_<<PARENT_TYPE>>_path = t
        <<END ONLY>>
        AND CASE WHEN ovp IS NULL THEN
            o.parent_<<OPTION_VALUE>> IS NULL
        ELSE
            o.parent_<<OPTION_VALUE>> = ovp
        END;

        IF extra_option IS NOT NULL THEN

            RAISE EXCEPTION 'Must select terminal <<TYPE>> node, but node % has another option beneath it: %',
            <<ONLY TYPE (system)>>
                COALESCE(ovp, sid::TEXT::LTREE),
            <<END ONLY>>
            <<ONLY TYPE (detail, configuration)>>
                COALESCE(ovp, t),
            <<END ONLY>>
            extra_option;

        END IF;

        RETURN NEW;

    END;
    $$ LANGUAGE plpgsql;

    CREATE CONSTRAINT TRIGGER check_system_set_no_unselected_<<TYPE>>_options
    AFTER INSERT OR UPDATE OF <<COLUMN_NAME>>, <<OPTION_VALUE>> ON <<TABLE_NAME>>
    FOR EACH ROW EXECUTE FUNCTION check_system_set_no_unselected_<<TYPE>>_options();

<<END LOOP>>
