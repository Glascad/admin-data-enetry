DROP FUNCTION IF EXISTS update_system_configuration_override;

CREATE OR REPLACE FUNCTION update_system_configuration_override(
    override ENTIRE_SYSTEM_CONFIGURATION_OVERRIDE,
    system_id INTEGER,
    system_type SYSTEM_TYPE
) RETURNS SYSTEM_CONFIGURATION_OVERRIDES AS $$
DECLARE
    o ALIAS FOR override;
    sid ALIAS FOR system_id;
    st ALIAS FOR system_type;
    stdtct system_type_detail_type_configuration_types%ROWTYPE;
    uo system_configuration_overrides%ROWTYPE;
BEGIN

    SELECT * FROM system_type_detail_type_configuration_types
    INTO stdtct
    WHERE system_type = st
    AND detail_type = o.detail_type
    AND configuration_type = o.configuration_type;

    -- COMPARE override TO stdtct
    -- CHECK IF override KEYS ARE NULL OR EQUAL TO stdtct KEY
    IF (o.required_override IS NULL OR o.required_override = stdtct.required) THEN
    -- AND (o.mirrorable_override IS NULL OR o.mirrorable_override = stdtct.mirrorable)
    -- DELETE IF IDENTICAL (minus NULL values)
        DELETE FROM system_configuration_overrides
            WHERE system_id = sid
            AND detail_type = o.detail_type
            AND configuration_type = o.configuration_type
            RETURNING * INTO uo;
    -- CREATE/UPDATE IF DIFFERENT
    ELSE
        INSERT INTO system_configuration_overrides (
                required_override
            ) VALUES (
                o.required_override
            )
        ON CONFLICT (system_id, detail_type, configuration_type) DO UPDATE SET
            -- later on check for null values and only update non-null values
                required_override = o.required_override
            WHERE system_id = sid
            AND detail_type = o.detail_type
            AND configuration_type = o.configuration_type
        RETURNING * INTO uo;
    END IF;

END;
$$ LANGUAGE plpgsql;
