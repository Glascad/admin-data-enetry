DROP FUNCTION IF EXISTS get_current_user;

CREATE OR REPLACE FUNCTION get_current_user()
RETURNS users.CURRENT_USER AS $$
DECLARE
    uid INTEGER;
    un TEXT;
    r users.ROLE;
BEGIN
    SELECT id, username, role
    INTO uid, un, r
    FROM users.users
    WHERE id = get_current_user_id();

    RETURN ROW(
        uid,
        un,
        r
    )::users.CURRENT_USER;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;
