
-- ROLES

DROP ROLE gc_admin;
DROP ROLE gc_data_entry;
DROP ROLE gc_client;

-- only run once;
-- CREATE ROLE doadmin; -- (developer) -- already exists
-- CREATE ROLE glascad WITH PASSWORD DO_GC_PASSWORD -- must run manually
CREATE ROLE gc_admin;
CREATE ROLE gc_data_entry;
CREATE ROLE gc_client;

-- PRIVILEGES

REVOKE ALL PRIVILEGES ON DATABASE defaultdb FROM gc_admin;
REVOKE ALL PRIVILEGES ON DATABASE defaultdb FROM gc_data_entry;
REVOKE ALL PRIVILEGES ON DATABASE defaultdb FROM gc_client;

-- CLIENT
-- can only write to client data
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA gc_public TO gc_client;
GRANT SELECT ON ALL TABLES IN SCHEMA gc_protected TO gc_client;
GRANT SELECT ON ALL TABLES IN SCHEMA gc_data TO gc_client;
GRANT SELECT ON ALL TABLES IN SCHEMA gc_developer TO gc_client;

-- DATA ENTRY
-- has no access to client data
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA gc_data TO gc_data_entry;
GRANT SELECT ON ALL TABLES IN SCHEMA gc_developer TO gc_data_entry;

-- ADMIN
-- has all privileges of both data entry and client
GRANT gc_data_entry TO gc_admin;
GRANT gc_client TO gc_admin;

-- DEVELOPER
-- role doadmin already has ownership of all schemas
GRANT gc_admin TO doadmin;
GRANT gc_data_entry TO doadmin;
GRANT gc_client TO doadmin;


-- USERS

-- CREATE USER glascad NOCREATEDB IN GROUP gc_admin ENCRYPTED PASSWORD '.env.DO_GC_PASSWORD';
