DROP FUNCTION IF EXISTS create_a_user;

CREATE OR REPLACE FUNCTION gc_private.create_a_user(
    username VARCHAR(50),
    password VARCHAR(50),
    role GC_ROLE
) RETURNS JWT AS $$
DECLARE
    uid INTEGER;
    un ALIAS FOR username;
    pw ALIAS FOR password;
    r ALIAS FOR role;
    hash TEXT;
BEGIN

    SET search_path = gc_public,gc_private,pg_temp_1,pg_toast,pg_toast_temp_1;

    hash := CRYPT(pw, GEN_SALT('md5'));

    INSERT INTO users (
        username,
        password_hash,
        role
    ) VALUES (
        un,
        hash,
        r
    ) RETURNING id INTO uid;

    RETURN authenticate(un, pw);
END;
$$ LANGUAGE plpgsql STRICT SECURITY DEFINER;

ALTER FUNCTION gc_private.create_a_user OWNER TO gc_invoker;
