DROP FUNCTION IF EXISTS select_entire_system;

CREATE OR REPLACE FUNCTION select_entire_system (system_id INTEGER)
RETURNS SYSTEM_OUTPUT 
RETURNS NULL ON NULL INPUT
AS $$
DECLARE
    sid ALIAS FOR system_id;
    s systems%ROWTYPE;
    sto SYSTEM_TYPE_OUTPUT;
    dt detail_types%ROWTYPE;
    dto DETAIL_TYPE_OUTPUT;
    dtos DETAIL_TYPE_OUTPUT[];
    sdto SYSTEM_DETAIL_TYPE_OUTPUT;
    sdtos SYSTEM_DETAIL_TYPE_OUTPUT[];
    ct RECORD;
    cto CONFIGURATION_TYPE_OUTPUT;
    ctos CONFIGURATION_TYPE_OUTPUT[];
    scto SYSTEM_CONFIGURATION_TYPE_OUTPUT;
    sctos SYSTEM_CONFIGURATION_TYPE_OUTPUT[];
    invalid BOOLEAN;
    sco RECORD;
BEGIN
    SELECT * FROM systems INTO s
    WHERE systems.id = sid;

    sto := select_entire_system_type(s.system_type_id);

    IF array_length(sto.detail_types, 1) > 0 THEN
        FOREACH dto IN ARRAY sto.detail_types
        LOOP
            sctos := NULL;

            IF array_length(dto.configuration_types, 1) > 0 THEN
                FOREACH cto IN ARRAY dto.configuration_types
                LOOP
                    invalid := EXISTS (
                        SELECT * FROM invalid_system_configuration_types
                        WHERE invalid_system_configuration_types.system_id = sid
                        AND invalid_system_configuration_types.invalid_configuration_type_id = cto.id
                    );

                    SELECT * FROM system_configuration_overrides INTO sco
                    WHERE system_configuration_overrides.system_id = sid
                    AND system_configuration_overrides.system_type_id = s.system_type_id
                    AND system_configuration_overrides.detail_type_id = dto.id
                    AND system_configuration_overrides.configuration_type_id = cto.id;

                    sctos := sctos || ROW(
                        cto.id,
                        cto.type,
                        cto.door,
                        invalid,
                        CASE WHEN sco.required_override IS NOT NULL
                            THEN sco.required_override
                            ELSE cto.required END,
                        CASE WHEN sco.mirrorable_override IS NOT NULL
                            THEN sco.mirrorable_override
                            ELSE cto.mirrorable END,
                        CASE WHEN sco.presentation_level_override IS NOT NULL
                            THEN sco.presentation_level_override
                            ELSE cto.presentation_level END,
                        CASE WHEN sco.override_level_override IS NOT NULL
                            THEN sco.override_level_override
                            ELSE cto.override_level END,
                        cto
                    )::SYSTEM_CONFIGURATION_TYPE_OUTPUT;
                END LOOP;
            END IF;

            sdtos := sdtos || ROW(
                dto.id,
                dto.type,
                dto.entrance,
                dto.vertical,
                sctos
            )::SYSTEM_DETAIL_TYPE_OUTPUT;
        END LOOP;
    END IF;

    RETURN ROW(
        sid,
        s.name,
        s.depth,
        s.default_glass_size,
        s.default_glass_bite,
        s.default_sightline,
        s.top_gap,
        s.bottom_gap,
        s.side_gap,
        s.meeting_stile_gap,
        s.inset,
        s.glass_gap,
        s.shim_size,
        s.front_inset,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        sdtos
    )::SYSTEM_OUTPUT;
END;
$$ LANGUAGE plpgsql STABLE;