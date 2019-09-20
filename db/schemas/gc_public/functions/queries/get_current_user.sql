DROP FUNCTION IF EXISTS get_current_user;

CREATE OR REPLACE FUNCTION gc_public.get_current_user()
RETURNS gc_controlled.current_user AS $$
DECLARE
    uid INTEGER;
    un TEXT;
    r TEXT;
    pid INTEGER;
BEGIN

    -- SET search_path = gc_public,gc_private,pg_temp_1,pg_toast,pg_toast_temp_1;

    SELECT id, username, role
    INTO uid, un, r
    FROM gc_private.users
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
    )::gc_controlled.current_user;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

ALTER FUNCTION gc_public.get_current_user OWNER TO gc_invoker;
