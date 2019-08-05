DROP FUNCTION IF EXISTS get_current_user;

CREATE OR REPLACE FUNCTION gc_public.get_current_user()
RETURNS gc_public.CURRENT_USER AS $$
DECLARE
    uid INTEGER;
    un TEXT;
    r TEXT;
    pid INTEGER;
BEGIN

    -- SET search_path = gc_public,gc_private,pg_temp_1,pg_toast,pg_toast_temp_1;

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

ALTER FUNCTION gc_public.get_current_user OWNER TO gc_invoker;
