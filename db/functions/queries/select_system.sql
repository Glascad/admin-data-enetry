DROP FUNCTION IF EXISTS select_entire_system;

CREATE OR REPLACE FUNCTION select_entire_system (system_id INTEGER)
RETURNS SYSTEM_OUTPUT 
RETURNS NULL ON NULL INPUT
AS $$
DECLARE
    sid ALIAS FOR system_id;
    system SYSTEMS%ROWTYPE;
    system_type SYSTEM_TYPES%ROWTYPE;
    output SYSTEM_OUTPUT;
BEGIN
    SELECT * FROM systems INTO system
    WHERE system.id = sid;

    

END;
$$ LANGUAGE plpgsql;