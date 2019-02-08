DROP FUNCTION IF EXISTS update_intermediate_table;

CREATE OR REPLACE FUNCTION update_intermediate_table(
    table_name TEXT,
    main_fk_name TEXT,
    other_fk_name TEXT,
    main_fk_value FLOAT,
    other_fk_array FLOAT[],
    other_fk_to_delete_array FLOAT[]
) RETURNS VOID AS $$
BEGIN
    EXEC(
        'INSERT INTO ' || table_name || '(
            'main_fk_name',
            'other_fk_name'
        )
        SELECT
            'main_fk_value' AS 'main_fk_name',
            'other_fk_value' AS 'other_fk_name'
        FROM UNNEST ('other_fk_array') 'other_fk_value';'
    );

    EXEC(
        'DELETE FROM 'table_name'
        WHERE 'main_fk_name' = 'main_fk_value'
        AND 'other_fk_name' IN (
            SELECT * FROM UNNEST ('other_fk_to_delete_array')
        );'
    );
END;
$$ LANGUAGE plpgsql;
