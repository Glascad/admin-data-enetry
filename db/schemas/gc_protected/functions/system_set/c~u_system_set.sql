DROP FUNCTION IF EXISTS create_or_update_system_set;

CREATE OR REPLACE FUNCTION gc_public.create_or_update_system_set(system_set ENTIRE_SYSTEM_SET)
RETURNS SYSTEM_SETS AS $$
DECLARE
    ss ALIAS FOR system_set;
    uss system_sets%ROWTYPE;
BEGIN

    IF ss.id IS NULL THEN
        INSERT INTO system_sets (
            project_id,
            system_id,
            system_option_value_path,
            name
        ) VALUES (
            ss.project_id,
            ss.system_id,
            ss.system_option_value_path,
            ss.name
        )
        RETURNING * INTO uss;
    ELSE
        UPDATE system_sets SET
            system_id = COALESCE(
                ss.system_id,
                system_sets.system_id
            ),
            system_option_value_path = COALESCE(
                ss.system_option_value_path,
                system_sets.system_option_value_path
            ),
            name = COALESCE(
                ss.name,
                system_sets.name
            )
        WHERE id = ss.id
        RETURNING * INTO uss;
    END IF;

    RETURN uss;

END;
$$ LANGUAGE plpgsql;
