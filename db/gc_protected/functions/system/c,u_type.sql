
<<LOOP
    FULL (<<PARENT>>_<<TYPE>>, <<PARENT>>_<<TYPE>>, <<PARENT>>_<<TYPE>>)
    GRANDFULL (<<GRANDPARENT>>_<<PARENT>>, <<GRANDPARENT>>_<<PARENT>>, <<GRANDPARENT>>_<<PARENT>>)
    TYPE (detail, configuration, part)
    PARENT (system, detail, configuration)
    GRANDPARENT (NULL, system, detail)
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

        IF s.id IS NULL THEN RAISE EXCEPTION 'System id is NULL in <<FULL>>';
        END IF;
        
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
            <<ONLY TYPE (configuration, part)>>
                , parent_<<GRANDFULL>>_path
            <<END ONLY>>
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
            prepend_system_id(s.id, t.parent_<<PARENT>>_option_value_path)
            <<ONLY TYPE (configuration, part)>>
                , prepend_system_id(s.id, t.parent_<<GRANDFULL>>_path)
            <<END ONLY>>
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

        <<ONLY TYPE (detail, configuration)>>
            IF t.path IS NULL OR u IS NULL THEN 
                RAISE EXCEPTION 'Must specify both `path` and `update` on <<PARENT>> <<TYPE>>, received path: % and update: %', t.path, (
                    CASE WHEN u IS NULL THEN NULL
                    ELSE '[update]' END
                );
            END IF;
        <<END ONLY>>

        UPDATE <<FULL>>s ts SET
            parent_<<PARENT>>_option_value_path = COALESCE(
                u.parent_<<PARENT>>_option_value_path,
                ts.parent_<<PARENT>>_option_value_path
            ),
            <<ONLY TYPE (configuration, part)>>
                parent_<<GRANDFULL>>_path = COALESCE(
                    u.parent_<<GRANDFULL>>_path,
                    ts.parent_<<GRANDFULL>>_path
                ),
            <<END ONLY>>
            <<ONLY TYPE (detail, configuration)>>
                <<TYPE>>_type = COALESCE(
                    u.<<TYPE>>_type,
                    ts.<<TYPE>>_type
                )
            <<END ONLY>>
            <<ONLY TYPE (part)>>
                transform = COALESCE(
                    u.transform,
                    ts.transform
                ),
                part_id = COALESCE(
                    u.part_id,
                    ts.part_id
                ),
                part_orientation = COALESCE(
                    u.part_orientation,
                    ts.part_orientation
                ),
                extra_part_path_id = COALESCE(
                    u.extra_part_path_id,
                    ts.extra_part_path_id
                ),
                extra_part_path_orientation = COALESCE(
                    u.extra_part_path_orientation,
                    ts.extra_part_path_orientation
                )
            <<END ONLY>>
        WHERE
            <<ONLY TYPE (detail, configuration)>>
                ts.path = t.path
            <<END ONLY>>
            <<ONLY TYPE (part)>>
                ts.id = t.id
            <<END ONLY>>
            AND ts.system_id = s.id
        RETURNING * INTO ust;

        IF ust IS NULL THEN
            RAISE EXCEPTION 'Cannot update <<PARENT>> <<TYPE>>, cannot find path %', t.path::TEXT;
        END IF;

        RETURN ust;

    END;
    $$ LANGUAGE plpgsql;

<<END LOOP>>
