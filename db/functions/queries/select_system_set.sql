DROP FUNCTION IF EXISTS select_system_set;

CREATE OR REPLACE FUNCTION select_system_set(system_set_id INTEGER)
RETURNS SYSTEM_SET_OUTPUT AS $$
DECLARE
    ssid ALIAS FOR system_set_id;
    ss system_sets%ROWTYPE;
    so SYSTEM_OUTPUT;
BEGIN
    SELECT * FROM system_sets INTO ss
    WHERE system_sets.id = ssid;

    so := select_system(ss.system_id);

    RETURN ROW(
        
    )::SYSTEM_SET_OUTPUT;    
END;
$$ LANGUAGE plpgsql STABLE;
