DROP FUNCTION IF EXISTS get_current_user;

CREATE OR REPLACE FUNCTION get_current_user()
RETURNS users.CURRENT_USER AS $$
DECLARE
    uid INTEGER;
    un TEXT;
BEGIN
    uid := get_current_user_id();

    SELECT username
    INTO un
    FROM users.users
    WHERE id = uid;

    RETURN ROW(
        uid,
        un
    )::users.CURRENT_USER;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;
