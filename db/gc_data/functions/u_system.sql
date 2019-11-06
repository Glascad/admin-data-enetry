DROP FUNCTION IF EXISTS update_entire_system;

CREATE OR REPLACE FUNCTION gc_data.update_entire_system (system ENTIRE_SYSTEM)
RETURNS SYSTEMS AS $$
DECLARE
    s ALIAS FOR system;
    us systems%ROWTYPE;
    real_id INTEGER;
    p LTREE;
    dp LTREE;
    deleted BOOLEAN;
    deleted_paths LTREE[];
    all_deleted_paths LTREE[];
    did INTEGER;
    deleted_ids INTEGER[];
    <<LOOP
        TYPE (
            CONFIGURATION_PART,
            CONFIGURATION_OPTION_VALUE,
            CONFIGURATION_OPTION,
            DETAIL_CONFIGURATION,
            DETAIL_OPTION_VALUE,
            DETAIL_OPTION,
            SYSTEM_DETAIL,
            SYSTEM_OPTION_VALUE,
            SYSTEM_OPTION
        )
        ALIAS (
            cp,
            cov,
            co,
            sc,
            dov,
            _do,
            sd,
            sov,
            so
        )
    >>
        <<ALIAS>> ENTIRE_<<TYPE>>;
        n<<ALIAS>> NEW_<<TYPE>>;
    <<END LOOP>>
    ___ INTEGER;
BEGIN

    SET search_path = gc_public,gc_data,gc_protected,gc_controlled,gc_utils,pg_temp_1,pg_toast,pg_toast_temp_1;

    SELECT * FROM create_or_update_system(s) INTO us;

    -- CREATE/DELETE OPTION GROUPS

    SELECT 1 FROM create_and_delete_option_groups(s, us) INTO ___;

    -- DELETE FIRST

    IF s.paths_to_delete IS NOT NULL THEN
        <<LOOP
            -- FROM BOTTOM UP
            TYPE (
                configuration_option_value,
                configuration_option,
                detail_configuration,
                detail_option_value,
                detail_option,
                system_detail,
                system_option_value,
                system_option
            )
        >>
            WITH deleted_items AS (
                DELETE FROM <<TYPE>>s t
                WHERE t.path <@ s.paths_to_delete
                AND t.system_id = us.id
                RETURNING *
            )
            SELECT ARRAY_AGG(path)
            FROM deleted_items
            INTO deleted_paths;

            -- ADD DELETED PATHS TO ARRAY
            all_deleted_paths := all_deleted_paths || deleted_paths;

        <<END LOOP>>

        IF ARRAY_LENGTH(s.paths_to_delete::TEXT[], 1) <> 0 AND all_deleted_paths IS NULL THEN
            RAISE EXCEPTION 'Could not delete any of paths %', s.paths_to_delete;
        ELSE
            -- THEN CHECK THAT ALL PATHS HAVE BEEN DELETED
            FOREACH p IN ARRAY s.paths_to_delete LOOP
                deleted := FALSE;

                FOREACH dp IN ARRAY all_deleted_paths LOOP
                    IF p = dp THEN
                        deleted := TRUE;
                    END IF;
                END LOOP;

                IF NOT deleted THEN
                    RAISE EXCEPTION 'Could not delete path %', p;
                END IF;
            END LOOP;
        END IF;

    END IF;

    IF s.configuration_part_ids_to_delete IS NOT NULL THEN

        WITH deleted_configuration_part_ids AS (
            DELETE FROM configuration_parts cps
            WHERE cps.id IN (
                SELECT * FROM UNNEST (s.configuration_part_ids_to_delete)
            )
            AND cps.system_id = s.id
            RETURNING id
        )
        SELECT ARRAY_AGG(id)
        FROM deleted_configuration_part_ids
        INTO deleted_ids;

        IF deleted_ids IS NULL THEN
            RAISE EXCEPTION 'Could not delete any configurations with ids %', s.configuration_part_ids_to_delete;
        ELSE
            FOREACH did IN ARRAY deleted_ids LOOP
                IF did NOT IN (
                    SELECT * FROM UNNEST(s.configuration_part_ids_to_delete)
                ) THEN
                    RAISE EXCEPTION 'Could not delete configuration part with id %', did;
                END IF;
            END LOOP;
        END IF;
    END IF;

    -- THEN UPDATE

    <<LOOP
        TYPE (
            configuration_part,
            configuration_option_value,
            configuration_option,
            detail_option_value,
            detail_option,
            system_detail,
            system_option_value,
            detail_configuration,
            system_option
        )
        ALIAS (
            cp,
            cov,
            co,
            dov,
            _do,
            sd,
            sov,
            sc,
            so
        )
    >>

        IF s.<<TYPE>>s IS NOT NULL THEN
            FOREACH <<ALIAS>> IN ARRAY s.<<TYPE>>s LOOP
                SELECT 1 FROM update_entire_<<TYPE>>(<<ALIAS>>, us) INTO ___;
            END LOOP;
        END IF;

    <<END LOOP>>

    -- THEN CREATE LAST

    <<LOOP
        TYPE (
            configuration_part,
            configuration_option_value,
            configuration_option,
            detail_configuration,
            detail_option_value,
            detail_option,
            system_detail,
            system_option_value,
            system_option
        )
        ALIAS (
            cp,
            cov,
            co,
            sc,
            dov,
            _do,
            sd,
            sov,
            so
        )
    >>

        IF s.new_<<TYPE>>s IS NOT NULL THEN
            FOREACH n<<ALIAS>> IN ARRAY s.new_<<TYPE>>s LOOP
                SELECT 1 FROM create_entire_<<TYPE>>(n<<ALIAS>>, us) INTO ___;
            END LOOP;
        END IF;

    <<END LOOP>>

    RETURN check_entire_system(us);

END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

ALTER FUNCTION gc_data.update_entire_system OWNER TO gc_invoker;
