
SET search_path TO public, gc_utils, gc_public, gc_data, gc_protected, gc_controlled, gc_private;


-- INITIAL MANUFACTURERS
INSERT INTO manufacturers (name) VALUES
('Test Mnfg'), ('Kawneer');


-- PROJECT FOR ADMIN, TEST, ANDREW
INSERT INTO projects (name, owner_id) VALUES
('Demo Project', 1),
('Test Project', 2);
