
SET search_path TO public, gc_utils, gc_public, gc_data, gc_protected, gc_controlled, gc_private;

-- PROJECT FOR USER_ONE
INSERT INTO projects (name, owner_id) VALUES ('Demo Project', 1);
INSERT INTO projects (name, owner_id) VALUES ('Test Project', 2);
-- INITIAL MANUFACTURER
INSERT INTO manufacturers (name) VALUES ('Kawneer');

-- INITIAL SYSTEM
INSERT INTO systems (name, manufacturer_id, system_type) VALUES ('Initial System', 1, 'STOREFRONT');
INSERT INTO system_options (name, system_id) VALUES ('STOPS', 1), ('GLAZING', 1), ('JOINERY', 1);
INSERT INTO option_values (name, option_name, system_id) VALUES
('UP', 'STOPS', 1),
('DOWN', 'STOPS', 1),
('STICK', 'JOINERY', 1),
('SCREW_SPLINE', 'JOINERY', 1),
('SHEAR_BLOCK', 'JOINERY', 1),
('INSIDE', 'GLAZING', 1),
('OUTSIDE', 'GLAZING', 1);
