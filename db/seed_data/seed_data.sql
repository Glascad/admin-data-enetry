
SET search_path TO public, gc_utils, gc_public, gc_data, gc_protected, gc_controlled, gc_private;


-- INITIAL MANUFACTURERS
INSERT INTO manufacturers (name) VALUES
('Initial Manufacturer'), ('Practice Manufacturer');


-- PROJECT FOR USER_ONE
INSERT INTO projects (name, owner_id) VALUES
('Demo Project', 1);


-- TEST PROJECT
INSERT INTO projects (name, owner_id) VALUES
('Test Project', 2);
