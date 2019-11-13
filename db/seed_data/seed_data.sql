
SET search_path TO public, gc_utils, gc_public, gc_data, gc_protected, gc_controlled, gc_private;


-- INITIAL MANUFACTURERS
INSERT INTO manufacturers (name) VALUES
('Kawneer'), ('Mnfg');



-- INITIAL SYSTEM
-- INSERT INTO systems (name, manufacturer_id, system_type) VALUES
-- ('Initial System', 1, 'STOREFRONT');

-- INSERT INTO system_options (name, system_id, default_system_option_value) VALUES
-- ('SET', 1, 'CENTER');

-- INSERT INTO system_option_values (name, parent_system_option_path) VALUES
-- ('FRONT', '1.SET'),
-- ('CENTER', '1.SET'),
-- ('BACK', '1.SET');

-- INSERT INTO system_options (name, parent_system_option_value_path, default_system_option_value) VALUES
-- ('JOINERY', '1.SET.CENTER', 'SCREW_SPLINE');

-- INSERT INTO system_option_values (name, parent_system_option_path) VALUES
-- ('SCREW_SPLINE', '1.SET.CENTER.JOINERY'),
-- ('SHEAR_BLOCK', '1.SET.CENTER.JOINERY'),
-- ('STICK', '1.SET.CENTER.JOINERY');

-- INSERT INTO system_details (detail_type, parent_system_option_value_path) VALUES
-- ('HEAD', '1.SET.CENTER.JOINERY.SCREW_SPLINE'),
-- ('HORIZONTAL', '1.SET.CENTER.JOINERY.SCREW_SPLINE'),
-- ('SILL', '1.SET.CENTER.JOINERY.SCREW_SPLINE');

-- INSERT INTO detail_options (name, parent_system_detail_path, default_detail_option_value) VALUES
-- ('STOPS', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL', 'UP');

-- INSERT INTO detail_option_values (name, parent_detail_option_path) VALUES
-- ('UP', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS'),
-- ('DOWN', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS');

-- INSERT INTO detail_options (name, parent_detail_option_value_path, default_detail_option_value) VALUES
-- ('GLAZING', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP', 'OUTSIDE');

-- INSERT INTO detail_option_values (name, parent_detail_option_path) VALUES
-- ('OUTSIDE', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING'),
-- ('INSIDE', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING');

-- INSERT INTO detail_configurations (configuration_type, parent_system_detail_path, optional) VALUES
-- ('HEAD', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD', FALSE),
-- ('COMPENSATING_RECEPTOR', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD', TRUE),
-- ('SHIM_SUPPORT', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD', TRUE),
-- ('HORIZONTAL', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL', FALSE);

-- INSERT INTO detail_configurations (configuration_type, parent_detail_option_value_path, optional) VALUES
-- ('SILL', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN', FALSE),
-- ('SILL', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.OUTSIDE', FALSE),
-- ('SILL', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.INSIDE', FALSE),
-- ('SILL_FLASHING', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN', TRUE),
-- ('SILL_FLASHING', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.OUTSIDE', TRUE),
-- -- This one is invalid vvv
-- -- ('SILL_FLASHING', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.INSIDE', TRUE),
-- ('SHIM_SUPPORT', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN', TRUE),
-- ('SHIM_SUPPORT', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.OUTSIDE', TRUE),
-- ('SHIM_SUPPORT', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.INSIDE', TRUE);

-- INSERT INTO configuration_options (name, parent_detail_configuration_path, default_configuration_option_value) VALUES
-- ('STOPS', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD', 'UP'),
-- ('STOPS', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL', 'UP'),
-- ('DURABILITY', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.COMPENSATING_RECEPTOR', 'STANDARD_DUTY');

-- INSERT INTO configuration_option_values (name, parent_configuration_option_path) VALUES
-- ('UP', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS'),
-- ('DOWN', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS'),
-- ('UP', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS'),
-- ('DOWN', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS'),
-- ('STANDARD_DUTY', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.COMPENSATING_RECEPTOR.DURABILITY'),
-- ('HIGH_PERFORMANCE', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.COMPENSATING_RECEPTOR.DURABILITY');

-- INSERT INTO configuration_options (name, parent_configuration_option_value_path, default_configuration_option_value) VALUES
-- ('GLAZING', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.DOWN', 'OUTSIDE'),
-- ('GLAZING', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.UP', 'OUTSIDE'),
-- ('GLAZING', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN', 'OUTSIDE');

-- INSERT INTO configuration_option_values (name, parent_configuration_option_path) VALUES
-- ('OUTSIDE', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.DOWN.GLAZING'),
-- ('INSIDE', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.DOWN.GLAZING'),
-- ('OUTSIDE', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.UP.GLAZING'),
-- ('INSIDE', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.UP.GLAZING'),
-- ('OUTSIDE', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN.GLAZING'),
-- ('INSIDE', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN.GLAZING');

-- INSERT INTO option_groups (system_id, name) VALUES
-- (1, 'STOPS'),
-- (1, 'GLAZING');

-- INSERT INTO system_details (detail_type, parent_system_option_value_path) VALUES
-- ('HEAD', '1.SET.FRONT'),
-- ('HEAD', '1.SET.BACK'),
-- ('HEAD', '1.SET.CENTER.JOINERY.SHEAR_BLOCK'),
-- ('HEAD', '1.SET.CENTER.JOINERY.STICK');



-- -- TEST SYSTEM
-- INSERT INTO systems (name, manufacturer_id, system_type) VALUES
-- ('Test System', 1, 'STOREFRONT'),
-- ('Test 2', 2, 'STOREFRONT'),
-- ('Test 3', 2, 'ALL_GLASS');

-- INSERT INTO system_options (system_id, name, default_system_option_value) VALUES
-- (2, 'SET', 'CENTER');

-- INSERT INTO system_option_values (system_id, name, parent_system_option_path) VALUES
-- (2, 'CENTER', '2.SET');



-- PROJECT FOR USER_ONE
INSERT INTO projects (name, owner_id) VALUES
('Demo Project', 1);



-- TEST PROJECT
INSERT INTO projects (name, owner_id) VALUES
('Test Project', 2);

-- <<LOOP
--     ID (1, 2)
-- >>
--     -- TEST SYSTEM SET
--     INSERT INTO system_sets (system_id, project_id, name, system_option_value_path) VALUES
--     (1, <<ID>>, 'Test System Set', '1.SET.CENTER.JOINERY.SCREW_SPLINE');

--     INSERT INTO system_set_option_group_values (system_set_id, option_name, name) VALUES
--     (<<ID>>, 'STOPS', 'DOWN'),
--     (<<ID>>, 'GLAZING', 'INSIDE');

--     INSERT INTO system_set_detail_option_values (system_set_id, detail_option_value_path) VALUES
--     (<<ID>>, '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID'),
--     (<<ID>>, '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.VOID.VOID'),
--     (<<ID>>, '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN');

--     INSERT INTO system_set_configuration_option_values (system_set_id, configuration_option_value_path) VALUES
--     (<<ID>>, '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.HEAD.STOPS.DOWN.GLAZING.INSIDE'),
--     (<<ID>>, '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY'),
--     (<<ID>>, '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.VOID.VOID.__CT__.HORIZONTAL.STOPS.DOWN.GLAZING.INSIDE'),
--     (<<ID>>, '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL.VOID.VOID');

-- <<END LOOP>>


-- CHECKS
DO $check$
DECLARE
    s SYSTEMS;
    sys SYSTEMS;
    ss SYSTEM_SETS;
    sst SYSTEM_SETS;
BEGIN
    FOR s IN SELECT * FROM systems LOOP
        sys := check_entire_system(s);
    END LOOP;
    FOR ss IN SELECT * FROM system_sets LOOP
        sst := check_entire_system_set(ss);
    END LOOP;
END $check$;
