DROP FUNCTION IF EXISTS users.create_user;

CREATE OR REPLACE FUNCTION users.create_user(
    username VARCHAR(50),
    password VARCHAR(50)
) RETURNS users.JWT AS $$
DECLARE
    un ALIAS FOR username;
    pw ALIAS FOR password;
    hash TEXT;
BEGIN
    hash := CRYPT(pw, GEN_SALT('md5'));

    INSERT INTO users.users (
        username,
        password_hash
    ) VALUES (
        un,
        hash
    );

    RETURN public.authenticate(un, pw);
END;
$$ LANGUAGE plpgsql STRICT SECURITY DEFINER;
