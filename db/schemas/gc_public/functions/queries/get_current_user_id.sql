DROP FUNCTION IF EXISTS get_current_user_id;

CREATE OR REPLACE FUNCTION gc_public.get_current_user_id()
RETURNS INTEGER AS $$
BEGIN
    RETURN NULLIF(CURRENT_SETTING('jwt.claims.user_id', true), '')::INTEGER;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;
