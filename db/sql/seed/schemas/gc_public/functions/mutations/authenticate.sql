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
    -- CANNOT SET IN NON-VOLATILE FUNCTION
    -- SET search_path = gc_public,gc_private,pg_temp_1,pg_toast,pg_toast_temp_1;

    SELECT * FROM users
    INTO authenticatee
    WHERE users.username = un;

    IF authenticatee.password_hash = CRYPT(pw, authenticatee.password_hash) THEN
        -- UPDATE users
        -- SET last_auth = CURRENT_TIMESTAMP
        -- WHERE users.username = un;
        
        RETURN ROW(
            LOWER(authenticatee.role::TEXT),
            -- NULL,
            EXTRACT(EPOCH FROM NOW() + INTERVAL <<JWT_DURATION>>),
            authenticatee.id
        )::gc_controlled.JWT;
    ELSE
        RETURN NULL;
    END IF;
END;
$$ LANGUAGE plpgsql STRICT SECURITY DEFINER;

ALTER FUNCTION gc_public.authenticate OWNER TO gc_invoker;
