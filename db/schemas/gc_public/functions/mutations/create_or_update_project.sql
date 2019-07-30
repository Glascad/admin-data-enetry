DROP FUNCTION IF EXISTS create_or_update_project;

CREATE OR REPLACE FUNCTION gc_public.create_or_update_project(
    project_update ENTIRE_PROJECT,
    OUT project PROJECTS
)
RETURNS projects AS $$
DECLARE
    pu ALIAS FOR project_update;
    p ALIAS FOR project;
BEGIN
    IF pu.id IS NOT NULL THEN
        UPDATE projects SET
            name = CASE WHEN projects.name IS NOT NULL
                THEN projects.name
                ELSE pu.name END,
            default_elevation = CASE WHEN projects.default_elevation IS NOT NULL
                THEN projects.default_elevation
                ELSE pu.default_elevation END
        WHERE projects.id = pu.id
        AND projects.owner_id = get_current_user_id()
        RETURNING * INTO p;
    ELSE
        INSERT INTO projects (name, owner_id, default_elevation)
        VALUES (pu.name, get_current_user_id(), pu.default_elevation)
        RETURNING * INTO p;
    END IF;
END;
$$ LANGUAGE plpgsql VOLATILE;

ALTER FUNCTION gc_public.create_or_update_project OWNER TO gc_invoker;
