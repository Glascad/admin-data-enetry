
SET search_path TO public, gc_utils, gc_public, gc_data, gc_protected, gc_controlled, gc_private;

-- PROJECT FOR USER_ONE
INSERT INTO projects (name, owner_id) VALUES ('Demo Project', 1);
INSERT INTO projects (name, owner_id) VALUES ('Test Project', 2);
-- INITIAL MANUFACTURER
INSERT INTO manufacturers (name) VALUES ('Kawneer');

-- INITIAL SYSTEM
INSERT INTO systems (name, manufacturer_id, system_type) VALUES ('Initial System', 1, 'STOREFRONT');
INSERT INTO system_options (name, system_id) VALUES ('SET', 1);
INSERT INTO system_option_values (name, option_name, system_option_id, system_id) VALUES
('FRONT', 'SET', 1, 1),
('BACK', 'SET', 1, 1),
('CENTER', 'SET', 1, 1),
('MULTI_PLANE', 'SET', 1, 1);
INSERT INTO system_options (name, system_id, parent_system_option_value_id) VALUES ('JOINERY', 1, 3);
INSERT INTO system_option_values (name, option_name, system_option_id, system_id, raised_option_names) VALUES
('SCREW_SPLINE', 'JOINERY', 2, 1, '{"STOPS", "GLAZING"}'),
('SHEAR_BLOCK', 'JOINERY', 2, 1, '{"STOPS", "GLAZING"}'),
('STICK', 'JOINERY', 2, 1, '{"STOPS", "GLAZING"}');
INSERT INTO system_detail_types (system_id, system_option_value_id, detail_type) VALUES
(1, 5, 'HEAD'),
(1, 5, 'HORIZONTAL'),
(1, 5, 'SILL'),
(1, 5, 'JAMB'),
(1, 5, 'MULLION');
INSERT INTO detail_options (name, system_detail_type_id, system_id) VALUES ('STOPS', 1, 1);
INSERT INTO detail_option_values (system_id, detail_option_id, option_name, name) VALUES
(1, 1, 'STOPS', 'UP'),
(1, 1, 'STOPS', 'DOWN');
INSERT INTO detail_options (name, parent_detail_option_value_id, system_detail_type_id, system_id) VALUES ('GLAZING', 2, 1, 1);
INSERT INTO detail_option_values (system_id, detail_option_id, option_name, name) VALUES
(1, 2, 'GLAZING', 'INSIDE'),
(1, 2, 'GLAZING', 'OUTSIDE');
INSERT INTO system_configuration_types (system_id, detail_option_value_id, configuration_type, optional) VALUES
(1, 1, 'HEAD', false),
(1, 1, 'COMPENSATING_RECEPTOR', true),
(1, 2, 'HEAD', false),
(1, 2, 'COMPENSATING_RECEPTOR', true),
(1, 3, 'HEAD', false),
(1, 3, 'COMPENSATING_RECEPTOR', true),
(1, 4, 'HEAD', false),
(1, 4, 'COMPENSATING_RECEPTOR', true);
INSERT INTO configuration_options (system_id, system_configuration_type_id, name) VALUES
(1, 2, 'RECEPTOR_TYPE'),
(1, 4, 'RECEPTOR_TYPE'),
(1, 6, 'RECEPTOR_TYPE'),
(1, 8, 'RECEPTOR_TYPE');
INSERT INTO configuration_option_values (system_id, configuration_option_id, option_name, name) VALUES
(1, 1, 'RECEPTOR_TYPE', 'STANDARD'),
(1, 1, 'RECEPTOR_TYPE', 'HIGH_PERFORMANCE'),
(1, 2, 'RECEPTOR_TYPE', 'STANDARD'),
(1, 2, 'RECEPTOR_TYPE', 'HIGH_PERFORMANCE'),
(1, 3, 'RECEPTOR_TYPE', 'STANDARD'),
(1, 3, 'RECEPTOR_TYPE', 'HIGH_PERFORMANCE'),
(1, 4, 'RECEPTOR_TYPE', 'STANDARD'),
(1, 4, 'RECEPTOR_TYPE', 'HIGH_PERFORMANCE');

-- TEST SYSTEM
INSERT INTO systems (name, manufacturer_id, system_type)
VALUES ('Test System', 1, 'STOREFRONT');
