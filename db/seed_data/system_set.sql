
DO $create_system_sets$ DECLARE ___ INTEGER; BEGIN

    <<LOOP 
        PID (1, 2, 3)
        SID (1, 2, 2)
    >>

        SELECT 1 FROM update_entire_system_set(
            (
                -- id INTEGER,
                NULL,
                -- system_id INTEGER,
                <<SID>>,
                -- project_id INTEGER,
                <<PID>>,
                -- name VARCHAR(50),
                'Test System Set',
                -- system_option_value_path LTREE,
                '<<SID>>.SET.CENTER.JOINERY.SCREW_SPLINE',
                -- option_group_values OPTION_VALUE_PAIR[],
                ARRAY[
                    ('STOPS', 'DOWN'),
                    ('GLAZING', 'INSIDE')
                ]::OPTION_VALUE_PAIR[],
                -- detail_option_values ENTIRE_SYSTEM_SET_DETAIL[],
                ARRAY[
                    -- (sd, dov)
                    ('<<SID>>.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD', NULL),
                    ('<<SID>>.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL', NULL),
                    (NULL, '<<SID>>.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN')
                ]::ENTIRE_SYSTEM_SET_DETAIL[],
                -- configuration_option_values ENTIRE_SYSTEM_SET_CONFIGURATION[]
                ARRAY[
                    -- (dc, cov)
                    (NULL, '<<SID>>.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.DOWN.GLAZING.INSIDE'),
                    (NULL, '<<SID>>.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY'),
                    (NULL, '<<SID>>.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN.GLAZING.INSIDE'),
                    ('<<SID>>.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL', NULL)
                ]::ENTIRE_SYSTEM_SET_CONFIGURATION[],
                NULL
            )::ENTIRE_SYSTEM_SET
        ) INTO ___;

    <<END LOOP>>

END $create_system_sets$;
