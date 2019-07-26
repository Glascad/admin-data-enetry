
SET ROLE = doadmin;

DROP SCHEMA gc_private CASCADE;
DROP SCHEMA gc_developer CASCADE;
DROP SCHEMA gc_protected CASCADE;
DROP SCHEMA gc_data CASCADE;
DROP SCHEMA gc_public CASCADE;
DROP SCHEMA gc_utils CASCADE;

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

-- public usage
GRANT USAGE ON SCHEMA 
    -- gc_private
    gc_developer,
    gc_protected,
    gc_data,
    gc_public
    -- gc_utils
TO PUBLIC;

GRANT USAGE ON ALL SEQUENCES IN SCHEMA
    gc_private,
    gc_developer,
    gc_protected,
    gc_data,
    gc_public,
    gc_utils
TO PUBLIC;

-- SEARCH PATH
ALTER DATABASE defaultdb SET search_path TO public, gc_utils, gc_public, gc_data, gc_protected, gc_developer, gc_private;

-- CRYPTO
CREATE EXTENSION pgcrypto WITH SCHEMA gc_private;
