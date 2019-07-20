DROP FUNCTION IF EXISTS create_user;

CREATE OR REPLACE FUNCTION gc_private.create_user(
    username VARCHAR(50),
    password VARCHAR(50),
    role VARCHAR(50)
) RETURNS JWT AS $$
DECLARE
    uid INTEGER;
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
    ) RETURNING id INTO uid;

    INSERT INTO projects (
        name,
        owner_id
    ) VALUES (
        'Demo Project',
        uid
    );

    RETURN authenticate(un, pw);
END;
$$ LANGUAGE plpgsql STRICT SECURITY DEFINER;
