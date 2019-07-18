
-- ROLES

-- CREATE ROLE doadmin; -- (developer) already exists
CREATE ROLE gc_admin;
CREATE ROLE gc_data_entry;
CREATE ROLE gc_client;

-- SCHEMAS

CREATE SCHEMA gc_data;
CREATE SCHEMA gc_developer;
CREATE SCHEMA gc_protected;
CREATE SCHEMA gc_public;
CREATE SCHEMA gc_users;
CREATE SCHEMA gc_utils;

-- PERMISSIONS / PRIVELEGES

-- DEVELOPER
-- role doadmin already has ownership of all schemas

-- ADMIN
-- has all privileges of both data entry and client
GRANT gc_data_entry TO gc_admin;
GRANT gc_client TO gc_admin;

-- DATA ENTRY
-- has no access to client data
GRANT ALL ON SCHEMA gc_data TO gc_data_entry;
GRANT SELECT ON ALL TABLES IN gc_developer;

-- CLIENT
-- can only write to client data
GRANT ALL ON SCHEMA gc_public TO gc_client;
GRANT SELECT ON ALL TABLES IN SCHEMA gc_protected;
GRANT SELECT ON ALL TABLES IN SCHEMA gc_data TO gc_client;
GRANT SELECT ON ALL TABLES IN gc_developer;
