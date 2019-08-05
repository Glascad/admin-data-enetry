
SET search_path TO public, gc_utils, gc_public, gc_data, gc_protected, gc_controlled, gc_private;

-- PROJECT FOR USER_ONE
INSERT INTO projects (name, owner_id) VALUES ('Demo Project', 1);

-- INITIAL MANUFACTURER
INSERT INTO manufacturers (name) VALUES ('Kawneer');

-- INITIAL SYSTEM
-- SELECT 1 FROM update_entire_system() INTO ___;
