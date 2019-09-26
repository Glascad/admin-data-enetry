
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
    unauthorized,
    GC_ADMIN,
    GC_DATA_ENTRY,
    GC_CLIENT;

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
    unauthorized,
    GC_ADMIN,
    GC_DATA_ENTRY,
    GC_CLIENT;

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
    unauthorized,
    GC_ADMIN,
    GC_DATA_ENTRY,
    GC_CLIENT;


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

-- UNAUTHORIZED
GRANT EXECUTE ON FUNCTION
    gc_public.authenticate,
    gc_public.get_current_user_id,
    gc_public.get_current_user
TO unauthorized;

-- 
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA gc_utils TO PUBLIC;


-- INVOKER
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA
    gc_private,
    -- gc_controlled,
    gc_protected,
    gc_data,
    gc_public,
    gc_utils
TO gc_invoker;

-- CLIENT
-- can only write to client data
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA gc_public TO GC_CLIENT;
GRANT SELECT ON ALL TABLES IN SCHEMA
    gc_protected,
    gc_data,
    gc_controlled
TO GC_CLIENT;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA gc_public TO GC_CLIENT;

-- DATA ENTRY
-- has no access to client data
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA gc_data TO GC_DATA_ENTRY;
GRANT SELECT ON ALL TABLES IN SCHEMA gc_controlled TO GC_DATA_ENTRY;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA gc_data TO GC_DATA_ENTRY;

-- ADMIN
-- has all privileges of both data entry and client
GRANT unauthorized, GC_DATA_ENTRY, GC_CLIENT TO GC_ADMIN;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA gc_controlled, gc_private TO GC_ADMIN;

-- DEVELOPER
-- role doadmin already has ownership of all schemas
GRANT unauthorized, GC_ADMIN, GC_DATA_ENTRY, GC_CLIENT TO doadmin;
