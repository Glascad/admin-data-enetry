SELECT * FROM update_entire_system(ROW(
    -- id INTEGER,
    NULL,
    -- name TEXT,
    'New System',
    -- system_type SYSTEM_TYPE,
    'STOREFRONT',
    -- manufacturer_id INTEGER,
    1,
    -- paths_to_delete LTREE[],
    NULL,
    -- option_groups_to_delete OPTION_NAME[],
    NULL,
    -- new_option_groups OPTION_NAME[],
    '{"STOPS", "GLAZING"}',
    -- configuration_part_ids_to_delete INTEGER[]
    NULL,
    -- , configuration_parts ENTIRE_configuration_part[]
    NULL,
    -- , new_configuration_parts NEW_configuration_part[]
    NULL,
    -- , configuration_option_values ENTIRE_configuration_option_value[]
    NULL,
    -- , new_configuration_option_values NEW_configuration_option_value[]
    ARRAY[
        ROW('UP', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS'),
        ROW('DOWN', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS'),
        ROW('UP', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS'),
        ROW('DOWN', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS'),
        ROW('STANDARD_DUTY', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.COMPENSATING_RECEPTOR.DURABILITY'),
        ROW('HIGH_PERFORMANCE', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.COMPENSATING_RECEPTOR.DURABILITY'),
        ROW('OUTSIDE', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.DOWN.GLAZING'),
        ROW('INSIDE', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.DOWN.GLAZING'),
        ROW('OUTSIDE', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.UP.GLAZING'),
        ROW('INSIDE', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.UP.GLAZING'),
        ROW('OUTSIDE', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN.GLAZING'),
        ROW('INSIDE', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN.GLAZING')
    ]::NEW_CONFIGURATION_OPTION_VALUE[],
    -- , configuration_options ENTIRE_configuration_option[]
    NULL,
    -- , new_configuration_options NEW_configuration_option[]
    ARRAY[
        ROW('STOPS', 'UP', NULL, '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD'),
        ROW('STOPS', 'UP', NULL, '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL'),
        ROW('DURABILITY', 'STANDARD_DUTY', NULL, '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.COMPENSATING_RECEPTOR'),
        ROW('GLAZING', 'OUTSIDE', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.DOWN', NULL),
        ROW('GLAZING', 'OUTSIDE', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.UP', NULL),
        ROW('GLAZING', 'OUTSIDE', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN', NULL)
    ]::NEW_CONFIGURATION_OPTION[],
    -- , detail_configurations ENTIRE_detail_configuration[]
    NULL,
    -- , new_detail_configurations NEW_detail_configuration[]
    NULL,
    -- , detail_option_values ENTIRE_detail_option_value[]
    NULL,
    -- , new_detail_option_values NEW_detail_option_value[]
    NULL,
    -- , detail_options ENTIRE_detail_option[]
    NULL,
    -- , new_detail_options NEW_detail_option[]
    NULL,
    -- , system_details ENTIRE_system_detail[]
    NULL,
    -- , new_system_details NEW_system_detail[]
    NULL,
    -- , system_option_values ENTIRE_system_option_value[]
    NULL,
    -- , new_system_option_values NEW_system_option_value[]
    NULL,
    -- , system_options ENTIRE_system_option[]
    NULL,
    -- , new_system_options NEW_system_option[]
    NULL
)::ENTIRE_SYSTEM);
