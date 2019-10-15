
SET search_path TO public, gc_utils, gc_public, gc_data, gc_protected, gc_controlled, gc_private;


-- INITIAL MANUFACTURERS
INSERT INTO manufacturers (name) VALUES
('Kawneer'), ('Mnfg');



-- INITIAL SYSTEM
INSERT INTO systems (name, manufacturer_id, system_type) VALUES
('Initial System', 1, 'STOREFRONT');

INSERT INTO system_options (name, system_id, default_system_option_value) VALUES
('SET', 1, 'CENTER');

INSERT INTO system_option_values (name, parent_system_option_path) VALUES
('CENTER', '1.SET'),
('BACK', '1.SET'),
('FRONT', '1.SET');

INSERT INTO system_options (name, parent_system_option_value_path, default_system_option_value) VALUES
('JOINERY', '1.SET.CENTER', 'SCREW_SPLINE');

INSERT INTO system_option_values (name, parent_system_option_path) VALUES
('SCREW_SPLINE', '1.SET.CENTER.JOINERY'),
('SHEAR_BLOCK', '1.SET.CENTER.JOINERY'),
('STICK', '1.SET.CENTER.JOINERY');

INSERT INTO system_details (detail_type, parent_system_option_value_path) VALUES
('HEAD', '1.SET.CENTER.JOINERY.SCREW_SPLINE'),
('HORIZONTAL', '1.SET.CENTER.JOINERY.SCREW_SPLINE'),
('SILL', '1.SET.CENTER.JOINERY.SCREW_SPLINE');

INSERT INTO detail_options (name, parent_system_detail_path, default_detail_option_value) VALUES
('VOID', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD', 'VOID');

INSERT INTO detail_option_values (name, parent_detail_option_path) VALUES
('VOID', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID');


INSERT INTO detail_options (name, parent_detail_option_value_path, default_detail_option_value) VALUES
('GLAZING', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID', 'INSIDE');

INSERT INTO detail_option_values (name, parent_detail_option_path) VALUES
('INSIDE', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.STOPS.DOWN.GLAZING'),
('OUTSIDE', '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.STOPS.DOWN.GLAZING');

INSERT INTO system_configurations (configuration_type, parent_detail_option_value_path) VALUES

INSERT INTO configuration_options (name, parent_system_configuration_path, default_configuration_option_value) VALUES

INSERT INTO configuration_option_values (name, parent_configuration_option_path) VALUES

INSERT INTO option_groups (system_id, name) VALUES
(1, '1.SET.CENTER.JOINERY.SCREW_SPLINE', 'STOPS'),
(1, '1.SET.CENTER.JOINERY.SCREW_SPLINE', 'GLAZING'),
;



-- TEST SYSTEM
INSERT INTO systems (name, manufacturer_id, system_type) VALUES
('Test System', 1, 'STOREFRONT'),
('Sys', 2, 'STOREFRONT'),
('Sys3', 2, 'ALL_GLASS');



-- PROJECT FOR USER_ONE
INSERT INTO projects (name, owner_id) VALUES
('Demo Project', 1);



-- TEST PROJECT
INSERT INTO projects (name, owner_id) VALUES
('Test Project', 2);

-- TEST SYSTEM SET
INSERT INTO system_sets (system_id, project_id, name, system_option_value_path) VALUES
(1, 1, 'Test System Set', '1.SET.CENTER.JOINERY.SCREW_SPLINE');

INSERT INTO system_set_option_group_values (system_set_id, option_group_system_option_value_path, option_name, name) VALUES
(1, '1.SET.CENTER.JOINERY.SCREW_SPLINE', 'STOPS', 'DOWN'),
(1, '1.SET.CENTER.JOINERY.SCREW_SPLINE', 'GLAZING', 'OUTSIDE');

INSERT INTO system_set_detail_option_values (system_set_id, detail_option_value_path) VALUES
(1, '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.STOPS.DOWN.GLAZING.OUTSIDE');

INSERT INTO system_set_configuration_option_values (system_set_id, configuration_option_value_path) VALUES
(1, '1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.STOPS.DOWN.GLAZING.OUTSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY');



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
