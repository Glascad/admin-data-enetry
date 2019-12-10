
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
                -- detail_option_values ENTIRE_SYSTEM_SET_DETAIL[],
                ARRAY[
                    -- (oldsd, newsd, olddov, newdov)
                    (NULL, '<<ID>>.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD', NULL, NULL),
                    (NULL, '<<ID>>.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL', NULL, NULL),
                    (NULL, NULL, NULL, '<<ID>>.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN')
                ]::ENTIRE_SYSTEM_SET_DETAIL[],
                -- configuration_option_values ENTIRE_SYSTEM_SET_CONFIGURATION[]
                ARRAY[
                    -- (olddc, newdc, oldcov, newcov)
                    (NULL, NULL, NULL, '<<ID>>.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.DOWN.GLAZING.INSIDE'),
                    (NULL, NULL, NULL, '<<ID>>.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY'),
                    (NULL, NULL, NULL, '<<ID>>.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN.GLAZING.INSIDE'),
                    (NULL, '<<ID>>.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL', NULL, NULL)
                ]::ENTIRE_SYSTEM_SET_CONFIGURATION[]
            )::ENTIRE_SYSTEM_SET
        ) INTO ___;

    <<END LOOP>>

END $create_system_sets$;
