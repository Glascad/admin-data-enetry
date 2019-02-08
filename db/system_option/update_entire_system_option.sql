DROP FUNCTION IF EXISTS update_entire_system_option;

CREATE OR REPLACE FUNCTION update_entire_system_option (
    system_id INTEGER,
    system_option_id INTEGER,
    new_name TEXT,
    new_presentation_level INTEGER,
    new_override_level INTEGER,
    new_order INTEGER,
    new_option_value_ids INTEGER[],
    old_option_value_ids INTEGER[],
    option_value_names TEXT[],
    option_value_values FLOAT[],
    option_value_value_orders INTEGER[],
    option_value_mirror_from_option_value_ids INTEGER[],
    new_configuration_type_ids INTEGER[],
    old_configuration_type_ids INTEGER[]
) RETURNS SETOF system_options AS $$
BEGIN
    RETURN QUERY WITH
    updated_system_option AS (
        SELECT * FROM create_or_update_system_option(
            system_id,
            system_option_id,
            new_name,
            new_presentation_level,
            new_override_level,
            new_order
        )
    ),
    merged_option_values AS (
        SELECT
            uso.id AS system_option_id,
            novi.value AS id,
            ovn.name AS name,
            ovv.value AS value,
            ovvo.value AS value_order,
            ovmfovi.value AS mirror_from_option_value_id
        FROM updated_system_option uso
        JOIN order_array(new_option_value_ids) AS novi ON TRUE
        JOIN order_array(option_value_names) AS ovn ON ovn.id = novi.id
        JOIN order_array(option_value_values) AS ovv ON ovv.id = novi.id
        JOIN order_array(option_value_value_orders) AS ovvo ON ovvo.id = novi.id
        JOIN order_array(option_value_mirror_from_option_value_ids) AS ovmfovi ON ovmfovi.id = novi.id
    ),
    new_option_values AS (
        INSERT INTO option_values(
            id,
            system_option_id,
            name,
            value,
            value_order,
            mirror_from_option_value_id
        )
        SELECT * FROM merged_option_values
        ON CONFLICT (id) DO UPDATE
            SET
                name = CASE
                    WHEN EXCLUDED.name IS NOT NULL
                        THEN EXCLUDED.name
                    ELSE option_values.name END,
                value = CASE
                    WHEN EXCLUDED.value IS NOT NULL
                        THEN EXCLUDED.value
                    ELSE option_values.value END,
                value_order = CASE
                    WHEN EXCLUDED.value_order IS NOT NULL
                        THEN EXCLUDED.value_order
                    ELSE option_values.value_order END,
                mirror_from_option_value_id = CASE
                    WHEN EXCLUDED.mirror_from_option_value_id IS NOT NULL
                        THEN EXCLUDED.mirror_from_option_value_id
                    ELSE option_values.mirror_from_option_value_id END
            WHERE option_values.id = EXCLUDED.id
    ),
    old_option_values AS (
        DELETE FROM option_values
        WHERE id IN (
            SELECT * FROM UNNEST (old_option_value_ids)
        )
        AND option_values.system_option_id IN (
            SELECT id FROM updated_system_option
        )
    ),
    new_configuration_types AS (
        INSERT INTO system_option_configuration_types
        SELECT
            uso.id AS system_option_id,
            ct AS configuration_type_id
        FROM updated_system_option uso
        JOIN UNNEST (new_configuration_type_ids) ct ON TRUE
    ),
    old_configuration_types AS (
        DELETE FROM system_option_configuration_types
        WHERE configuration_type_id IN (
            SELECT * FROM UNNEST (old_configuration_type_ids)
        )
        AND system_option_configuration_types.system_option_id IN (
            SELECT id FROM updated_system_option
        )
    )
    SELECT * FROM updated_system_option;
END;
$$ LANGUAGE plpgsql;
