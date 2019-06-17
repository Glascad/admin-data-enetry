DROP FUNCTION IF EXISTS users.create_user;

CREATE OR REPLACE FUNCTION users.create_user(
    username VARCHAR(50),
    password VARCHAR(50),
    role users.ROLE
) RETURNS users.JWT AS $$
DECLARE
    un ALIAS FOR username;
    pw ALIAS FOR password;
    r ALIAS FOR role;
    hash TEXT;
BEGIN
    hash := CRYPT(pw, GEN_SALT('md5'));

    INSERT INTO users.users (
        username,
        password_hash,
        role
    ) VALUES (
        un,
        hash,
        r
    );

    RETURN public.authenticate(un, pw);
END;
$$ LANGUAGE plpgsql STRICT SECURITY DEFINER;
