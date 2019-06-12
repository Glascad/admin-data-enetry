DROP FUNCTION IF EXISTS public.authenticate;

CREATE OR REPLACE FUNCTION public.authenticate(
    username VARCHAR(50),
    password VARCHAR(50)
) RETURNS users.JWT AS $$
DECLARE
    un ALIAS FOR username;
    pw ALIAS FOR password;
    authenticatee users.users%ROWTYPE;
BEGIN
    SELECT * FROM users.users
    INTO authenticatee
    WHERE users.users.username = un;

    IF authenticatee.password_hash = CRYPT(password, authenticatee.password_hash) THEN
        RETURN ROW(
            'user',
            EXTRACT(EPOCH FROM NOW() + INTERVAL '7 days'),
            authenticatee.id
        )::users.JWT;
    ELSE
        RETURN NULL;
    END IF;
END;
$$ LANGUAGE plpgsql STRICT SECURITY DEFINER;
