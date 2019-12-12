
-- SS - SOV
-- SSD - SD/DOV
-- SSC - DC/COV

<<LOOP
    CHILD (detail, configuration, part)
    TYPE (system, detail, configuration)
    PARENT (NULL, system, detail)
    GRANDPARENT (NULL, NULL, system)
>>

    DROP FUNCTION IF EXISTS check_system_set_terminal_<<TYPE>>;

    CREATE OR REPLACE FUNCTION check_system_set_terminal_<<TYPE>>()
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
                NEW.<<PARENT>>_<<TYPE>>_path,
                OLD.<<PARENT>>_<<TYPE>>_path
            );
        <<END ONLY>>
        ovp LTREE := COALESCE(
            NEW.<<TYPE>>_option_value_path,
            OLD.<<TYPE>>_option_value_path
        );
        extra_option LTREE;
    BEGIN

        SELECT path FROM <<TYPE>>_options o
        INTO extra_option
        <<ONLY TYPE (system)>>
            WHERE o.system_id = sid
        <<END ONLY>>
        <<ONLY TYPE (detail, configuration)>>
            WHERE o.parent_<<PARENT>>_<<TYPE>>_path = t
        <<END ONLY>>
        AND CASE WHEN ovp IS NULL THEN
            o.parent_<<TYPE>>_option_value_path IS NULL
        ELSE
            o.parent_<<TYPE>>_option_value_path = ovp
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

    CREATE TRIGGER check_system_set_terminal_<<TYPE>>
    BEFORE INSERT OR UPDATE OF
        <<ONLY TYPE (system)>>
            system_id,
        <<END ONLY>>
        <<ONLY TYPE (detail, configuration)>>
            <<PARENT>>_<<TYPE>>_path,
        <<END ONLY>>
        <<TYPE>>_option_value_path ON system_set<<ONLY TYPE (detail, configuration)>>_<<TYPE>><<END ONLY>>s
    FOR EACH ROW EXECUTE FUNCTION check_system_set_terminal_<<TYPE>>();

<<END LOOP>>
