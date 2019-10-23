
<<LOOP
    TYPE (detail, configuration)
>>

    CREATE OR REPLACE FUNCTION gc_data.create_or_update_or_delete_system_set_<<TYPE>>_option_value(
        <<TYPE>>_type ENTIRE_SYSTEM_SET_NODE,
        system_set SYSTEM_SETS
    ) RETURNS SYSTEM_SET_<<TYPE>>_OPTION_VALUES AS $$
    DECLARE
        sn ALIAS FOR <<TYPE>>_type;
        ss ALIAS FOR system_set;
        ov SYSTEM_SET_<<TYPE>>_OPTION_VALUES;
    BEGIN

        -- update
        IF sn.new_path IS NOT NULL AND sn.old_path IS NOT NULL THEN

            UPDATE system_set_<<TYPE>>_option_values ssovs SET
                <<TYPE>>_option_value_path = sn.new_path
            WHERE ssovs.system_set_id = ss.id
            AND ssovs.<<TYPE>>_option_value_path = sn.old_path
            RETURNING * INTO ov;

        -- create
        ELSIF sn.new_path IS NOT NULL THEN

            INSERT INTO system_set_<<TYPE>>_option_values (
                system_set_id,
                <<TYPE>>_option_value_path
            ) VALUES (
                uss.id,
                sn.new_path
            )
            RETURNING * INTO ov;

        -- delete
        ELSIF sn.old_path IS NOT NULL THEN

            DELETE FROM system_set_<<TYPE>>_option_values ssov
            WHERE ssov.<<TYPE>>_option_value_path = sn.old_path
            RETURNING * INTO ov;

        -- otherwise
        ELSE

            RAISE EXCEPTION 'Must provide either `old_path` or `new_path` or both to create_or_update_or_delete_system_set_<<TYPE>>_option_value';

        END IF;

        RETURN ov;

    END;
    $$ LANGUAGE plpgsql;

<<END LOOP>>
