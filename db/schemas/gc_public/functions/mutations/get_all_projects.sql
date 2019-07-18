DROP FUNCTION IF EXISTS get_all_projects;

CREATE OR REPLACE FUNCTION get_all_projects()
RETURNS SETOF projects AS $$
BEGIN
    RETURN QUERY SELECT * FROM projects
        WHERE owner_id = get_current_user_id();
END;
$$ LANGUAGE plpgsql STABLE;
