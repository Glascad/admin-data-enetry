
-- REVOKE

REVOKE ALL PRIVILEGES ON SCHEMA
    public,
    gc_private,
    gc_controlled,
    gc_protected,
    gc_data,
    gc_public,
    gc_utils
FROM
    PUBLIC,
    gc_admin,
    gc_data_entry,
    gc_client;

REVOKE ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA
    public,
    gc_private,
    gc_controlled,
    gc_protected,
    gc_data,
    gc_public,
    gc_utils
FROM
    PUBLIC,
    gc_admin,
    gc_data_entry,
    gc_client;

REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA
    public,
    gc_private,
    gc_controlled,
    gc_protected,
    gc_data,
    gc_public,
    gc_utils
FROM
    PUBLIC,
    gc_admin,
    gc_data_entry,
    gc_client;


-- GRANT

-- public usage
GRANT USAGE ON SCHEMA 
    -- gc_private
    gc_controlled,
    gc_protected,
    gc_data,
    gc_public
    -- gc_utils
TO PUBLIC;

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA
    gc_private,
    gc_controlled,
    gc_protected,
    gc_data,
    gc_public,
    gc_utils
TO PUBLIC;

-- public readability
GRANT SELECT ON ALL TABLES IN SCHEMA
    -- gc_private,
    gc_controlled,
    gc_protected,
    gc_data,
    gc_public
    -- gc_utils
TO PUBLIC;


-- INVOKER
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA
    -- gc_private,
    -- gc_controlled,
    gc_protected,
    -- gc_data,
    gc_public,
    gc_utils
TO gc_invoker;

-- CLIENT
-- can only write to client data
-- GRANT gc_invoker TO gc_client;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA gc_public TO gc_client;
GRANT SELECT ON ALL TABLES IN SCHEMA
    gc_protected,
    gc_data,
    gc_controlled
TO gc_client;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA gc_public TO gc_client;

-- DATA ENTRY
-- has no access to client data
-- GRANT gc_invoker TO gc_data_entry;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA gc_data TO gc_data_entry;
GRANT SELECT ON ALL TABLES IN SCHEMA gc_controlled TO gc_data_entry;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA gc_data TO gc_data_entry;

-- ADMIN
-- has all privileges of both data entry and client
GRANT gc_data_entry, gc_client TO gc_admin;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA gc_controlled, gc_private TO gc_admin;

-- DEVELOPER
-- role doadmin already has ownership of all schemas
GRANT gc_admin, gc_data_entry, gc_client TO doadmin;
