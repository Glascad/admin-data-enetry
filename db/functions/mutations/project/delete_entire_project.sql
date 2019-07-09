DROP FUNCTION IF EXISTS delete_entire_project;

CREATE OR REPLACE FUNCTION delete_entire_project(project_id INTEGER)
RETURNS INTEGER AS $$
DECLARE
    cuid INTEGER;
    pid ALIAS FOR project_id;
    e elevations%ROWTYPE;
    ___ INTEGER;
BEGIN
    cuid := get_current_user_id();
    IF pid NOT IN (
        SELECT id FROM projects
        WHERE owner_id = cuid
    )
    THEN RAISE EXCEPTION 'Project does not belong to user: %', cuid;
    ELSE
        FOR e IN (
            SELECT * FROM elevations
            WHERE project_id = pid
        ) LOOP
            ___ := delete_entire_elevation(e.id);
        END LOOP;
    END IF;
    RETURN project_id;
END;
$$ LANGUAGE plpgsql;
