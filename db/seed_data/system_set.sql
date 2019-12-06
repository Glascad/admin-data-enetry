
DO $create_system_sets$ DECLARE ___ INTEGER; BEGIN

    <<LOOP ID (1, 2)>>

        SELECT 1 FROM update_entire_system_set(
            (
                -- id INTEGER,
                NULL,
                -- system_id INTEGER,
                <<ID>>,
                -- project_id INTEGER,
                <<ID>>,
                -- name VARCHAR(50),
                'Test System Set',
                -- system_option_value_path LTREE,
                '<<ID>>.SET.CENTER.JOINERY.SCREW_SPLINE',
                -- option_group_values OPTION_VALUE_PAIR[],
                ARRAY[
                    ('STOPS', 'DOWN'),
                    ('GLAZING', 'INSIDE')
                ]::OPTION_VALUE_PAIR[],
                -- detail_option_values ENTIRE_SYSTEM_SET_NODE[],
                ARRAY[
                    (NULL, 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD'),
                    (NULL, 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL'),
                    (NULL, 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.GLAZING.INSIDE')
                ]::ENTIRE_SYSTEM_SET_NODE[],
                -- configuration_option_values ENTIRE_SYSTEM_SET_NODE[]
                ARRAY[
                    -- (NULL, '')
                ]::ENTIRE_SYSTEM_SET_NODE[]
            )::ENTIRE_SYSTEM_SET
        ) INTO ___;


        -- TEST SYSTEM SET

        -- INSERT INTO system_sets (system_id, project_id, name, system_option_value_path) VALUES
        -- (1, <<ID>>, 'Test System Set', '1.SET.CENTER.JOINERY.SCREW_SPLINE');

        -- INSERT INTO system_set_option_group_values (system_set_id, option_name, name) VALUES
        -- (<<ID>>, 'STOPS', 'DOWN'),
        -- (<<ID>>, 'GLAZING', 'INSIDE');

        -- INSERT INTO system_set_detail_option_values (system_set_id, detail_option_value_path) VALUES
        -- (<<ID>>, '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID'),
        -- (<<ID>>, '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.VOID.VOID'),
        -- (<<ID>>, '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN');

        -- INSERT INTO system_set_configuration_option_values (system_set_id, configuration_option_value_path) VALUES
        -- (<<ID>>, '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.HEAD.STOPS.DOWN.GLAZING.INSIDE'),
        -- (<<ID>>, '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY'),
        -- (<<ID>>, '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.VOID.VOID.__CT__.HORIZONTAL.STOPS.DOWN.GLAZING.INSIDE'),
        -- (<<ID>>, '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL.VOID.VOID');

    <<END LOOP>>

END $create_system_sets$;
