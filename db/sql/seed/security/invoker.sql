
DROP ROLE IF EXISTS gc_invoker;

CREATE ROLE gc_invoker NOCREATEDB NOCREATEROLE NOINHERIT;

REVOKE ALL PRIVILEGES ON DATABASE postgres FROM gc_invoker;

REVOKE ALL PRIVILEGES ON SCHEMA
    public,
    gc_private,
    gc_controlled,
    gc_protected,
    gc_data,
    gc_public,
    gc_utils
FROM gc_invoker;

REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA
    public,
    gc_private,
    gc_controlled,
    gc_protected,
    gc_data,
    gc_public,
    gc_utils
FROM gc_invoker;


GRANT ALL ON SCHEMA gc_public TO gc_invoker;
GRANT ALL ON SCHEMA gc_data TO gc_invoker;
GRANT ALL ON SCHEMA gc_private TO gc_invoker;

GRANT USAGE ON SCHEMA
    gc_controlled,
    gc_protected,
    gc_utils
TO gc_invoker;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA
    gc_public,
    gc_private,
    -- gc_controlled,
    gc_protected,
    gc_data,
    gc_utils
TO gc_invoker;

GRANT SELECT ON ALL TABLES IN SCHEMA gc_controlled TO gc_invoker;
