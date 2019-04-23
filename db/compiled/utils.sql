-- UTILS



-- get_real_id.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 

DROP FUNCTION IF EXISTS get_real_id;

CREATE OR REPLACE FUNCTION get_real_id (
    id_pairs ID_PAIR[],
    fake_id INTEGER
) RETURNS INTEGER AS $$
DECLARE
    f ALIAS FOR fake_id;
    real_id INTEGER;
BEGIN
    SELECT p.id
        FROM UNNEST (id_pairs) p
        INTO real_id
        WHERE p.fake_id = f;
    RETURN real_id;
END;
$$ LANGUAGE plpgsql;


-- test.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 


SELECT * FROM update_entire_system(
    ROW(
        -- SYSTEM INFO
        -- id INTEGER,
        40,
        -- manufacturer_id INTEGER,
        1,
        -- system_type_id INTEGER,
        1,
        -- name VARCHAR(50),
        'Testing SQL Functions #1',
        -- depth FLOAT,
        NULL,
        -- default_glass_size FLOAT,
        NULL,
        -- default_glass_bite FLOAT,
        NULL,
        -- default_sightline FLOAT,
        NULL,
        -- top_gap FLOAT,
        NULL,
        -- bottom_gap FLOAT,
        NULL,
        -- side_gap FLOAT,
        NULL,
        -- meeting_stile_gap FLOAT,
        NULL,
        -- inset FLOAT,
        NULL,
        -- glass_gap FLOAT,
        NULL,
        -- shim_size FLOAT,
        NULL,
        -- front_inset BOOLEAN,
        NULL,
        -- system_tag_ids INTEGER[],
        ARRAY [1,2,3],
        -- system_tag_ids_to_delete INTEGER[],
        NULL,
        -- -- GLAZING INFO
        -- infill_sizes FLOAT[],
        ARRAY [1],
        -- infill_sizes_to_delete FLOAT[],
        NULL,
        -- infill_pocket_type_ids INTEGER[],
        ARRAY [1,2],
        -- infill_pocket_type_ids_to_delete INTEGER[],
        NULL,
        -- infill_pocket_sizes FLOAT[],
        ARRAY [1],
        -- infill_pocket_sizes_to_delete FLOAT[],
        NULL,
        -- -- VALID TYPES
        -- invalid_system_configuration_type_ids INTEGER[],
        NULL,
        -- invalid_system_configuration_type_ids_to_delete INTEGER[],
        NULL,
        -- configuration_overrides entire_system_configuration_override[],
        NULL,
        -- configuration_overrides_to_delete entire_system_configuration_override[],
        NULL,
        -- -- OPTIONS
        -- system_options entire_system_option[],
        ARRAY[ROW(
            -- id INTEGER,
            50,
            -- system_id INTEGER,
            NULL,
            -- name VARCHAR(50),
            NULL,
            -- presentation_level INTEGER,
            NULL,
            -- override_level INTEGER,
            NULL,
            -- option_order INTEGER,
            NULL,
            -- option_values entire_option_value[],
            ARRAY[ROW(
                -- id INTEGER,
                NULL,
                -- system_option_id INTEGER,
                NULL,
                -- name TEXT,
                'Test Option Value #1',
                -- value FLOAT,
                NULL,
                -- value_order INTEGER,
                1,
                -- mirror_from_option_value_id INTEGER
                NULL
            )::entire_option_value],
            -- option_value_ids_to_delete INTEGER[],
            NULL,
            -- configuration_type_ids INTEGER[],
            NULL,
            -- configuration_type_ids_to_delete INTEGER[]
            NULL
        )::entire_system_option],
        -- system_option_ids_to_delete INTEGER[]
        NULL
    )::entire_system
);
