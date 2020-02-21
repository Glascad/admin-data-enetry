
DROP SCHEMA IF EXISTS gc_private CASCADE;
DROP SCHEMA IF EXISTS gc_controlled CASCADE;
DROP SCHEMA IF EXISTS gc_protected CASCADE;
DROP SCHEMA IF EXISTS gc_data CASCADE;
DROP SCHEMA IF EXISTS gc_public CASCADE;
DROP SCHEMA IF EXISTS gc_utils CASCADE;

-- for data that is not directly exposed for reading or writing
-- for private utility functions
CREATE SCHEMA gc_private;

-- for data that is exposed for reading but not writing
CREATE SCHEMA gc_controlled;

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
ALTER DATABASE postgres SET search_path TO public, gc_utils, gc_public, gc_data, gc_protected, gc_controlled, gc_private;

SET search_path TO public, gc_utils, gc_public, gc_data, gc_protected, gc_controlled, gc_private;

-- EXTENSIONS

CREATE EXTENSION pgcrypto WITH SCHEMA gc_private;
CREATE EXTENSION btree_gist WITH SCHEMA gc_utils;
CREATE EXTENSION ltree WITH SCHEMA gc_utils;
