DROP FUNCTION IF EXISTS users.admin_only;

CREATE OR REPLACE FUNCTION users.admin_only()
RETURNS VOID AS $$
BEGIN
    IF NOT EXISTS (
        SELECT id FROM users.users
        WHERE id = get_current_user_id()
        AND role = 'admin'
    ) THEN
        RAISE EXCEPTION 'User % is not an admin', get_current_user_id();
    END IF;
END;
$$ LANGUAGE plpgsql STABLE;
