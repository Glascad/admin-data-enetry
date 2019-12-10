
<<LOOP
    TYPE (detail, configuration)
    PARENT (system, detail)
>>

    CREATE OR REPLACE FUNCTION gc_data.create_or_update_or_delete_system_set_<<TYPE>>(
        system_set_<<TYPE>> ENTIRE_SYSTEM_SET_<<TYPE>>,
        system_set SYSTEM_SETS
    ) RETURNS SYSTEM_SET_<<TYPE>>S AS $$
    DECLARE
        t ALIAS FOR system_set_<<TYPE>>;
        ss ALIAS FOR system_set;
        ov SYSTEM_SET_<<TYPE>>S;
        op LTREE;
        np LTREE;
    BEGIN

        op := COALESCE(
            t.old_<<PARENT>>_<<TYPE>>_path,
            t.old_<<TYPE>>_option_value_path
        );

        np := COALESCE(
            t.new_<<PARENT>>_<<TYPE>>_path,
            t.new_<<TYPE>>_option_value_path
        );

        -- update
        IF op IS NOT NULL AND np IS NOT NULL THEN

            UPDATE system_set_<<TYPE>>s ssovs SET
                <<TYPE>>_option_value_path = t.new_<<TYPE>>_option_value_path,
                <<PARENT>>_<<TYPE>>_path = t.new_<<PARENT>>_<<TYPE>>_path
            WHERE ssovs.system_set_id = ss.id
            AND (
                ssovs.<<TYPE>>_option_value_path = t.old_<<TYPE>>_option_value_path
                OR
                ssovs.<<PARENT>>_<<TYPE>>_path = t.old_<<PARENT>>_<<TYPE>>_path
            )
            RETURNING * INTO ov;

        -- create
        ELSIF np IS NOT NULL THEN

            INSERT INTO system_set_<<TYPE>>s (
                system_set_id,
                <<TYPE>>_option_value_path,
                <<PARENT>>_<<TYPE>>_path
            ) VALUES (
                ss.id,
                t.new_<<TYPE>>_option_value_path,
                t.new_<<PARENT>>_<<TYPE>>_path
            )
            RETURNING * INTO ov;

        -- delete
        ELSIF t.old_path IS NOT NULL THEN

            DELETE FROM system_set_<<TYPE>>s ssov
            WHERE ssovs.system_set_id = ss.id
            AND (
                ssovs.<<TYPE>>_option_value_path = t.old_<<TYPE>>_option_value_path
                OR
                ssovs.<<PARENT>>_<<TYPE>>_path = t.old_<<PARENT>>_<<TYPE>>_path
            )
            RETURNING * INTO ov;

        -- otherwise
        ELSE

            RAISE EXCEPTION 'Must provide one or two of `t.old_<<PARENT>>_<<TYPE>>_path`, `t.old_<<TYPE>>_option_value_path`, `t.new_<<PARENT>>_<<TYPE>>_path`, `t.new_<<TYPE>>_option_value_path` to create_or_update_or_delete_system_set_<<TYPE>>_option_value';

        END IF;

        RETURN ov;

    END;
    $$ LANGUAGE plpgsql;

<<END LOOP>>
