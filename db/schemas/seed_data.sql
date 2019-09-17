
SET search_path TO public, gc_utils, gc_public, gc_data, gc_protected, gc_controlled, gc_private;

-- INITIAL MANUFACTURER
INSERT INTO manufacturers (name) VALUES ('Kawneer');

-- INITIAL SYSTEM
INSERT INTO systems (name, manufacturer_id, system_type) VALUES ('Initial System', 1, 'STOREFRONT');
INSERT INTO system_options (name, system_id, is_recursive, default_system_option_value_id) VALUES ('SET', 1, FALSE, 1);
INSERT INTO system_option_values (name, option_name, parent_system_option_id, system_id, is_recursive) VALUES
('FRONT', 'SET', 1, 1, TRUE),
('BACK', 'SET', 1, 1, TRUE),
('CENTER', 'SET', 1, 1, TRUE),
('MULTI-PLANE', 'SET', 1, 1, TRUE);
INSERT INTO system_options (name, system_id, parent_system_option_value_id, is_recursive, default_system_option_value_id) VALUES ('JOINERY', 1, 3, TRUE, 5);
INSERT INTO system_option_values (name, option_name, parent_system_option_id, system_id) VALUES -- , raised_option_names) VALUES
('SCREW_SPLINE', 'JOINERY', 2, 1), -- '{"STOPS", "GLAZING"}'),
('SHEAR_BLOCK', 'JOINERY', 2, 1), -- '{"STOPS", "GLAZING"}'),
('STICK', 'JOINERY', 2, 1); -- '{"STOPS", "GLAZING"}');
INSERT INTO system_details (system_id, parent_system_option_value_id, detail_type) VALUES
(1, 5, 'HEAD'),
(1, 5, 'HORIZONTAL'),
(1, 5, 'SILL'),
(1, 5, 'JAMB'),
(1, 5, 'MULLION');
INSERT INTO detail_options (name, parent_system_detail_id, system_id, is_recursive, default_detail_option_value_id) VALUES ('STOPS', 1, 1, FALSE, 1);
INSERT INTO detail_option_values (system_id, parent_detail_option_id, option_name, name, is_recursive) VALUES
(1, 1, 'STOPS', 'UP', FALSE),
(1, 1, 'STOPS', 'DOWN', TRUE);
INSERT INTO detail_options (name, parent_detail_option_value_id, system_id, default_detail_option_value_id) VALUES ('GLAZING', 2, 1, 3);
INSERT INTO detail_option_values (system_id, parent_detail_option_id, option_name, name, is_recursive) VALUES
(1, 2, 'GLAZING', 'INSIDE', FALSE),
(1, 2, 'GLAZING', 'OUTSIDE', FALSE);
INSERT INTO system_configurations (system_id, parent_detail_option_value_id, configuration_type, optional, is_recursive) VALUES
(1, 1, 'HEAD', FALSE, FALSE),
(1, 1, 'COMPENSATING_RECEPTOR', TRUE, FALSE),
-- (1, 2, 'HEAD', FALSE, FALSE),
-- (1, 2, 'COMPENSATING_RECEPTOR', TRUE, FALSE),
(1, 3, 'HEAD', FALSE, FALSE),
(1, 3, 'COMPENSATING_RECEPTOR', TRUE, FALSE),
(1, 4, 'HEAD', FALSE, FALSE),
(1, 4, 'COMPENSATING_RECEPTOR', TRUE, FALSE);
INSERT INTO configuration_options (system_id, parent_system_configuration_id, name, default_configuration_option_value_id, is_recursive) VALUES
(1, 2, 'DURABILITY', 1, FALSE),
(1, 4, 'DURABILITY', 3, FALSE),
(1, 6, 'DURABILITY', 5, FALSE); -- ,
-- (1, 8, 'DURABILITY');
INSERT INTO configuration_option_values (system_id, parent_configuration_option_id, option_name, name) VALUES
(1, 1, 'DURABILITY', 'STANDARD_DUTY'),
(1, 1, 'DURABILITY', 'HIGH-PERFORMANCE'),
(1, 2, 'DURABILITY', 'STANDARD_DUTY'),
(1, 2, 'DURABILITY', 'HIGH-PERFORMANCE'),
(1, 3, 'DURABILITY', 'STANDARD_DUTY'),
(1, 3, 'DURABILITY', 'HIGH-PERFORMANCE'); -- ,
-- (1, 4, 'DURABILITY', 'STANDARD_DUTY'),
-- (1, 4, 'DURABILITY', 'HIGH-PERFORMANCE');

-- TEST SYSTEM
INSERT INTO systems (name, manufacturer_id, system_type)
VALUES ('Test System', 1, 'STOREFRONT');

-- PROJECT FOR USER_ONE
INSERT INTO projects (name, owner_id) VALUES ('Demo Project', 1);

-- TEST PROJECT
INSERT INTO projects (name, owner_id) VALUES ('Test Project', 2);

-- TEST SYSTEM SET
INSERT INTO system_sets (project_id, system_id, system_option_value_id, name) VALUES
(2, 1, 5, 'Trifab451 - Set');
