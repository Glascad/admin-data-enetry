
DO $create_system_sets$ DECLARE ___ INTEGER; BEGIN

    SELECT 1 FROM update_entire_system_set(
        (
            -- id INTEGER,
            NULL,
            -- system_id INTEGER,
            1,
            -- project_id INTEGER,
            1,
            -- name VARCHAR(50),
            'Test System Set',
            -- system_option_value_path LTREE,
            '1.SET.CENTER.JOINERY.SCREW_SPLINE',
            -- option_group_values OPTION_VALUE_PAIR[],
            ARRAY[
                ('STOPS', 'DOWN'),
                ('GLAZING', 'INSIDE')
            ]::OPTION_VALUE_PAIR[],
            -- detail_option_values ENTIRE_SYSTEM_SET_DETAIL[],
            ARRAY[
                -- (sd, dov)
                ('1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD', NULL),
                ('1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL', NULL),
                (NULL, '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN')
            ]::ENTIRE_SYSTEM_SET_DETAIL[],
            -- configuration_option_values ENTIRE_SYSTEM_SET_CONFIGURATION[]
            ARRAY[
                -- (dc, cov)
                (NULL, '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.DOWN.GLAZING.INSIDE'),
                (NULL, '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY'),
                (NULL, '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN.GLAZING.INSIDE'),
                ('1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL', NULL)
            ]::ENTIRE_SYSTEM_SET_CONFIGURATION[],
            NULL
        )::ENTIRE_SYSTEM_SET
    ) INTO ___;

END $create_system_sets$;
