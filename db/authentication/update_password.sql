DROP FUNCTION IF EXISTS update_password;

CREATE OR REPLACE FUNCTION update_password(
    username TEXT,
    old_password TEXT,
    new_password TEXT
) RETURNS users.JWT AS $$
DECLARE
    un ALIAS FOR username;
    opw ALIAS FOR old_password;
    npw ALIAS FOR new_password;
    jwt users.JWT;
BEGIN

    IF authenticate(un, opw) IS NOT NULL THEN
        UPDATE users.users
        SET password_hash = CRYPT(npw, GEN_SALT('md5'))
        WHERE users.users.username = un;
    ELSE RETURN NULL;
    END IF;

    RETURN authenticate(un, npw);

END;
$$ LANGUAGE plpgsql;
