
<<LOOP
    FULL (<<PARENT>>_<<TYPE>>, <<PARENT>>_<<TYPE>>, <<PARENT>>_<<TYPE>>)
    TYPE (detail, configuration, part)
    PARENT (system, detail, configuration)
>>

    -- CREATE

    DROP FUNCTION IF EXISTS create_entire_<<FULL>>;

    CREATE OR REPLACE FUNCTION gc_protected.create_entire_<<FULL>>(
        <<FULL>> NEW_<<FULL>>,
        system SYSTEMS
    ) RETURNS <<FULL>>S AS $$
    DECLARE
        t ALIAS FOR <<FULL>>;
        s ALIAS FOR system;
        ust <<FULL>>s%ROWTYPE;
    BEGIN

        INSERT INTO <<FULL>>s (
            system_id,
            <<ONLY TYPE (detail, configuration)>>
                <<TYPE>>_type,
            <<END ONLY>>
            <<ONLY TYPE (part)>>
                transform,
                part_id,
                part_orientation,
                extra_part_path_id,
                extra_part_path_orientation,
            <<END ONLY>>
            parent_<<PARENT>>_option_value_path
        ) VALUES (
            s.id,
            <<ONLY TYPE (detail, configuration)>>
                t.<<TYPE>>_type,
            <<END ONLY>>
            <<ONLY TYPE (part)>>
                t.transform,
                t.part_id,
                t.part_orientation,
                t.extra_part_path_id,
                t.extra_part_path_orientation,
            <<END ONLY>>
            t.parent_<<PARENT>>_option_value_path
        )
        RETURNING * INTO ust;

        RETURN ust;

    END;
    $$ LANGUAGE plpgsql;



    -- UPDATE

    DROP FUNCTION IF EXISTS update_entire_<<FULL>>;

    CREATE OR REPLACE FUNCTION gc_protected.update_entire_<<FULL>>(
        <<FULL>> ENTIRE_<<FULL>>,
        system SYSTEMS
    ) RETURNS <<FULL>>S AS $$
    DECLARE
        t ALIAS FOR <<FULL>>;
        s ALIAS FOR system;
        u NEW_<<FULL>>;
        ust <<FULL>>s%ROWTYPE;
    BEGIN

        u := t.update;

        IF t.path IS NULL OR u IS NULL THEN 
            RAISE EXCEPTION 'Must specify both `path` and `update` on <<PARENT>> <<TYPE>>, received path: % and update: %', t.path, (
                CASE WHEN u IS NULL THEN NULL
                ELSE '[update]' END
            );
        END IF;

        UPDATE <<FULL>>s ts SET
            <<TYPE>>_type = COALESCE(
                u.<<TYPE>>_type,
                ts.<<TYPE>>_type
            ),
            parent_<<PARENT>>_option_value_path = COALESCE(
                u.parent_<<PARENT>>_option_value_path,
                ts.parent_<<PARENT>>_option_value_path
            )
        WHERE ts.path = t.path
        RETURNING * INTO ust;

        IF ust IS NULL THEN
            RAISE EXCEPTION 'Cannot update <<PARENT>> <<TYPE>>, cannot find path %', t.path::TEXT;
        END IF;

        RETURN ust;

    END;
    $$ LANGUAGE plpgsql;

<<END LOOP>>
