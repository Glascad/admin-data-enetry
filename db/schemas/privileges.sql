

-- ROLES

-- CREATE ROLE doadmin; -- (developer) -- already exists
CREATE ROLE gc_admin;
CREATE ROLE gc_data_entry;
CREATE ROLE gc_client;

-- SCHEMAS

-- for data that is not directly exposed for reading or writing
-- for private utility functions
CREATE SCHEMA gc_private;

-- for data that is exposed for reading but not writing
CREATE SCHEMA gc_developer;

-- for data that is exposed for reading but only indirectly for writing
-- for private utility functions
CREATE SCHEMA gc_protected;

-- for data that is exposed for reading but only for writing by data-entry
CREATE SCHEMA gc_data;

-- for data that is exposed for reading and writing (protected by rls)
-- for functions that are exposed to all users
CREATE SCHEMA gc_public;

-- for private utility data & functions
CREATE SCHEMA gc_utils;

-- SEARCH PATH
SET search_path TO public, gc_utils, gc_public, gc_data, gc_protected, gc_developer, gc_private;

-- CRYPTO
CREATE EXTENSION pgcrypto WITH SCHEMA gc_private;


-- PERMISSIONS / PRIVILEGES

REVOKE ALL PRIVILEGES ON DATABASE defaultdb FROM gc_admin;
REVOKE ALL PRIVILEGES ON DATABASE defaultdb FROM gc_data_entry;
REVOKE ALL PRIVILEGES ON DATABASE defaultdb FROM gc_client;

-- DEVELOPER
-- role doadmin already has ownership of all schemas

-- ADMIN
-- has all privileges of both data entry and client
GRANT gc_data_entry TO gc_admin;
GRANT gc_client TO gc_admin;

-- DATA ENTRY
-- has no access to client data
GRANT USAGE ON SCHEMA gc_data TO gc_data_entry;
GRANT SELECT ON ALL TABLES IN SCHEMA gc_developer TO gc_data_entry;

-- CLIENT
-- can only write to client data
GRANT USAGE ON SCHEMA gc_public TO gc_client;
GRANT SELECT ON ALL TABLES IN SCHEMA gc_protected TO gc_client;
GRANT SELECT ON ALL TABLES IN SCHEMA gc_data TO gc_client;
GRANT SELECT ON ALL TABLES IN SCHEMA gc_developer TO gc_client;
