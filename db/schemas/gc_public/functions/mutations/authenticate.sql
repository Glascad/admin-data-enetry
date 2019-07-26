DROP FUNCTION IF EXISTS authenticate;

CREATE OR REPLACE FUNCTION gc_public.authenticate(
    username VARCHAR(50),
    password VARCHAR(50)
) RETURNS JWT AS $$
DECLARE
    un ALIAS FOR username;
    pw ALIAS FOR password;
    authenticatee users%ROWTYPE;
BEGIN
    SELECT * FROM users
    INTO authenticatee
    WHERE users.username = un;

    IF authenticatee.password_hash = CRYPT(pw, authenticatee.password_hash) THEN
        -- UPDATE users
        -- SET last_auth = CURRENT_TIMESTAMP
        -- WHERE users.username = un;
        
        RETURN ROW(
            authenticatee.role,
            EXTRACT(EPOCH FROM NOW() + INTERVAL '24 hours'),
            authenticatee.id
        )::JWT;
    ELSE
        RETURN NULL;
    END IF;
END;
$$ LANGUAGE plpgsql STRICT SECURITY DEFINER;
