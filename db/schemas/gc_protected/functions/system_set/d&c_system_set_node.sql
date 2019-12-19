
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
        sst SYSTEM_SET_<<TYPE>>S;
        ptp LTREE;
        tovp LTREE;
    BEGIN

        ptp := t.<<PARENT>>_<<TYPE>>_path;
        tovp := t.<<TYPE>>_option_value_path;

        IF ptp IS NULL AND tovp IS NULL THEN

            RAISE EXCEPTION 'Must provide either <<PARENT>>_<<TYPE>>_path or <<TYPE>>_option_value_path';

        END IF;

        DELETE FROM system_set_<<TYPE>>s ssovs
        WHERE ssovs.system_set_id = ss.id
        AND detail_type = get_detail_type_from_path(COALESCE(ptp, tovp))
        <<ONLY TYPE (configuration)>>
            AND configuration_type = get_configuration_type_from_path(COALESCE(ptp, tovp))
        <<END ONLY>>;

        INSERT INTO system_set_<<TYPE>>s (
            system_set_id,
            <<TYPE>>_option_value_path,
            <<PARENT>>_<<TYPE>>_path
        ) VALUES (
            ss.id,
            t.<<TYPE>>_option_value_path,
            t.<<PARENT>>_<<TYPE>>_path
        )
        RETURNING * INTO sst;

        RETURN sst;

    END;
    $$ LANGUAGE plpgsql;

<<END LOOP>>
