
SET search_path TO public, gc_utils, gc_public, gc_data, gc_protected, gc_controlled, gc_private;


-- INITIAL MANUFACTURER
INSERT INTO manufacturers (name) VALUES ('Kawneer');



-- INITIAL SYSTEM
INSERT INTO systems (name, manufacturer_id, system_type) VALUES ('Initial System', 1, 'STOREFRONT');

INSERT INTO system_options (name, system_id, default_system_option_value) VALUES('SET', 1, 'CENTER');

INSERT INTO system_option_values (name, parent_system_option_path) VALUES
('CENTER', '1.SET'),
('BACK', '1.SET'),
('FRONT', '1.SET');

INSERT INTO system_options (name, parent_system_option_value_path, default_system_option_value) VALUES('JOINERY', '1.SET.CENTER', 'SCREW_SPLINE');

INSERT INTO system_option_values (name, parent_system_option_path) VALUES
('SCREW_SPLINE', '1.SET.CENTER.JOINERY'),
('SHEAR_BLOCK', '1.SET.CENTER.JOINERY'),
('STICK', '1.SET.CENTER.JOINERY');

INSERT INTO system_details (detail_type, parent_system_option_value_path) VALUES
('HEAD', '1.SET.CENTER.JOINERY.SCREW_SPLINE'),
('HORIZONTAL', '1.SET.CENTER.JOINERY.SCREW_SPLINE'),
('SILL', '1.SET.CENTER.JOINERY.SCREW_SPLINE');

INSERT INTO detail_options (name, parent_system_detail_path, default_detail_option_value) VALUES ('STOPS', '1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD', 'UP');

INSERT INTO detail_option_values (name, parent_detail_option_path) VALUES
('UP', '1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS'),
('DOWN', '1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS');


INSERT INTO detail_options (name, parent_detail_option_value_path, default_detail_option_value) VALUES ('GLAZING', '1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN', 'INSIDE');

INSERT INTO detail_option_values (name, parent_detail_option_path) VALUES
('INSIDE', '1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING'),
('OUTSIDE', '1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING');

INSERT INTO system_configurations (configuration_type, parent_detail_option_value_path) VALUES
('HEAD', '1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.UP'),
('COMPENSATING_RECEPTOR', '1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.UP'),
('HEAD', '1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING.INSIDE'),
('COMPENSATING_RECEPTOR', '1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING.INSIDE'),
('HEAD', '1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING.OUTSIDE'),
('COMPENSATING_RECEPTOR', '1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING.OUTSIDE');

INSERT INTO configuration_options (name, parent_system_configuration_path, default_configuration_option_value) VALUES
('DURABILITY', '1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING.INSIDE.COMPENSATING_RECEPTOR', 'STANDARD_DUTY'),
('DURABILITY', '1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING.OUTSIDE.COMPENSATING_RECEPTOR', 'STANDARD_DUTY'),
('DURABILITY', '1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.UP.COMPENSATING_RECEPTOR', 'STANDARD_DUTY');

INSERT INTO configuration_option_values (name, parent_configuration_option_path) VALUES
('STANDARD_DUTY', '1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING.INSIDE.COMPENSATING_RECEPTOR.DURABILITY'),
('HIGH_PERFORMANCE', '1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING.INSIDE.COMPENSATING_RECEPTOR.DURABILITY'),
('STANDARD_DUTY', '1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING.OUTSIDE.COMPENSATING_RECEPTOR.DURABILITY'),
('HIGH_PERFORMANCE', '1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING.OUTSIDE.COMPENSATING_RECEPTOR.DURABILITY'),
('STANDARD_DUTY', '1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.UP.COMPENSATING_RECEPTOR.DURABILITY'),
('HIGH_PERFORMANCE', '1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.UP.COMPENSATING_RECEPTOR.DURABILITY');

-- INSERT INTO option_groups (system_id, name) VALUES
-- (1, 'STOPS'),
-- (1, 'GLAZING');

-- INSERT INTO option_group_values (system_id, option_group_id, option_name, name) VALUES
-- (1, 1, 'STOPS', 'UP'),
-- (1, 1, 'STOPS', 'DOWN'),
-- (1, 2, 'GLAZING', 'INSIDE'),
-- (1, 2, 'GLAZING', 'OUTSIDE');



-- TEST SYSTEM
INSERT INTO systems (name, manufacturer_id, system_type)
VALUES ('Test System', 1, 'STOREFRONT');



-- PROJECT FOR USER_ONE
INSERT INTO projects (name, owner_id) VALUES ('Demo Project', 1);



-- TEST PROJECT
INSERT INTO projects (name, owner_id) VALUES ('Test Project', 2);



-- TEST SYSTEM SET
-- INSERT INTO system_sets (system_id, project_id, name, system_option_value_path) VALUES
-- (1, 1, 'Test System Set', '1.SET.CENTER.JOINERY.SCREW_SPLINE');

-- INSERT INTO system_set_option_group_values (system_id, system_set_id, option_name, name) VALUES
-- (1, 1, 'STOPS', 'DOWN'),
-- (1, 1, 'GLAZING', 'OUTSIDE');

-- INSERT INTO system_set_detail_option_values (system_set_id, detail_option_value_path) VALUES
-- (1, '1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING.OUTSIDE');

-- INSERT INTO system_set_configuration_option_values (system_set_id, configuration_option_value_path) VALUES
-- (1, '1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING.OUTSIDE.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY');
