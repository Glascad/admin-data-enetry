DROP FUNCTION IF EXISTS update_password;

CREATE OR REPLACE FUNCTION gc_private.update_password(
    username TEXT,
    old_password TEXT,
    new_password TEXT
) RETURNS JWT AS $$
DECLARE
    un ALIAS FOR username;
    opw ALIAS FOR old_password;
    npw ALIAS FOR new_password;
    jwt JWT;
BEGIN

    IF authenticate(un, opw) IS NOT NULL THEN
        UPDATE users
        SET password_hash = CRYPT(npw, GEN_SALT('md5'))
        WHERE users.username = un;
    ELSE RETURN NULL;
    END IF;

    RETURN authenticate(un, npw);

END;
$$ LANGUAGE plpgsql;
