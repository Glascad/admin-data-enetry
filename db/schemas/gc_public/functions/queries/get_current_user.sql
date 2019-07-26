DROP FUNCTION IF EXISTS get_current_user;

CREATE OR REPLACE FUNCTION gc_public.get_current_user()
RETURNS gc_public.CURRENT_USER AS $$
DECLARE
    uid INTEGER;
    un TEXT;
    r TEXT;
    pid INTEGER;
BEGIN
    SELECT id, username, role
    INTO uid, un, r
    FROM users
    WHERE id = get_current_user_id();

    SELECT id
    INTO pid
    FROM projects
    WHERE owner_id = uid;

    RETURN ROW(
        uid,
        un,
        r,
        pid
    )::gc_public.CURRENT_USER;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;
